import json, sys

nb = json.load(open(r'c:\proyecto\PROYECTOS EDUCATIVOS\qaoa_training\notebooks\06_mini_qaoa.ipynb', 'r', encoding='utf-8'))

for i, c in enumerate(nb['cells']):
    src = "".join(c['source'])
    print(f"=== Cell {i} ({c['cell_type']}) ===")
    print(src[:500])
    print()
