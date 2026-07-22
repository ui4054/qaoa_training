# 🎓 QAOA & Quantum Annealing para el Problema de la Mochila

Material didáctico para clase de pregrado (90 minutos).  
Cubre teoría matemática, solver clásico, QAOA con Qiskit 2.4, y Quantum Annealing con D-Wave.

---

## 🚀 Inicio Rápido

### 1. Clonar el repositorio
```bash
git clone https://github.com/ui4054/qaoa_training.git
cd qaoa_training
```

### 2. Crear el ambiente conda
```bash
conda env create -f environment.yml
conda activate qaoa_knapsack
```

### 3. Abrir la presentación
Abrir `presentation/index.html` en cualquier navegador moderno.

### 4. Ejecutar los notebooks
```bash
jupyter lab notebooks/
```

---

## 📁 Estructura del Proyecto

```
qaoa_training/
├── environment.yml                    # Ambiente conda unificado
├── README.md                          # Este archivo
├── .gitignore
├── data/
│   └── knapsack_instance.json         # Instancia del problema (5 ítems)
├── presentation/
│   ├── index.html                     # Diapositivas Reveal.js
│   └── css/
│       └── custom-theme.css           # Tema visual académico
└── notebooks/
    ├── 01_solver_clasico.ipynb        # PuLP + CBC
    ├── 02_qaoa_qiskit.ipynb           # Qiskit 2.4 + QAOA
    └── 03_quantum_annealing_dwave.ipynb # D-Wave Simulated Annealing
```

---

## 📋 Contenido de la Clase

| Bloque | Duración | Tema |
|--------|----------|------|
| Teoría | 35 min | Formulación ILP → QUBO → Ising → QAOA → Annealing |
| Práctica 1 | 15 min | Solver clásico con PuLP |
| Práctica 2 | 20 min | QAOA con Qiskit 2.4 (simulación local) |
| Práctica 3 | 15 min | Quantum Annealing con D-Wave (simulación local) |
| Cierre | 5 min | Comparativa y preguntas |

---

## 🔧 Requisitos

- **Python** 3.11
- **Conda** (Miniconda o Anaconda)
- **Navegador** moderno (Chrome, Firefox, Edge)
- No se requiere acceso a hardware cuántico real

---

## 🌐 GitHub Pages (Presentación Online)

Para publicar la presentación en GitHub Pages:

1. Subir el repositorio a GitHub
2. Ir a **Settings → Pages**
3. En **Source**, seleccionar `main` branch, carpeta `/ (root)`
4. La presentación estará en: `https://TU_USUARIO.github.io/qaoa_training/presentation/`

---

## 📝 Licencia

Material educativo de uso libre. Atribución apreciada.
