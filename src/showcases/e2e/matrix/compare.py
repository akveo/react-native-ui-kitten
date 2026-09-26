#!/usr/bin/env python3
"""compare2.py <masterDir> <prDir> <outDir>: per combo/section, align the two screenshots by content (global vertical
shift search on 4x-downscaled images, header/nav bars excluded) and report the anti-aliasing-tolerant diff over the overlap."""
import os, sys
from PIL import Image, ImageChops
A, B, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
def prep(p):
    im = Image.open(p).convert('RGB')
    android = im.width >= 1000
    top, bot = (250, 90) if android else (96, 40)
    return im.crop((0, top, im.width, im.height - bot)), android
def ds(im, f=4): return im.resize((max(1, im.width // f), max(1, im.height // f)), Image.BOX)
def diffcount(a, b, thr=28):
    d = ImageChops.difference(a, b).convert('L').point(lambda v: 255 if v > thr else 0)
    return sum(1 for v in d.getdata() if v), d
rows = []
for combo in sorted(os.listdir(A)):
    da, db = os.path.join(A, combo), os.path.join(B, combo)
    if not os.path.isdir(db): continue
    for f in sorted(os.listdir(da)):
        if not f.endswith('.png'): continue
        sec = f[:-4]; pb = os.path.join(db, f)
        if not os.path.exists(pb): rows.append((combo, sec, 'missing', '', '', '')); continue
        ia, android = prep(os.path.join(da, f)); ib, _ = prep(pb)
        a4, b4 = ds(ia), ds(ib)
        best = None
        for dy in range(-a4.height * 2 // 3, a4.height * 2 // 3 + 1):
            # overlap of a4 and b4 shifted by dy (b content moved down by dy)
            top_a, top_b = max(0, dy), max(0, -dy); h = a4.height - abs(dy)
            if h < a4.height // 3: continue
            ca, cb = a4.crop((0, top_a, a4.width, top_a + h)), b4.crop((0, top_b, b4.width, top_b + h))
            c, _ = diffcount(ca, cb)
            r = c / (ca.width * ca.height)
            if best is None or r < best[0]: best = (r, dy, h)
        r, dy, h = best
        # full-res diff over the aligned overlap for evidence
        DY = dy * 4; top_a, top_b = max(0, DY), max(0, -DY); H = min(ia.height - top_a, ib.height - top_b)
        ca, cb = ia.crop((0, top_a, ia.width, top_a + H)), ib.crop((0, top_b, ib.width, top_b + H))
        c4, d4 = diffcount(ds(ca), ds(cb)); pct = 100.0 * c4 / (d4.width * d4.height); bbox = d4.getbbox()
        # 8x box + threshold 40: immune to 1-3px sub-pixel edge ghosting, still catches colour / size / missing-element changes
        c8, d8 = diffcount(ds(ca, 8), ds(cb, 8), 40); pct8 = 100.0 * c8 / (d8.width * d8.height); bbox8 = d8.getbbox()
        if bbox8: bbox8 = tuple(v * 8 for v in bbox8)
        if bbox:
            bbox = tuple(v * 4 for v in bbox); od = os.path.join(OUT, combo); os.makedirs(od, exist_ok=True)
            w = ca.width; tri = Image.new('RGB', (w * 3 + 20, H), (255, 0, 255)); tri.paste(ca, (0, 0)); tri.paste(cb, (w + 10, 0)); tri.paste(ImageChops.difference(ca, cb), (2 * w + 20, 0))
            tri.save(os.path.join(od, sec + '.tri.png'))
        rows.append((combo, sec, f'{pct8:.2f}%', f'{pct:.2f}%', f'dy {DY:+d} overlap {H}px', str(bbox8)))
os.makedirs(OUT, exist_ok=True)
with open(os.path.join(OUT, 'parity.md'), 'w') as fh:
    fh.write('| combo | section | diff 8x (>40) | diff 4x (>28) | alignment | bbox (8x) |\n|---|---|---|---|---|---|\n')
    for r in rows: fh.write('| ' + ' | '.join(str(x) for x in r) + ' |\n')
for r in rows: print('\t'.join(str(x) for x in r))
