content = open('src/App.tsx', encoding='utf-8').read()
import re

sections = ['home', 'about', 'industries', 'services', 'technology', 'products', 'careers', 'contact']

for section in sections:
    # find section block
    match = re.search(rf'id="{section}".*?(?=id="(?:{'|'.join(sections)})"|\Z)', content, re.DOTALL)
    if match:
        block = match.group()
        has_sm = 'sm:' in block
        has_md = 'md:' in block  
        has_lg = 'lg:' in block
        has_xl = 'xl:' in block
        grid_cols = re.findall(r'(?:sm:|md:|lg:)?grid-cols-\d+', block)
        text_sizes = re.findall(r'(?:sm:|md:|lg:)?text-\dxl', block)
        print(f"\n[{section.upper()}]")
        print(f"  Breakpoints used: {'sm ' if has_sm else ''}{'md ' if has_md else ''}{'lg ' if has_lg else ''}{'xl' if has_xl else ''}")
        print(f"  Grids: {list(set(grid_cols))}")
        print(f"  Text sizes: {list(set(text_sizes))}")
