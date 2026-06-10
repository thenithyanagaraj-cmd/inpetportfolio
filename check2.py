content = open('src/App.tsx', encoding='utf-8').read()
import re

lines = content.split('\n')
issues = []

for i, line in enumerate(lines, 1):
    # grid-cols without responsive prefix
    if re.search(r'(?<![a-z]:)grid-cols-[34]', line) and 'sm:' not in line and 'lg:' not in line:
        issues.append(f'Line {i}: Non-responsive grid: {line.strip()}')
    # large padding without responsive
    if re.search(r'(?<![a-z]:)p-[89]|(?<![a-z]:)px-[89]|(?<![a-z]:)py-[89]', line):
        issues.append(f'Line {i}: Large padding: {line.strip()}')
    # large text without responsive
    if re.search(r'(?<![a-z]:)text-[4-9]xl', line) and 'sm:' not in line and 'md:' not in line:
        issues.append(f'Line {i}: Non-responsive large text: {line.strip()}')
    # fixed height
    if re.search(r'h-\[\d+px\]', line):
        issues.append(f'Line {i}: Fixed height: {line.strip()}')

for issue in issues:
    print(issue)

print(f'\nTotal issues: {len(issues)}')
