content = open('src/App.tsx', encoding='utf-8').read()

# Reduce hero heading size for laptop
content = content.replace(
    'className="animate-fade-in text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight mb-4 sm:mb-6"',
    'className="animate-fade-in text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-white leading-tight mb-4 sm:mb-6"'
)

# Reduce hero subtitle size
content = content.replace(
    'className="animate-fade-in text-base sm:text-lg md:text-xl text-neutral-300 mb-6 sm:mb-8 max-w-2xl transition-all duration-500"',
    'className="animate-fade-in text-sm sm:text-base md:text-lg text-neutral-300 mb-6 sm:mb-8 max-w-2xl transition-all duration-500"'
)

# Reduce hero buttons size
content = content.replace(
    'href="#services" className="btn-primary group"',
    'href="#services" className="btn-primary group text-sm px-4 py-2"'
)
content = content.replace(
    'href="#about" className="btn-white"',
    'href="#about" className="btn-white text-sm px-4 py-2"'
)

open('src/App.tsx', 'w', encoding='utf-8').write(content)
print('Done!')
