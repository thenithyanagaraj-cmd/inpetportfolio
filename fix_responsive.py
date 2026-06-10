content = open('src/App.tsx', encoding='utf-8').read()

# 1. Hero - make text sizes mobile friendly
content = content.replace(
    'className="animate-fade-in text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight mb-4 sm:mb-6"',
    'className="animate-fade-in text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight mb-4 sm:mb-6"'
)

# 2. Hero buttons stack properly on mobile
content = content.replace(
    'className="animate-fade-in flex flex-col sm:flex-row gap-3 sm:gap-4"',
    'className="animate-fade-in flex flex-col xs:flex-row gap-3 sm:gap-4 w-full sm:w-auto"'
)

# 3. Technology grid - fix bare grid-cols-2 for tech tags
content = content.replace(
    'className="reveal stagger-3 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"',
    'className="reveal stagger-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3"'
)

# 4. About image grid - prevent overflow on small screens
content = content.replace(
    'className="reveal stagger-2 grid grid-cols-2 gap-3 sm:gap-4"',
    'className="reveal stagger-2 grid grid-cols-2 gap-2 sm:gap-4 max-w-lg mx-auto lg:max-w-none"'
)

# 5. Footer grid - fix bare grid-cols-2
content = content.replace(
    'className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12"',
    'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12"'
)

# 6. Careers stats - fix bare grid-cols-2
content = content.replace(
    'className="grid grid-cols-2 gap-3"',
    'className="grid grid-cols-1 sm:grid-cols-2 gap-3"'
)

# 7. Contact form grid inside - fix bare grid-cols-2
content = content.replace(
    'className="grid grid-cols-2 gap-3"',
    'className="grid grid-cols-1 sm:grid-cols-2 gap-3"'
)

# 8. Industries section - single col on very small screens
content = content.replace(
    'className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"',
    'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"'
)

# 9. Services section
content = content.replace(
    'className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"',
    'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"'
)

# 10. Products section
content = content.replace(
    'className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"\n            {categoriesData',
    'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"\n            {categoriesData'
)

# 11. Careers job grid
content = content.replace(
    'className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"\n            {jobListings',
    'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"\n            {jobListings'
)

# 12. Nav - ensure logo text wraps properly on mobile
content = content.replace(
    'className="text-xs font-semibold tracking-wide leading-tight',
    'className="text-xs font-semibold tracking-wide leading-tight hidden sm:block'
)

# 13. Add overflow-x-hidden to main div
content = content.replace(
    '<div className="min-h-screen bg-white">',
    '<div className="min-h-screen bg-white overflow-x-hidden">'
)

# 14. Why us section image - better mobile
content = content.replace(
    'className="reveal order-2 lg:order-1">\n              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl">',
    'className="reveal order-2 lg:order-1">\n              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl max-h-64 sm:max-h-80 lg:max-h-none">'
)

open('src/App.tsx', 'w', encoding='utf-8').write(content)
print('Done! Responsive fixes applied.')
