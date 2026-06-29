const endpoints = [
  'https://ai-startup-simulator-backend-wnix.onrender.com/api/auth/login',
  'https://ai-startup-simulator-backend-wnix.onrender.com/api/auth/register',
  'https://ai-startup-simulator-backend-wnix.onrender.com/api/profile',
  'https://ai-startup-simulator-backend-wnix.onrender.com/api/dashboard',
];
(async () => {
  const fetch = globalThis.fetch || (await import('node-fetch')).default;
  for (const url of endpoints) {
    try {
      const res = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
      const text = await res.text();
      console.log('URL', url, 'STATUS', res.status, 'BODY', text.slice(0, 300));
    } catch (err) {
      console.error('ERR', url, err.message || err);
    }
  }
})();
