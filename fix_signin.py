content = open('src/App.tsx', encoding='utf-8').read()

# Replace desktop sign in link
content = content.replace(
    '              <a href="https://www.inpet.in/webmail" target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-6 py-2.5 self-center">\n                Sign In\n              </a>',
    '              <SignInDropdown />'
)

# Replace mobile sign in link
content = content.replace(
    '              <a\n                href="https://www.inpet.in/webmail"\n                target="_blank"\n                rel="noopener noreferrer"\n                onClick={() => setIsMenuOpen(false)}\n                className="block py-3 px-4 btn-primary text-center mt-4"\n              >\n                Sign In\n              </a>',
    '              <SignInDropdown mobile onClose={() => setIsMenuOpen(false)} />'
)

# Add SignInDropdown component before function App()
component = '''// Sign In Dropdown Component
function SignInDropdown({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) { setError('Please enter your email.'); return; }
    if (!trimmed.endsWith('@inpet.in')) { setError('Only @inpet.in email addresses are allowed.'); return; }
    setError('');
    const webmailUrl = 'https://www.inpet.in/webmail/?_user=' + encodeURIComponent(trimmed);
    window.open(webmailUrl, '_blank');
    setOpen(false);
    setEmail('');
    if (onClose) onClose();
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') validate();
    if (e.key === 'Escape') { setOpen(false); setError(''); }
  };

  if (mobile) {
    return (
      <div className="mt-4 px-4 pb-4">
        <p className="text-xs text-neutral-500 mb-1.5">Enter your @inpet.in email to sign in</p>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }}
            onKeyDown={handleKey}
            placeholder="you@inpet.in"
            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <button onClick={validate} className="btn-primary px-4 py-2 text-sm">Go</button>
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => { setOpen(o => !o); setError(''); }}
        className="btn-primary text-base px-6 py-2.5 flex items-center gap-2"
      >
        Sign In
        <svg className={'w-4 h-4 transition-transform ' + (open ? 'rotate-180' : '')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-neutral-200 p-4 z-50">
          <p className="text-sm font-medium text-neutral-900 mb-1">Sign in to Webmail</p>
          <p className="text-xs text-neutral-500 mb-3">Only @inpet.in email addresses are allowed.</p>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }}
            onKeyDown={handleKey}
            placeholder="yourname@inpet.in"
            className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary mb-2"
            autoFocus
          />
          {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
          <button onClick={validate} className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors">
            Continue to Webmail
          </button>
        </div>
      )}
    </div>
  );
}

'''

content = content.replace('function App() {', component + 'function App() {', 1)

open('src/App.tsx', 'w', encoding='utf-8').write(content)
print('Desktop replaced:', '<SignInDropdown />' in content)
print('Mobile replaced:', 'SignInDropdown mobile' in content)
print('Component added:', 'function SignInDropdown' in content)
print('App intact:', 'function App()' in content)
print('Export intact:', 'export default App' in content)
