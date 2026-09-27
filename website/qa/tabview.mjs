// TabView web checks for #1397 (hidden pager must stay quiet) and #1498 (tab content must scroll).
// Usage: node qa/tabview.mjs [storybookBase]   (Storybook on :6006, headless Chrome on :9333)
import { connect } from './cdp.mjs';
const base = process.argv[2] || 'http://localhost:6006';
const c = await connect();
const T = (id) => `[data-testid="${id}"]`;
const rep = (name, pass, detail = '') => console.log((pass ? 'PASS' : 'FAIL') + ' ' + name + (detail ? ' — ' + detail : ''));
const clickText = async (text) => {
  const r = await c.ev(`(() => { const e = [...document.querySelectorAll('div,span')].find(n => n.textContent.toUpperCase() === ${JSON.stringify(text)} && n.children.length === 0); if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; })()`);
  if (!r) throw new Error('no element with text ' + text);
  await c.click(r.x, r.y);
};

// ---- #1498 scrolling content
await c.goto(base + '/iframe.html?id=components-tab--tab-view-scroll&viewMode=story');
await c.waitFor(`!!document.querySelector('${T('tab-scroll')}')`);
await c.sleep(600);
const before = await c.ev(`document.querySelector('${T('tab-scroll')}').scrollTop`);
const r = await c.rect(T('tab-scroll'));
await c.mouseMove(r.cx, r.cy);
for (let i = 0; i < 5; i++) { await c.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: r.cx, y: r.cy, deltaX: 0, deltaY: 300 }); await c.sleep(80); }
await c.sleep(300);
const after = await c.ev(`document.querySelector('${T('tab-scroll')}').scrollTop`);
const box = await c.ev(`(() => { const e = document.querySelector('${T('tab-scroll')}'); return { client: e.clientHeight, scroll: e.scrollHeight, overflowY: getComputedStyle(e).overflowY }; })()`);
rep('tab content scrolls with the wheel', after > before, `scrollTop ${before} -> ${after}, ${JSON.stringify(box)}`);
await c.shot('qa/out/tabview-scroll.png');

// ---- #1397 hidden pager
await c.goto(base + '/iframe.html?id=components-tab--tab-view-hidden&viewMode=story');
await c.waitFor(`!!document.querySelector('${T('tab-state')}')`);
await c.sleep(600);
const state = () => c.ev(`document.querySelector('${T('tab-state')}').textContent`);
await clickText('SECOND'); await c.sleep(600);
const s1 = await state();
const h = await c.rect(T('tab-hide')); await c.click(h.cx, h.cy); await c.sleep(2000);
const s2 = await state();
rep('hidden pager reports no selections', s1 === s2 && /calls: 1$/.test(s2), `${s1} | after hide ${s2}`);
await c.click(h.cx, h.cy); await c.sleep(800);
await clickText('FIRST'); await c.sleep(800);
const s3 = await state();
rep('pager responds again after show', /selected: 0, onSelect calls: 2$/.test(s3), s3);
// ---- #1234 lazy pages must not bounce
await c.goto(base + '/iframe.html?id=components-tab--tab-view-lazy&viewMode=story');
await c.waitFor(`!!document.querySelector('${T('lazy-state')}')`);
await c.sleep(600);
await clickText('FOUR'); await c.sleep(900);
await clickText('ONE'); await c.sleep(900);
await clickText('THREE'); await c.sleep(900);
const lazy = await c.ev(`document.querySelector('${T('lazy-state')}').textContent`);
rep('lazy tabs land where tapped', /selected: 2, calls: 3,0,2$/.test(lazy), lazy);

const errors = c.console.filter((m) => /error|Maximum update depth/i.test(m));
rep('no console errors', errors.length === 0, errors.slice(0, 2).join(' | '));
await c.close?.();
process.exit(0);
