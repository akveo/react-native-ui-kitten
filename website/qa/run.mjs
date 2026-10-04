// Web QA runner: drives the instrumented `QA/Web` story (website/stories/qa.stories.tsx) over CDP.
// Usage: node qa/run.mjs [outDir] [storybookBase]   (needs Storybook on :6006 and a headless Chrome on :9333, see qa/README.md)
import fs from 'node:fs';
import { connect } from './cdp.mjs';
const E = process.argv[2] || 'qa/out';
fs.mkdirSync(E, { recursive: true });
const c = await connect();
const R = []; const rep = (name, pass, detail = '') => { R.push({ name, pass, detail }); console.log((pass ? 'PASS' : 'FAIL') + ' ' + name + (detail ? ' — ' + detail : '')); };
const T = (id) => `[data-testid="${id}"]`;
const near = (a, b, tol = 4) => Math.abs(a - b) <= tol;
// Toggle / Tab keep role and state on an inner element; read the element or its first descendant with a role.
const roleOf = (sel) => c.ev(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; const r = e.getAttribute('role') ? e : e.querySelector('[role]'); return r ? { role: r.getAttribute('role'), checked: r.getAttribute('aria-checked'), selected: r.getAttribute('aria-selected') } : { role: null }; })()`);
await c.goto((process.argv[3] || 'http://localhost:6006') + '/iframe.html?id=qa-web--all&viewMode=story');
await c.waitFor(`!!document.querySelector('${T('qa-button')}')`);
await c.sleep(800);
await c.shot(`${E}/00-page.png`);
c.console.length = 0;

// ---- Button: hover / press / pressIn-Out / long / disabled / icon-only
{
  const r = await c.rect(T('qa-button'));
  const rest = await c.styleSig(T('qa-button'));
  await c.mouseMove(r.cx, r.cy); await c.sleep(200);
  const hov = await c.styleSig(T('qa-button'));
  await c.shot(`${E}/button-hover.png`, { x: r.x - 4, y: r.y - 4, width: r.w + 8, height: r.h + 8 });
  await c.mouseMove(5, 5); await c.sleep(200);
  const back = await c.styleSig(T('qa-button'));
  rep('button hover style applies', hov !== rest); rep('button hover reverts', back === rest);
  await c.qa();
  await c.click(r.cx, r.cy); const q1 = await c.qa();
  rep('button press fires once', q1.filter(e => e === 'button:press').length === 1, JSON.stringify(q1));
  rep('button pressIn/pressOut fire', q1.includes('button:in') && q1.includes('button:out'));
  // held: active style
  await c.mouseMove(r.cx, r.cy);
  await c.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: r.cx, y: r.cy, button: 'left', clickCount: 1 }); await c.sleep(200);
  const held = await c.styleSig(T('qa-button'));
  await c.shot(`${E}/button-active.png`, { x: r.x - 4, y: r.y - 4, width: r.w + 8, height: r.h + 8 });
  await c.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: r.cx, y: r.cy, button: 'left', clickCount: 1 }); await c.sleep(200);
  rep('button active style while held', held !== hov && held !== rest);
  await c.qa();
  await c.click(r.cx, r.cy, 700); const q2 = await c.qa();
  rep('button long press fires', q2.includes('button:long'), JSON.stringify(q2));
  await c.mouseMove(5, 5); await c.sleep(100);
  const d = await c.rect(T('qa-button-disabled')); await c.qa(); await c.click(d.cx, d.cy); const q3 = await c.qa();
  rep('disabled button does nothing', q3.length === 0, JSON.stringify(q3));
  const i = await c.rect(T('qa-button-icon')); await c.click(i.cx, i.cy); const q4 = await c.qa();
  rep('icon-only button press', q4.includes('icon:press'), `size ${i.w}x${i.h}`);
  const g = await c.rect(T('qa-button-ghost')); await c.click(g.cx, g.cy); const q5 = await c.qa();
  rep('ghost button press', q5.includes('ghost:press'));
  const attrs = await c.ev(`(() => { const e = document.querySelector('${T('qa-button')}'); return { role: e.getAttribute('role'), tabindex: e.getAttribute('tabindex'), ariaDisabled: document.querySelector('${T('qa-button-disabled')}').getAttribute('aria-disabled') }; })()`);
  rep('button a11y role/tabindex/disabled', attrs.role === 'button' && attrs.tabindex === '0' && attrs.ariaDisabled === 'true', JSON.stringify(attrs));
}
// ---- CheckBox / Toggle / Radio / RadioGroup: hover, click label, click control, state
for (const [id, tag] of [['qa-checkbox', 'checkbox'], ['qa-toggle', 'toggle'], ['qa-radio', 'radio']]) {
  const r = await c.rect(tag === 'toggle' ? T(id) + ' > *' : T(id));
  const rest = await c.styleSig(T(id));
  await c.mouseMove(r.cx, r.cy); await c.sleep(200); const hov = await c.styleSig(T(id));
  await c.mouseMove(5, 5); await c.sleep(200); const back = await c.styleSig(T(id));
  rep(`${tag} hover style applies`, hov !== rest); rep(`${tag} hover reverts`, back === rest);
  await c.qa();
  await c.click(r.x + 10, r.cy); const q1 = await c.qa(); // control side
  await c.click(r.x + r.w - 10, r.cy); const q2 = await c.qa(); // label side
  const txt = await c.ev(`document.querySelector('${T(id)}').textContent`);
  const a11y = await roleOf(T(id));
  rep(`${tag} control press toggles`, q1.length === 1 && q1[0].endsWith('true'), JSON.stringify(q1));
  // Radio re-press calls onChange(!checked) (library semantics, same on master), so a second press turns it off.
  rep(`${tag} label press toggles`, q2.length === 1 && q2[0].endsWith('false'), JSON.stringify(q2) + ' text=' + txt);
  rep(`${tag} re-renders label`, txt.includes('off'), txt);
  rep(`${tag} a11y role/checked`, !!a11y.role, JSON.stringify(a11y));
  // rapid double tap
  await c.qa(); await c.click(r.cx, r.cy); await c.click(r.cx, r.cy); const q3 = await c.qa();
  rep(`${tag} rapid double tap = 2 events`, q3.length === 2, JSON.stringify(q3));
}
{
  const r1 = await c.rect(T('qa-rg-1')); await c.qa(); await c.click(r1.cx, r1.cy); const q = await c.qa();
  const a = await c.ev(`[0,1].map(i => document.querySelector('[data-testid="qa-rg-'+i+'"]').getAttribute('aria-checked'))`);
  rep('radiogroup selects B, A unchecked', q.includes('group:1') && JSON.stringify(a) === '["false","true"]', JSON.stringify(q) + JSON.stringify(a));
}
// ---- Input: focus style, type, echo, accessory, blur
{
  const r = await c.rect(T('@qa-input/input'));
  const rest = await c.styleSig(T('@qa-input/container'));
  await c.qa(); await c.click(r.x + 30, r.cy); await c.sleep(200);
  const foc = await c.styleSig(T('@qa-input/container'));
  rep('input focus style applies', foc !== rest);
  const q0 = await c.qa(); rep('input focus event', q0.includes('input:focus'), JSON.stringify(q0));
  await c.type('abc'); const q1 = await c.qa();
  const echo = await c.ev(`document.querySelector('${T('qa-input-echo')}').textContent`);
  const val = await c.ev(`document.querySelector('${T('@qa-input/input')}').value`);
  rep('input value updates while typing', val === 'abc' && echo === 'echo:abc', `val=${val} ${echo} ${JSON.stringify(q1)}`);
  await c.shot(`${E}/input-focused.png`, { x: r.x - 4, y: r.y - 24, width: r.w + 8, height: r.h + 48 });
  await c.click(5, 5); await c.sleep(200); const q2 = await c.qa();
  rep('input blur event + style reverts', q2.includes('input:blur') && (await c.styleSig(T('@qa-input/container'))) === rest, JSON.stringify(q2));
  const labelCap = await c.ev(`document.querySelector('${T('@qa-input/container')}').parentElement.textContent`);
  rep('input label+caption render', /Label/.test(labelCap) && /Caption/.test(labelCap), labelCap.slice(0, 60));
}
// ---- Select: first open positioned at anchor, pick, re-open, backdrop
{
  const r = await c.rect(T('qa-select'));
  await c.qa(); await c.click(r.cx, r.cy); await c.sleep(400);
  const o2 = await c.rectText('Option 2');
  await c.shot(`${E}/select-open.png`);
  rep('select first open shows options', !!o2, JSON.stringify(o2));
  rep('select options positioned under anchor', !!o2 && o2.y > r.y + r.h - 2 && o2.y < r.y + r.h + 200 && o2.x >= r.x - 2 && o2.x < r.x + r.w, `anchor=${JSON.stringify(r)} opt=${JSON.stringify(o2)}`);
  const a11y = await c.ev(`(() => { const e = document.querySelector('${T('qa-select')}'); return { role: e.getAttribute('role'), expanded: e.getAttribute('aria-expanded') }; })()`);
  rep('select a11y combobox/expanded', a11y.role === 'combobox' && a11y.expanded === 'true', JSON.stringify(a11y));
  // hover option
  const restO = await c.html('body'); await c.mouseMove(o2.cx, o2.cy); await c.sleep(200); const hovO = await c.html('body');
  rep('select option hover style', restO !== hovO);
  await c.click(o2.cx, o2.cy); await c.sleep(300); const q = await c.qa();
  const val = await c.ev(`document.querySelector('${T('qa-select')}').textContent`);
  rep('select pick updates value', q.includes('select:1') && /Option 2/.test(val), JSON.stringify(q) + ' ' + val);
  rep('select closes after pick', !(await c.rectText('Option 3')));
  await c.click(r.cx, r.cy); await c.sleep(400); const again = await c.rectText('Option 3');
  rep('select re-open works', !!again && near(again.x, o2.x, 2), JSON.stringify(again));
  await c.click(5, 5); await c.sleep(300); rep('select backdrop closes', !(await c.rectText('Option 3')));
}
// ---- Popover / Tooltip / OverflowMenu / Modal
{
  const r = await c.rect(T('qa-popover-btn'));
  await c.click(r.cx, r.cy); await c.sleep(400);
  const p = await c.rect(T('qa-popover-content'));
  await c.shot(`${E}/popover-open.png`);
  rep('popover first open at anchor (bottom)', !!p && p.y > r.y + r.h && p.y < r.y + r.h + 40 && near(p.cx, r.cx, 20), `anchor=${JSON.stringify(r)} content=${JSON.stringify(p)}`);
  await c.qa(); await c.click(800, 700); await c.sleep(300); const q = await c.qa();
  rep('popover backdrop closes', q.includes('popover:backdrop') && !(await c.rect(T('qa-popover-content'))), JSON.stringify(q));
  await c.click(r.cx, r.cy); await c.sleep(400); const p2 = await c.rect(T('qa-popover-content'));
  rep('popover re-open same position', !!p2 && near(p2.x, p.x, 2) && near(p2.y, p.y, 2), JSON.stringify(p2));
  await c.click(800, 700); await c.sleep(300);
  const t = await c.rect(T('qa-tooltip-btn')); await c.click(t.cx, t.cy); await c.sleep(400);
  const tt = await c.rectText('Tooltip text'); await c.shot(`${E}/tooltip-open.png`);
  rep('tooltip shows at anchor', !!tt && near(tt.cx, t.cx, 30) && Math.abs(tt.cy - t.cy) < 80, `anchor=${JSON.stringify(t)} tip=${JSON.stringify(tt)}`);
  await c.click(800, 700); await c.sleep(300); rep('tooltip backdrop hides', !(await c.rectText('Tooltip text')));
  const o = await c.rect(T('qa-ofm-btn')); await c.click(o.cx, o.cy); await c.sleep(400);
  const oi = await c.rectText('OFM Two'); await c.shot(`${E}/ofm-open.png`);
  rep('overflow menu opens at anchor', !!oi && Math.abs(oi.cx - o.cx) < 150 && oi.y > o.y, `anchor=${JSON.stringify(o)} item=${JSON.stringify(oi)}`);
  await c.qa(); await c.click(oi.cx, oi.cy); await c.sleep(300); const oq = await c.qa();
  rep('overflow item press closes + selects', oq.includes('ofm:1') && !(await c.rectText('OFM Two')), JSON.stringify(oq));
  await c.click(o.cx, o.cy); await c.sleep(400); rep('overflow re-open', !!(await c.rectText('OFM Two'))); await c.click(800, 700); await c.sleep(300);
  const m = await c.rect(T('qa-modal-btn')); await c.click(m.cx, m.cy); await c.sleep(400);
  const mc = await c.rect(T('qa-modal-content')); await c.shot(`${E}/modal-open.png`);
  rep('modal content visible & centred', !!mc && mc.w > 0 && Math.abs(mc.cx - 500) < 150, JSON.stringify(mc));
  const mb = await c.rect(T('qa-modal-close')); await c.click(mb.cx, mb.cy); await c.sleep(300);
  rep('modal close button', !(await c.rect(T('qa-modal-content'))));
}
// ---- Datepicker / Calendar
{
  await c.ev(`document.querySelector('${T('qa-datepicker')}').scrollIntoView({ block: 'center' })`); await c.sleep(200);
  const r = await c.rect(T('qa-datepicker'));
  await c.click(r.cx, r.cy); await c.sleep(500);
  const day = await c.ev(`(() => { const ctrl = document.querySelector('${T('qa-datepicker')}').getBoundingClientRect(); const all = [...document.querySelectorAll('*')].filter(e => e.children.length === 0 && e.textContent.trim() === '15').map(e => e.getBoundingClientRect()).filter(r => r.y > ctrl.y).sort((a, b) => a.y - b.y); const r = all[0]; return r ? { x: r.x, y: r.y, w: r.width, h: r.height, cx: r.x + r.width / 2, cy: r.y + r.height / 2, count: all.length } : null; })()`); await c.shot(`${E}/datepicker-open.png`);
  rep('datepicker first open shows calendar at control', !!day && Math.abs(day.y - r.y) < 500 && day.x >= r.x - 10 && day.x < r.x + r.w, `ctrl=${JSON.stringify(r)} day15=${JSON.stringify(day)}`);
  await c.qa(); await c.click(day.cx, day.cy); await c.sleep(300); const q = await c.qa();
  const echo = await c.ev(`document.querySelector('${T('qa-date-echo')}').textContent`);
  rep('datepicker pick updates value', q.includes('date:15') && echo === 'date:15', JSON.stringify(q) + ' ' + echo);
  rep('datepicker closes after pick', (await c.rectText('15')).count === 1);
  await c.click(r.cx, r.cy); await c.sleep(400); rep('datepicker re-open', !!(await c.rectText('16')));
  await c.click(5, 5); await c.sleep(300);
  await c.ev(`document.querySelector('${T('qa-calendar')}').scrollIntoView({ block: 'center' })`); await c.sleep(200);
  const d20 = await c.rectText('20'); await c.qa(); await c.click(d20.cx, d20.cy); await c.sleep(300); const cq = await c.qa();
  const cecho = await c.ev(`document.querySelector('${T('qa-cal-echo')}').textContent`);
  rep('calendar day press selects + re-renders', cq.includes('cal:20') && cecho === 'cal:20', JSON.stringify(cq) + ' ' + cecho);
  const hdr = await c.ev(`document.querySelector('${T('qa-calendar')}').textContent.slice(0, 40)`);
  const arrows = await c.ev(`[...document.querySelector('${T('qa-calendar')}').querySelectorAll('[role="button"]')].map(b => ({ w: b.getBoundingClientRect().width, h: b.getBoundingClientRect().height, label: b.getAttribute('aria-label'), text: b.textContent.slice(0,20) }))`);
  await c.shot(`${E}/calendar.png`);
  rep('calendar header + arrows present', arrows.length >= 3, hdr + ' ' + JSON.stringify(arrows).slice(0, 300));
  const before = hdr; const nextBtn = arrows[arrows.length - 1];
  const nb = await c.ev(`(() => { const b = [...document.querySelector('${T('qa-calendar')}').querySelectorAll('[role="button"]')][2]; const r = b.getBoundingClientRect(); return { cx: r.x + r.width/2, cy: r.y + r.height/2 }; })()`);
  await c.click(nb.cx, nb.cy); await c.sleep(300);
  const after = await c.ev(`document.querySelector('${T('qa-calendar')}').textContent.slice(0, 40)`);
  rep('calendar next-month arrow navigates', before !== after, `${before} -> ${after}`);
}
// ---- Card / List / Menu / TabBar / TopNavigationAction / Autocomplete
{
  await c.ev(`document.querySelector('${T('qa-card')}').scrollIntoView({ block: 'center' })`); await c.sleep(200);
  const r = await c.rect(T('qa-card')); await c.qa(); await c.click(r.cx, r.cy + 20); const q = await c.qa();
  rep('card press + header render', q.includes('card:press') && /Header/.test(await c.ev(`document.querySelector('${T('qa-card')}').textContent`)), JSON.stringify(q));
  const li = await c.rect(T('qa-li-Beta'));
  const rest = await c.styleSig(T('qa-li-Beta')); await c.mouseMove(li.cx, li.cy); await c.sleep(200); const hov = await c.styleSig(T('qa-li-Beta')); await c.mouseMove(5, 5); await c.sleep(200);
  rep('list item has no hover state (mapping has none; unchanged from master)', hov === rest);
  await c.qa(); await c.click(li.x + 60, li.cy); const q1 = await c.qa();
  const lb = await c.rect(T('qa-li-btn-Beta')); await c.click(lb.cx, lb.cy); const q2 = await c.qa();
  rep('list item row press', JSON.stringify(q1) === '["li:Beta"]', JSON.stringify(q1));
  rep('list item accessory button press distinct', JSON.stringify(q2) === '["li-btn:Beta"]', JSON.stringify(q2));
  const mi = await c.rect(T('qa-mi-1'));
  const mrest = await c.styleSig(T('qa-mi-1')); await c.mouseMove(mi.cx, mi.cy); await c.sleep(200); const mhov = await c.styleSig(T('qa-mi-1')); await c.mouseMove(5, 5); await c.sleep(200);
  rep('menu item hover style', mhov !== mrest);
  const m0 = await c.styleSig(T('qa-mi-0')); await c.qa(); await c.click(mi.cx, mi.cy); await c.sleep(200); const mq = await c.qa();
  const m0after = await c.styleSig(T('qa-mi-0')); const m1after = await c.styleSig(T('qa-mi-1'));
  rep('menu select moves highlight (context)', mq.includes('menu:1') && m0 !== m0after && m1after !== mrest, JSON.stringify(mq));
  const tb = await c.rect(T('qa-tab-1')); await c.qa(); await c.click(tb.cx, tb.cy); await c.sleep(300); const tq = await c.qa();
  const techo = await c.ev(`document.querySelector('${T('qa-tab-echo')}').textContent`);
  const ta = [await roleOf(T('qa-tab-0')), await roleOf(T('qa-tab-1'))].map((r) => `${r.role}:${r.selected}`);
  rep('tab press selects', tq.includes('tab:1') && techo === 'tab:1', JSON.stringify(tq) + techo);
  console.log('info: Tab role/selected on web =', JSON.stringify(ta), '(RNW exposes no role for Tab on master either; selection is asserted via the echo above)');
  await c.shot(`${E}/tabs-menu-list.png`);
  await c.ev(`document.querySelector('${T('qa-topnav-action')}').scrollIntoView({ block: 'center' })`); await c.sleep(200);
  const tn = await c.rect(T('qa-topnav-action')); await c.qa(); await c.click(tn.x + 12, tn.cy); const tnq = await c.qa();
  const tnInfo = await c.ev(`(() => { const e = document.querySelector('${T('qa-topnav-action')}'); const p = e.parentElement; return { tag: e.tagName, role: e.getAttribute('role'), cls: e.className.slice(0,60), html: e.outerHTML.slice(0, 300), parentRole: p.getAttribute('role'), parentRect: JSON.stringify(p.getBoundingClientRect()), topAt: (() => { const t = document.elementFromPoint(${tn.cx}, ${tn.cy}); return t && (t.tagName + '/' + (t.getAttribute('data-testid') || '') + '/' + t.getAttribute('role')); })() }; })()`);
  rep('top navigation action press', tnq.includes('topnav:press'), `size ${tn.w}x${tn.h} ${JSON.stringify(tnq)} ${JSON.stringify(tnInfo)}`);
  await c.ev(`document.querySelector('${T('@@qa-autocomplete/input/input')}').scrollIntoView({ block: 'center' })`); await c.sleep(200);
  const ac = await c.rect(T('@@qa-autocomplete/input/input')); await c.click(ac.x + 30, ac.cy); await c.sleep(200); await c.qa(); await c.type('an'); await c.sleep(400);
  const opts = await c.ev(`['Banana','Apple','Cherry'].map(t => !![...document.querySelectorAll('*')].find(e => e.children.length === 0 && e.textContent.trim() === t && e.getBoundingClientRect().width > 0))`);
  await c.shot(`${E}/autocomplete-open.png`);
  rep('autocomplete list filters while typing', JSON.stringify(opts) === '[true,false,false]', JSON.stringify(opts));
  const ban = await c.rectText('Banana'); await c.qa(); await c.click(ban.cx, ban.cy); await c.sleep(300); const aq = await c.qa();
  const acv = await c.ev(`document.querySelector('${T('@@qa-autocomplete/input/input')}').value`);
  rep('autocomplete item press fills input', aq.includes('ac-select:Banana') && acv === 'Banana', JSON.stringify(aq) + ' val=' + acv);
}
// ---- Keyboard: Tab order, focus style, Enter/Space
{
  await c.key('Escape'); await c.click(990, 10); await c.sleep(300); await c.ev('document.activeElement && document.activeElement.blur(); window.scrollTo(0,0);'); await c.sleep(300);
  rep('autocomplete overlay closed before keyboard tests', !(await c.rectText('Banana')) || (await c.rectText('Banana')).count === 0, JSON.stringify(await c.rectText('Banana')));
  await c.ev(`document.querySelector('${T('qa-button')}').focus()`); await c.sleep(150);
  const a1 = await c.active(); await c.qa(); await c.key('Enter'); const qe = await c.qa(); await c.key('Space'); const qs = await c.qa();
  rep('button focusable', a1?.testid === 'qa-button', JSON.stringify(a1));
  rep('button Enter activates', qe.includes('button:press'), JSON.stringify(qe));
  rep('button Space activates', qs.includes('button:press'), JSON.stringify(qs));
  await c.ev('document.activeElement.blur()'); await c.ev(`document.querySelector('${T('qa-button')}').focus()`);
  const rest = await c.styleSig(T('qa-button')); // focused sig
  await c.ev('document.activeElement.blur()'); await c.sleep(100); const blurred = await c.styleSig(T('qa-button'));
  rep('button focus style (visible)', rest !== blurred, 'note: programmatic focus');
  // real Tab traversal from top
  await c.ev('document.body.focus(); window.scrollTo(0,0)');
  const order = []; for (let i = 0; i < 12; i++) { await c.key('Tab'); const a = await c.active(); order.push(a?.testid || a?.role || a?.tag); }
  rep('Tab reaches touchables and skips Input wrappers', order.includes('qa-checkbox') && order.includes('@qa-input/input') && !order.some((o) => String(o).endsWith('/container')), order.join(','));
  for (const [id, ev] of [['qa-checkbox', 'checkbox'], ['qa-toggle', 'toggle'], ['qa-radio', 'radio'], ['qa-select', null]]) {
    await c.ev(`document.querySelector('${T(id)}').focus()`); await c.sleep(100); await c.qa(); await c.key('Enter'); const e = await c.qa(); await c.key('Space'); const s = await c.qa();
    if (ev) {
      // react-native-web baseline (same on master): Enter activates CheckBox and Radio, nothing activates Toggle, Space activates none of them.
      const enterExpected = ev !== 'toggle';
      rep(`${ev} Enter ${enterExpected ? 'activates' : 'does not activate (RNW baseline)'}`, e.some(x => x.startsWith(ev)) === enterExpected, JSON.stringify(e));
      rep(`${ev} Space does not activate (RNW baseline)`, !s.some(x => x.startsWith(ev)), JSON.stringify(s));
    }
    else { const open = !!(await c.rectText('Option 3')); rep('select Enter/Space opens', open, JSON.stringify([e, s])); if (open) { await c.click(5, 5); await c.sleep(200); } }
  }
}
// ---- Console
const KNOWN = [/Animated: `useNativeDriver` is not supported/]; // react-native-web prints this once per session
const bad = c.console.filter(m => (/warn|error|exception/.test(m.type) || /unsupported configuration|act\(|key/i.test(m.text)) && !KNOWN.some((k) => k.test(m.text)));
rep('no console warnings/errors', bad.length === 0, JSON.stringify(bad).slice(0, 1500));
console.log('\nALL:', c.console.length, 'console entries');
console.log(JSON.stringify(c.console.slice(0, 20), null, 0));
const failed = R.filter(r => !r.pass).length;
console.log('\nSUMMARY', R.length - failed, '/', R.length, failed ? 'FAILED' : 'OK');
c.close(); process.exit(failed ? 1 : 0);
