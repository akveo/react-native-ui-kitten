// Minimal CDP client for headless Chrome on :9333
import fs from 'node:fs';
export async function connect(port = 9333) {
  const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  let page = targets.find(t => t.type === 'page');
  if (!page) page = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let id = 0; const pending = new Map(); const listeners = [];
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) { const { res, rej } = pending.get(msg.id); pending.delete(msg.id); msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result); }
    else if (msg.method) listeners.forEach(l => l(msg));
  };
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
  const on = (l) => listeners.push(l);
  const console_ = [];
  on((m) => {
    if (m.method === 'Runtime.consoleAPICalled') console_.push({ type: m.params.type, text: m.params.args.map(a => a.value ?? a.description ?? '').join(' ').slice(0, 300) });
    if (m.method === 'Runtime.exceptionThrown') console_.push({ type: 'exception', text: (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).slice(0, 300) });
    if (m.method === 'Log.entryAdded') console_.push({ type: 'log:' + m.params.entry.level, text: m.params.entry.text.slice(0, 300) });
  });
  await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable'); await send('DOM.enable');
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) throw new Error('eval: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text)); return r.result.value; };
  const goto = async (url) => { await send('Page.navigate', { url }); await sleep(500); };
  const waitFor = async (expr, timeout = 15000) => { const t = Date.now(); while (Date.now() - t < timeout) { try { if (await ev(expr)) return true; } catch {} await sleep(100); } throw new Error('timeout waiting: ' + expr); };
  const rect = async (sel) => ev(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, cx: r.x + r.width / 2, cy: r.y + r.height / 2 }; })()`);
  const rectText = async (text, nth = 0) => ev(`(() => { const all = [...document.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.trim() === ${JSON.stringify(text)}); const e = all[${nth}]; if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, cx: r.x + r.width / 2, cy: r.y + r.height / 2, count: all.length }; })()`);
  const mouseMove = (x, y) => send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
  const click = async (x, y, hold = 0) => { await mouseMove(x, y); await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 }); if (hold) await sleep(hold); await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 }); await sleep(120); };
  const keys = { Tab: { code: 'Tab', vk: 9 }, Enter: { code: 'Enter', vk: 13, text: '\r' }, Space: { key: ' ', code: 'Space', vk: 32, text: ' ' }, Escape: { code: 'Escape', vk: 27 } };
  const key = async (name, mods = 0) => { const k = keys[name]; const base = { key: k.key || name, code: k.code, windowsVirtualKeyCode: k.vk, nativeVirtualKeyCode: k.vk, modifiers: mods }; await send('Input.dispatchKeyEvent', { type: k.text ? 'keyDown' : 'rawKeyDown', ...base, text: k.text }); await send('Input.dispatchKeyEvent', { type: 'keyUp', ...base }); await sleep(100); };
  const type = async (s) => { for (const ch of s) { await send('Input.dispatchKeyEvent', { type: 'keyDown', key: ch, text: ch, unmodifiedText: ch }); await send('Input.dispatchKeyEvent', { type: 'keyUp', key: ch }); } await sleep(150); };
  const shot = async (path, clip) => { const r = await send('Page.captureScreenshot', { format: 'png', ...(clip ? { clip: { ...clip, scale: 1 } } : {}) }); fs.writeFileSync(path, Buffer.from(r.data, 'base64')); return path; };
  const qa = async () => ev('(() => { const q = window.__qa || []; window.__qa = []; return q; })()');
  const active = async () => ev(`(() => { const e = document.activeElement; if (!e) return null; return { tag: e.tagName, testid: e.getAttribute('data-testid'), role: e.getAttribute('role'), text: e.textContent.slice(0, 40), tabindex: e.getAttribute('tabindex') }; })()`);
  const html = async (sel) => ev(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); return e ? e.outerHTML : null; })()`);
  const styleSig = async (sel) => ev(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; const sig = []; for (const n of [e, ...e.querySelectorAll('*')]) { const cs = getComputedStyle(n); sig.push([cs.backgroundColor, cs.borderColor, cs.color, cs.opacity, n.getAttribute('fill') || ''].join('|')); } return sig.join(';'); })()`);
  const bodyText = async () => ev('document.body.innerText');
  return { send, ev, goto, waitFor, rect, rectText, mouseMove, click, key, type, shot, qa, active, html, styleSig, bodyText, sleep, console: console_, close: () => ws.close() };
}
