#!/usr/bin/env python3
# q.py <mode> <section> <text> : query raw snapshot nodes below section title (and above next section title)
# modes: has (exit 0 if text found in label/value), center (print "x y" of first exact-label match), rect (print rect of id), count
import json, subprocess, sys, os
mode, section, text = sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else ''
out = subprocess.run(['agent-device', 'snapshot', '--raw'], capture_output=True, text=True).stdout
nodes = []
for line in out.splitlines():
    if line.startswith('{'):
        try:
            n = json.loads(line)
            if isinstance(n.get('rect'), dict): nodes.append(n)
        except Exception: pass
def ident(n): return n.get('identifier') or n.get('resourceId') or n.get('id') or ''
def lab(n): return str(n.get('label') or n.get('text') or '') + '|' + str(n.get('value') or '')
if mode == 'rect':
    for n in nodes:
        if ident(n) == section:
            r = n['rect']; print(int(r['x']), int(r['y']), int(r['width']), int(r['height'])); sys.exit(0)
    print('NOID', file=sys.stderr); sys.exit(1)
if mode == 'to':
    tgt = next((n for n in nodes if ident(n) == section), None)
    ORDER = "Layout Button ButtonGroup Input InputAccessories CheckBox Toggle Radio RadioGroup Card Avatar Spinner ProgressBar CircularProgressBar Divider Icon List ListItem Menu MenuItem Select SelectSize SelectItem Popover Tooltip OverflowMenu Modal TopNavigation TopNavigationAction BottomNavigation BottomNavigationTab Tab TabBar TabView Drawer DrawerItem Calendar CalendarFilters CalendarMoment RangeCalendar RangeCalendarFilters Datepicker RangeDatepicker Autocomplete ViewPager".split()
    sv0 = next((n for n in nodes if ident(n) == 'showcase-scroll' or 'Scroll' in str(n.get('type'))), None)
    vh0 = sv0['rect']['height'] if sv0 else 800
    if tgt is None:
        vis = [ident(n)[8:-6] for n in nodes if ident(n).startswith('section-') and ident(n).endswith('-title')]
        vis = [v for v in vis if v in ORDER]
        DIRF = '/tmp/adq-lastdir'
        if section.startswith('section-') and section.endswith('-title') and not vis:
            try: d = open(DIRF).read().strip() or 'down'
            except Exception: d = 'down'
            print(d, int(vh0 * 0.5)); sys.exit(0)
        if section.startswith('section-') and section.endswith('-title') and vis:
            ti = ORDER.index(section[8:-6]); vi = ORDER.index(vis[0])
            d = 'down' if ti > vi else 'up'
            open(DIRF, 'w').write(d)
            print(d, int(vh0 * 0.5)); sys.exit(0)
        print('NOID'); sys.exit(0)
    sv = next((n for n in nodes if ident(n) == 'showcase-scroll' or 'Scroll' in str(n.get('type'))), None)
    if sv is None: vy, vh = 0, max(n['rect']['y'] + n['rect']['height'] for n in nodes if n['rect']['y'] >= 0)
    else: vy, vh = sv['rect']['y'], sv['rect']['height']
    cy = tgt['rect']['y'] + tgt['rect']['height'] / 2
    top, bot = vy + vh * 0.12, vy + vh * 0.80
    if top <= cy <= bot: print('ok')
    elif cy > bot: print('down', int(min(cy - (vy + vh * 0.45), vh * 0.5)))
    else: print('up', int(min((vy + vh * 0.45) - cy, vh * 0.5)))
    sys.exit(0)
if mode == 'near':
    # near <id> <text>: exact-label match closest (vertically) to the id node; the id may be absent (Android overlay window)
    ref = next((n for n in nodes if ident(n) == section), None)
    y = ref['rect']['y'] if ref is not None else 0
    m = [n for n in nodes if (n.get('label') == text or n.get('text') == text or str(n.get('value')) == text)]
    if not m: print('NOMATCH', file=sys.stderr); sys.exit(1)
    m.sort(key=lambda n: abs(n['rect']['y'] - y)); r = m[0]['rect']
    print(int(r['x'] + r['width'] / 2), int(r['y'] + r['height'] / 2)); sys.exit(0)
if mode == 'below':
    # below <id> <text>: first exact-label match whose top is below the id node's top, nearest first
    ref = next((n for n in nodes if ident(n) == section), None)
    # Android's tree holds only the top window while an overlay is open, so the anchor may be absent: match anywhere
    y = ref['rect']['y'] if ref is not None else -10**9
    m = [n for n in nodes if n['rect']['y'] > y and (n.get('label') == text or n.get('text') == text or str(n.get('value')) == text)]
    if not m: print('NOMATCH', file=sys.stderr); sys.exit(1)
    m.sort(key=lambda n: n['rect']['y']); r = m[0]['rect']
    print(int(r['x'] + r['width'] / 2), int(r['y'] + r['height'] / 2)); sys.exit(0)
titles = sorted([(n['rect']['y'], ident(n)) for n in nodes if ident(n).startswith('section-') and ident(n).endswith('-title')])
y0 = None; y1 = 10**9
for i, (y, t) in enumerate(titles):
    if t == f'section-{section}-title':
        y0 = y; y1 = titles[i + 1][0] if i + 1 < len(titles) else 10**9
if y0 is None:
    # Android exposes only visible nodes: the section title may have scrolled off. Bound the band by the
    # next visible section title (by showcase order) and let it start at the top of the tree.
    ORDER2 = "Layout Button ButtonGroup Input InputAccessories CheckBox Toggle Radio RadioGroup Card Avatar Spinner ProgressBar CircularProgressBar Divider Icon List ListItem Menu MenuItem Select SelectSize SelectItem Popover Tooltip OverflowMenu Modal TopNavigation TopNavigationAction BottomNavigation BottomNavigationTab Tab TabBar TabView Drawer DrawerItem Calendar CalendarFilters CalendarMoment RangeCalendar RangeCalendarFilters Datepicker RangeDatepicker Autocomplete ViewPager".split()
    if section not in ORDER2: print('NOSECTION', file=sys.stderr); sys.exit(2)
    si = ORDER2.index(section)
    later = [y for (y, t) in titles if t[8:-6] in ORDER2 and ORDER2.index(t[8:-6]) > si]
    earlier = [y for (y, t) in titles if t[8:-6] in ORDER2 and ORDER2.index(t[8:-6]) < si]
    y0 = max(earlier) if earlier else -10**9
    y1 = min(later) if later else 10**9
inrange = [n for n in nodes if y0 < n['rect']['y'] < y1 and n['rect'].get('height', 0) > 0]
if mode == 'has':
    ok = any(text in lab(n) for n in inrange); print('yes' if ok else 'no'); sys.exit(0 if ok else 1)
if mode == 'count':
    print(sum(1 for n in inrange if text in lab(n))); sys.exit(0)
if mode == 'center':
    m = [n for n in inrange if (n.get('label') == text or n.get('text') == text or str(n.get('value')) == text)]
    if not m: print('NOMATCH', file=sys.stderr); sys.exit(1)
    m.sort(key=lambda n: (n['rect']['y'], n['rect']['x']))
    nth = os.environ.get('NTH') or None; n = (m[int(nth)] if nth is not None and int(nth) < len(m) else (m[0] if os.environ.get('LAST') != '1' else m[-1])); r = n['rect']
    print(int(r['x'] + r['width'] / 2), int(r['y'] + r['height'] / 2)); sys.exit(0)
if mode == 'dump':
    for n in inrange: print(ident(n), n.get('type'), lab(n)[:60], {k: int(v) for k, v in n['rect'].items()})
