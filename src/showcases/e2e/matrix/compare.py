#!/usr/bin/env python3
"""compare.py <masterDir> <prDir> <reportOut>
For each combo/section: align screenshots on the section title rect (from raw dump), crop the
section band [title.y, next title y or screen bottom], diff pixels; also compare node rects
(identifier/label -> rect) relative to the title. Prints a table."""
import json, os, sys
from PIL import Image, ImageChops
A, B, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
def nodes(path):
    out = []
    for line in open(path):
        if line.startswith('{'):
            try:
                n = json.loads(line)
                if isinstance(n.get('rect'), dict): out.append(n)
            except Exception: pass
    return out
def ident(n): return n.get('identifier') or n.get('resourceId') or ''
def title_y(ns, sec):
    for n in ns:
        if ident(n) == f'section-{sec}-title': return n['rect']['y']
    return None
def next_title_y(ns, y0):
    ys = [n['rect']['y'] for n in ns if ident(n).startswith('section-') and ident(n).endswith('-title') and n['rect']['y'] > y0 + 1]
    return min(ys) if ys else None
def scale(img, ns):
    # px per rect unit: image width / root width (root = widest node)
    w = max(n['rect']['x'] + n['rect']['width'] for n in ns)
    return img.width / w if w else 1
rows = []
for combo in sorted(os.listdir(A)):
    da, db = os.path.join(A, combo), os.path.join(B, combo)
    if not os.path.isdir(db): continue
    for f in sorted(os.listdir(da)):
        if not f.endswith('.png'): continue
        sec = f[:-4]
        pa, pb = os.path.join(da, f), os.path.join(db, f)
        ra, rb = pa[:-4] + '.raw.txt', pb[:-4] + '.raw.txt'
        if not (os.path.exists(pb) and os.path.exists(ra) and os.path.exists(rb)): rows.append((combo, sec, 'missing', '', '')); continue
        na, nb = nodes(ra), nodes(rb)
        ya, yb = title_y(na, sec), title_y(nb, sec)
        if ya is None or yb is None: rows.append((combo, sec, 'no-title', '', '')); continue
        ia, ib = Image.open(pa).convert('RGB'), Image.open(pb).convert('RGB')
        sa, sb = scale(ia, na), scale(ib, nb)
        ea, eb = next_title_y(na, ya), next_title_y(nb, yb)
        ha = min((ea - ya) if ea else 10**6, ia.height / sa - ya)
        hb = min((eb - yb) if eb else 10**6, ib.height / sb - yb)
        h = int(min(ha, hb))
        ca = ia.crop((0, int(ya * sa), ia.width, int((ya + h) * sa)))
        cb = ib.crop((0, int(yb * sb), ib.width, int((yb + h) * sb)))
        if ca.size != cb.size: cb = cb.resize(ca.size)
        diff = ImageChops.difference(ca, cb).convert('L').point(lambda v: 255 if v > 40 else 0)
        bbox = diff.getbbox()
        pct = 100.0 * sum(1 for v in diff.getdata() if v) / (diff.width * diff.height)
        # rect comparison: label/identifier + size, position relative to title
        def sig(ns, y0):
            s = {}
            for n in ns:
                if y0 <= n['rect']['y'] < y0 + h:
                    key = (ident(n) or '') + '|' + str(n.get('label') or n.get('text') or '')[:30] + '|' + str(n.get('type'))
                    s.setdefault(key, []).append((round(n['rect']['x']), round(n['rect']['y'] - y0), round(n['rect']['width']), round(n['rect']['height'])))
            return s
        A_, B_ = sig(na, ya), sig(nb, yb)
        rect_diffs = []
        for k in set(A_) | set(B_):
            va, vb = sorted(A_.get(k, [])), sorted(B_.get(k, []))
            if va != vb: rect_diffs.append((k, va[:2], vb[:2]))
        if bbox:
            od = os.path.join(OUT, combo); os.makedirs(od, exist_ok=True)
            ImageChops.difference(ca, cb).save(os.path.join(od, sec + '.diff.png'))
        rows.append((combo, sec, f'{pct:.2f}%', str(bbox), f'{len(rect_diffs)} rect diffs' + (': ' + '; '.join(f'{k}: {va} vs {vb}' for k, va, vb in rect_diffs[:3]) if rect_diffs else '')))
with open(os.path.join(OUT, 'parity.md'), 'w') as fh:
    fh.write('| combo | section | pixel diff | bbox | rect diffs |\n|---|---|---|---|---|\n')
    for r in rows: fh.write('| ' + ' | '.join(str(x).replace('|', '/') for x in r) + ' |\n')
for r in rows: print('\t'.join(str(x)[:90] for x in r))
