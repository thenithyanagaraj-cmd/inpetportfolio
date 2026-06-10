content = open('src/App.tsx', encoding='utf-8').read()
content = content.replace(
    'className="text-sm px-3 py-1.5 flex items-center gap-1 border border-white text-white rounded-lg hover:bg-white/10 transition-colors"',
    'className="text-sm px-3 py-1.5 flex items-center gap-1 bg-primary border border-primary/50 text-white rounded-lg hover:bg-red-700 transition-colors"'
)
open('src/App.tsx', 'w', encoding='utf-8').write(content)
print('Done!')
