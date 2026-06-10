content = open('src/App.tsx', encoding='utf-8').read()

# Check for common responsive issues
import re

# Find fixed widths
fixed_w = re.findall(r'w-\[[\d]+px\]', content)
print('Fixed widths:', fixed_w)

# Find non-responsive text sizes (no sm/md prefix)
bare_text = re.findall(r'(?<![a-z]:)text-[2-9]xl(?!\s*sm)', content)
print('Potentially large bare text:', bare_text[:10])

# Check grid cols
grids = re.findall(r'grid-cols-\d+', content)
print('Grid cols used:', set(grids))

# Check if overflow hidden exists
print('Has overflow-x-hidden:', 'overflow-x-hidden' or 'overflow-hidden' in content)
