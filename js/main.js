/**
 * ============================================================================
 * 🎓 COMPUTACIÓN CUÁNTICA APLICADA — LÓGICA DE INTERACCIÓN CLIENTE (JS)
 * ----------------------------------------------------------------------------
 * Manual Didáctico de JavaScript Moderno (ES6+):
 * - Manipulación interactiva del DOM.
 * - API de Portapapeles (navigator.clipboard).
 * - Carga y procesamiento asíncrono (fetch API & Promises).
 * - Parseo dinámico de cuadernos Jupyter (.ipynb) a código Python ejecutable.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. SELECCIÓN DE ELEMENTOS DEL DOM
  // --------------------------------------------------------------------------
  const searchInput = document.getElementById('searchInput');
  const tagButtons = document.querySelectorAll('.tag-btn');
  const presCards = document.querySelectorAll('.card-pres');
  const nbCards = document.querySelectorAll('.card-nb');

  // Elementos del Modal de Vista Previa de Código
  const codeModal = document.getElementById('codeModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalCodeView = document.getElementById('modalCodeView');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const copyPythonBtn = document.getElementById('copyPythonBtn');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');

  // Estado del filtro actual por categoría
  let currentFilter = 'all';
  let currentNotebookPythonCode = '';
  let currentNotebookRawJSON = '';

  // --------------------------------------------------------------------------
  // 2. ALGORITMO DE FILTRADO Y BÚSQUEDA EN TIEMPO REAL
  // --------------------------------------------------------------------------
  function filterItems() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    // Filtrar Tarjetas de Presentaciones
    presCards.forEach(card => {
      const tags = card.getAttribute('data-tags') || '';
      const text = card.textContent.toLowerCase();
      
      const matchesTag = (currentFilter === 'all') || tags.includes(currentFilter);
      const matchesQuery = !query || text.includes(query) || tags.includes(query);

      card.style.display = (matchesTag && matchesQuery) ? 'flex' : 'none';
    });

    // Filtrar Tarjetas de Notebooks
    nbCards.forEach(card => {
      const tags = card.getAttribute('data-tags') || '';
      const text = card.textContent.toLowerCase();
      
      const matchesTag = (currentFilter === 'all') || tags.includes(currentFilter);
      const matchesQuery = !query || text.includes(query) || tags.includes(query);

      card.style.display = (matchesTag && matchesQuery) ? 'flex' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterItems);
  }

  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tagButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      filterItems();
    });
  });

  // --------------------------------------------------------------------------
  // 3. VISTA PREVIA Y EXTRACCIÓN DE CÓDIGO DE CUADERNOS JUPYTER (.IPYNB)
  // --------------------------------------------------------------------------
  /**
   * Abre el Modal interactivo cargando y formateando el código del notebook.
   * @param {string} filePath - Ruta relativa al archivo .ipynb
   * @param {string} fileName - Nombre visible del archivo
   */
  window.openNotebookModal = function(filePath, fileName) {
    if (!codeModal) return;

    modalTitle.innerHTML = `<i class="fa-solid fa-code"></i> Vista Previa — ${fileName}`;
    modalCodeView.textContent = 'Cargando contenido del cuaderno...';
    modalDownloadBtn.href = filePath;
    modalDownloadBtn.setAttribute('download', fileName);

    // Abrir Modal con animación
    codeModal.classList.add('active');

    // Cargar asíncronamente el archivo .ipynb (JSON)
    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error('No se pudo cargar el archivo.');
        return response.text();
      })
      .then(jsonText => {
        currentNotebookRawJSON = jsonText;
        try {
          const notebook = JSON.parse(jsonText);
          let extractedCode = `# ====================================================================\n`;
          extractedCode += `# CUADERNO JUPYTER: ${fileName}\n`;
          extractedCode += `# Material Didáctico — Computación Cuántica Aplicada\n`;
          extractedCode += `# ====================================================================\n\n`;

          if (notebook.cells && Array.isArray(notebook.cells)) {
            notebook.cells.forEach((cell, idx) => {
              if (cell.cell_type === 'code') {
                const codeLines = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
                extractedCode += `# --- [Celda de Código #${idx + 1}] ---\n`;
                extractedCode += codeLines + '\n\n';
              } else if (cell.cell_type === 'markdown') {
                const mdLines = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
                // Formatear Markdown como comentarios explicativos en Python
                const commentedMd = mdLines.split('\n').map(line => '# ' + line).join('\n');
                extractedCode += `"""\n${mdLines}\n"""\n\n`;
              }
            });
          }

          currentNotebookPythonCode = extractedCode;
          modalCodeView.textContent = extractedCode;
        } catch (e) {
          // Si no se puede parsear JSON, mostrar texto plano
          currentNotebookPythonCode = jsonText;
          modalCodeView.textContent = jsonText;
        }
      })
      .catch(err => {
        modalCodeView.textContent = `Error al cargar el cuaderno: ${err.message}\n\nPuedes descargarlo directamente usando el botón verde.`;
      });
  };

  // Cerrar Modal
  function closeModal() {
    if (codeModal) {
      codeModal.classList.remove('active');
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (codeModal) {
    codeModal.addEventListener('click', (e) => {
      if (e.target === codeModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Copiar Código Python extraído desde el Modal
  if (copyPythonBtn) {
    copyPythonBtn.addEventListener('click', () => {
      if (currentNotebookPythonCode) {
        copyText(currentNotebookPythonCode, copyPythonBtn);
      }
    });
  }

});

// ----------------------------------------------------------------------------
// 4. FUNCIÓN GLOBAL DE COPIA AL PORTAPAPELES (CLIPBOARD API)
// ----------------------------------------------------------------------------
function copyText(text, btnElement) {
  if (!navigator.clipboard) {
    console.warn('La API de Clipboard no está disponible en este entorno.');
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    const originalHTML = btnElement.innerHTML;
    
    btnElement.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado al Portapapeles!';
    btnElement.style.color = '#10b981';
    btnElement.style.borderColor = '#10b981';
    
    setTimeout(() => {
      btnElement.innerHTML = originalHTML;
      btnElement.style.color = '';
      btnElement.style.borderColor = '';
    }, 2200);
  }).catch(err => {
    console.error('Error al copiar texto: ', err);
  });
}
