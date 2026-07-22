# 🎓 Computación Cuántica Aplicada — Material Didáctico

Material didáctico para clases de pregrado sobre **algoritmos cuánticos aplicados a optimización combinatoria e introducción a la criptografía cuántica**. Cubre desde el Problema de la Mochila (solver clásico, QAOA, Quantum Annealing) hasta Quantum Phase Estimation y el Algoritmo de Shor.

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

### 3. Abrir la Landing Page o las presentaciones
Abrir cualquiera de los siguientes archivos HTML en un navegador moderno:
- `index.html` — Landing Page interactiva, hub de presentaciones y descarga de notebooks
- `presentation/qaoa.html` — Mochila: ILP → QUBO → QAOA → Annealing
- `presentation/quantum_phase_estimation.html` — Quantum Phase Estimation
- `presentation/shor_presentation.html` — Algoritmo de Shor

### 4. Ejecutar los notebooks
```bash
jupyter lab notebooks/
```

---

## 📁 Estructura del Proyecto

```
qaoa_training/
├── index.html                               # Landing Page web y centro de descargas
├── environment.yml                          # Ambiente conda unificado
├── README.md
├── .gitignore
│
├── data/
│   └── knapsack_instance.json               # Instancia del problema (5 ítems)
│
├── notebooks/
│   ├── 01_solver_clasico.ipynb              # Solver clásico con PuLP + CBC
│   ├── 02_qaoa_qiskit.ipynb                 # QAOA con Qiskit 2.4
│   ├── 03_quantum_annealing_dwave.ipynb     # Quantum Annealing con D-Wave Ocean
│   ├── 04_quantum_phase_estimation.ipynb    # Quantum Phase Estimation (QPE)
│   ├── 05_shor_algorithm.ipynb              # Algoritmo de Shor
│   └── 06_mini_qaoa.ipynb                   # QAOA mínimo didáctico (2 qubits)
│
└── presentation/
    ├── qaoa.html                            # Presentación principal (Mochila & QAOA)
    ├── quantum_phase_estimation.html        # Presentación QPE
    ├── shor_presentation.html               # Presentación Shor
    ├── css/
    │   └── custom-theme.css                 # Tema visual académico
    └── images/                              # Diagramas de circuitos QPE
```

---

## 📋 Contenido Temático

### 1 — Problema de la Mochila & QAOA Mínimo (~90 min)

| Bloque | Duración | Tema |
|--------|----------|------|
| Teoría | 35 min | Formulación ILP → QUBO → Ising → QAOA → Annealing |
| Práctica 1 | 15 min | Solver clásico con PuLP |
| Práctica 2 | 20 min | QAOA con Qiskit 2.4 (simulación local) |
| Práctica 3 | 15 min | Quantum Annealing con D-Wave (simulación local) |
| Práctica 4 | 15 min | Mini-QAOA didáctico de 2 qubits a mano (`06_mini_qaoa.ipynb`) |
| Cierre | 5 min | Comparativa y preguntas |


### 2 — Quantum Phase Estimation

- Fundamentos teóricos de QPE
- Circuitos con 1, 2 y 3 qubits de precisión
- Implementación paso a paso con Qiskit

### 3 — Algoritmo de Shor

- Reducción de factorización a búsqueda de período
- QPE como subrutina central
- Implementación didáctica con Qiskit

---

## 🔧 Requisitos

- **Python** 3.11
- **Conda** (Miniconda o Anaconda)
- **Navegador** moderno (Chrome, Firefox, Edge)
- No se requiere acceso a hardware cuántico real

### Dependencias principales

| Paquete | Versión | Uso |
|---------|---------|-----|
| `qiskit` | ≥ 2.4 | Circuitos cuánticos, QAOA, QPE, Shor |
| `qiskit-algorithms` | ≥ 0.3 | Algoritmos variacionales |
| `qiskit-optimization` | ≥ 0.6 | Formulación QUBO |
| `dwave-ocean-sdk` | ≥ 7.0 | Quantum / Simulated Annealing |
| `pulp` | ≥ 2.8 | Solver ILP clásico |
| `matplotlib` | ≥ 3.8 | Visualizaciones |
| `numpy` | ≥ 1.26 | Cómputo numérico |
| `pylatexenc` | ≥ 2.10 | Renderizado LaTeX en circuitos |
| `jupyterlab` | ≥ 4.0 | Entorno de notebooks |

---

## 🌐 GitHub Pages (Landing Page & Presentaciones Online)

Para publicar el portal web y las presentaciones en GitHub Pages:

1. Subir el repositorio a GitHub
2. Ir a **Settings → Pages**
3. En **Source**, seleccionar `main` branch, carpeta `/ (root)`
4. El portal estará disponible en:
   - **Landing Page**: `https://ui4054.github.io/qaoa_training/`
   - **Presentación QAOA & Mochila**: `https://ui4054.github.io/qaoa_training/presentation/qaoa.html`
   - **Presentación QPE**: `https://ui4054.github.io/qaoa_training/presentation/quantum_phase_estimation.html`
   - **Presentación Shor**: `https://ui4054.github.io/qaoa_training/presentation/shor_presentation.html`

---

## 📝 Licencia

Material educativo de uso libre. Atribución apreciada.

