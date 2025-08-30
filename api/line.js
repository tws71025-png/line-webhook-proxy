// api/line.js —— 先回 200，避免 LINE timeout，再把 webhook 背景轉送到 GAS
export const config = { runtime: 'edge' };

export default async function handler(req, ctx) {
  // ② 這裡換成你的 GAS /exec 網址（不是 /dev）
  const GAS_EXEC = 'https://script.google.com/macros/s/AKfycbxDMm5Lztc6RnA58fapz7SHJ5oBRfS0ZhNwng4Yp4d1oPYZvrWRrkbPjzw2H9NyD5dJ/exec';

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
