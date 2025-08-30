export const config = { runtime: 'edge' };

export default async function handler(req, ctx) {
  const GAS_EXEC = 'https://script.google.com/macros/s/AKfycbxDWm4NNPuLR9T9iKIM2VDc3wnz3MZeHX2p3LU7XSHX1eaG6ntTDHQtQfpeLABsBWvxXw/exec'; // ← 改你的 /exec
  const res = new Response('OK', { status: 200, headers: { 'content-type': 'text/plain' } });
  ctx.waitUntil((async () => {
    try {
      const body = req.method === 'POST' ? await req.clone().text() : null;
      await fetch(GAS_EXEC, {
        method: req.method,
        headers: { 'content-type': req.headers.get('content-type') || 'application/json' },
        body
      });
    } catch (_) {}
  })());
  return res;
}
