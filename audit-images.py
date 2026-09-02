from PIL import Image, ImageStat
import os, hashlib

p = r'C:\PROJETOS\EXPOSTACKER\Marken Fassi - Ecossistema de Embaixadores\public\images\marken\universidade'
files = sorted(os.listdir(p))

def phash(img, size=8):
    img = img.convert('L').resize((size+1, size), Image.LANCZOS)
    pixels = list(img.getdata())
    avg = sum(pixels)/len(pixels)
    bits = ''.join('1' if p > avg else '0' for p in pixels)
    return int(bits, 2)

def hamming(a, b):
    return bin(a ^ b).count('1')

results = []
for f in files:
    fp = os.path.join(p, f)
    img = Image.open(fp)
    stat = ImageStat.Stat(img)
    h = phash(img)
    md5 = hashlib.md5(open(fp,'rb').read()).hexdigest()[:12]
    avg_color = tuple(int(c) for c in stat.mean[:3])
    results.append({
        'file': f,
        'size': f'{img.size[0]}x{img.size[1]}',
        'kb': round(os.path.getsize(fp)/1024,1),
        'md5': md5,
        'phash': hex(h),
        'avg_rgb': avg_color,
    })

print('=== INVENTARIO ===')
for r in results:
    print(f"{r['file']:40s} | {r['size']:10s} | {r['kb']:6.1f}KB | {r['md5']} | phash={r['phash']:>12s} | avg={r['avg_rgb']}")

print()
print('=== DUPLICATAS EXATAS (mesmo MD5) ===')
seen = {}
for r in results:
    if r['md5'] in seen:
        print(f"  {r['file']} == {seen[r['md5']]['file']}")
    else:
        seen[r['md5']] = r

print()
print('=== SIMILARES (phash hamming <= 10) ===')
for i, a in enumerate(results):
    for b in results[i+1:]:
        d = hamming(int(a['phash'],16), int(b['phash'],16))
        if d <= 10:
            tag = ' (EXATO)' if d == 0 else ''
            print(f"  {a['file']} vs {b['file']}: hamming={d}{tag}")
