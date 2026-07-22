/**
 * ============================================================================
 * 🎓 COMPUTACIÓN CUÁNTICA APLICADA — LÓGICA DE INTERACCIÓN CLIENTE (JS)
 * ----------------------------------------------------------------------------
 * Manual Didáctico de JavaScript Moderno (ES6+):
 * - Manipulación interactiva del DOM.
 * - API de Portapapeles (navigator.clipboard).
 * - Carga instantánea de cuadernos desde la base de datos embebida (NOTEBOOKS_DATA).
 * - Funcionalidad Híbrida 100% offline (compatible con file:// y http/https).
 * ============================================================================
 */

// Variable global para almacenar el código Python actualmente visible en el modal
let currentNotebookPythonCode = '';

/**
 * Abre el Modal interactivo y despliega el código Python embebido del notebook.
 * @param {string} filePath - Ruta al archivo .ipynb
 * @param {string} fileName - Nombre del archivo del notebook
 */
function openNotebookModal(filePath, fileName) {
  const codeModal = document.getElementById('codeModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalCodeView = document.getElementById('modalCodeView');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');
  const modalColabBtn = document.getElementById('modalColabBtn');

  if (!codeModal) return;

  // 1. Mostrar inmediatamente el modal en pantalla (Feedback visual instantáneo)
  modalTitle.textContent = `Vista previa: ${fileName}`;
  modalDownloadBtn.href = filePath;
  modalDownloadBtn.setAttribute('download', fileName);
  if (modalColabBtn) {
    modalColabBtn.href = `https://colab.research.google.com/github/ui4054/qaoa_training/blob/master/notebooks/${fileName}`;
  }
  codeModal.classList.add('active');

  // 2. Comprobar si existe el código embebido en NOTEBOOKS_DATA (Garantía de funcionamiento local en file://)
  if (window.NOTEBOOKS_DATA && window.NOTEBOOKS_DATA[fileName]) {
    currentNotebookPythonCode = window.NOTEBOOKS_DATA[fileName];
    modalCodeView.textContent = currentNotebookPythonCode;
    return;
  }

  // 3. Fallback mediante Fetch API si se ejecuta sobre un servidor HTTP/HTTPS
  modalCodeView.textContent = '# Cargando contenido del cuaderno...';
  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar el archivo.');
      return response.text();
    })
    .then(jsonText => {
      try {
        const notebook = JSON.parse(jsonText);
        let extractedCode = `# ====================================================================\n`;
        extractedCode += `# CUADERNO JUPYTER: ${fileName}\n`;
        extractedCode += `# ====================================================================\n\n`;

        if (notebook.cells && Array.isArray(notebook.cells)) {
          notebook.cells.forEach((cell, idx) => {
            const src = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
            if (cell.cell_type === 'code') {
              extractedCode += `# --- Celda de Código #${idx + 1} ---\n${src}\n\n`;
            } else if (cell.cell_type === 'markdown') {
              const commented = src.split('\n').map(l => '# ' + l).join('\n');
              extractedCode += `# --- Explicación Teórica ---\n${commented}\n\n`;
            }
          });
        }
        currentNotebookPythonCode = extractedCode;
        modalCodeView.textContent = extractedCode;
      } catch (e) {
        currentNotebookPythonCode = jsonText;
        modalCodeView.textContent = jsonText;
      }
    })
    .catch(err => {
      modalCodeView.textContent = `# Error al cargar mediante fetch (${err.message}).\n# Utiliza el botón "Descargar .ipynb" para obtener el cuaderno.`;
    });
}

// Inicialización de Eventos DOM
document.addEventListener('DOMContentLoaded', () => {

  // Selección de elementos
  const searchInput = document.getElementById('searchInput');
  const tagButtons = document.querySelectorAll('.tag-btn');
  const presCards = document.querySelectorAll('.card-pres');
  const nbCards = document.querySelectorAll('.card-nb');

  const codeModal = document.getElementById('codeModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const copyPythonBtn = document.getElementById('copyPythonBtn');

  let currentFilter = 'all';

  // Algoritmo de filtrado en tiempo real
  function filterItems() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    presCards.forEach(card => {
      const tags = card.getAttribute('data-tags') || '';
      const text = card.textContent.toLowerCase();
      const matchesTag = (currentFilter === 'all') || tags.includes(currentFilter);
      const matchesQuery = !query || text.includes(query) || tags.includes(query);
      card.style.display = (matchesTag && matchesQuery) ? 'flex' : 'none';
    });

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

  // Funciones de cierre de Modal
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

  // Evento del botón de copiar código desde el Modal
  if (copyPythonBtn) {
    copyPythonBtn.addEventListener('click', () => {
      if (currentNotebookPythonCode) {
        copyText(currentNotebookPythonCode, copyPythonBtn);
      }
    });
  }

});

/**
 * Función global para copiar texto al portapapeles con retroalimentación visual.
 * @param {string} text - Texto a copiar
 * @param {HTMLElement} btnElement - Elemento botón que dispara la acción
 */
function copyText(text, btnElement) {
  if (!navigator.clipboard) {
    // Fallback para entornos muy antiguos
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showCopyFeedback(btnElement);
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
    document.body.removeChild(textArea);
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    showCopyFeedback(btnElement);
  }).catch(err => {
    console.error('Error al copiar texto: ', err);
  });
}

function showCopyFeedback(btnElement) {
  const originalHTML = btnElement.innerHTML;
  btnElement.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado al Portapapeles!';
  btnElement.style.color = '#10b981';
  btnElement.style.borderColor = '#10b981';
  setTimeout(() => {
    btnElement.innerHTML = originalHTML;
    btnElement.style.color = '';
    btnElement.style.borderColor = '';
  }, 2200);
}
