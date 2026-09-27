import { connect } from './cdp.mjs';
// Prints the keyboard Tab order of the QA story (40 stops) and every focusable element; compare branch vs master.
const c = await connect(); const base = process.argv[2] || 'http://localhost:6006';
await c.goto(base + '/iframe.html?id=qa-web--all&viewMode=story'); await c.waitFor(`!!document.querySelector('[data-testid="qa-button"]')`); await c.sleep(1000);
await c.ev('document.body.focus(); window.scrollTo(0,0)');
const order = []; for (let i = 0; i < 40; i++) { await c.key('Tab'); const a = await c.active(); order.push((a?.testid || a?.tag + (a?.role ? '/' + a.role : '') + (a?.text ? '"' + a.text.slice(0, 12) + '"' : ''))); }
console.log(base + '\n  ' + order.join('\n  '));
const focusables = await c.ev(`[...document.querySelectorAll('[tabindex="0"], button, input, a[href]')].map(e => (e.getAttribute('data-testid') || e.tagName) + ':' + (e.getAttribute('role') || '')).join(', ')`);
console.log('tabindex0/buttons/inputs:', focusables);
c.close(); process.exit(0);
