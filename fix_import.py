content = open('src/App.tsx', encoding='utf-8').read()
content = content.replace(
    'import {\n  Menu,',
    'import {\n  Menu,\n  Briefcase,'
)
open('src/App.tsx', 'w', encoding='utf-8').write(content)
print('Done!')
