from PIL import Image, ImageDraw, ImageFilter
import os, random

OUT = r'C:\PROJETOS\EXPOSTACKER\Marken Fassi - Ecossistema de Embaixadores\public\images\marken\universidade'
W, H = 1200, 675

PALETTE = {
    'ivory': (245, 242, 235), 'cream': (235, 228, 215), 'beige': (210, 198, 178),
    'taupe': (175, 160, 140), 'champagne': (200, 185, 155), 'sand': (220, 210, 190),
}

# ar2: macro fios — trama larga + blur
random.seed(202)
img = Image.new('RGB', (W, H), PALETTE['ivory'])
pixels = img.load()
for y in range(H):
    for x in range(W):
        r, g, b = 245, 242, 235
        if (y % 6) < 3:
            n = random.randint(-15, 5)
        else:
            n = random.randint(-5, 10)
        pixels[x, y] = (max(0,min(255,r+n)), max(0,min(255,g+n)), max(0,min(255,b+n)))
img = img.filter(ImageFilter.GaussianBlur(1.5))
p = os.path.join(OUT, 'aula-ar2-contagem-fios.webp')
img.save(p, 'WEBP', quality=75, method=6)
print(f"aula-ar2: {os.path.getsize(p)/1024:.1f}KB")

# ar3: linhas Marken — 3 faixas suaves
img = Image.new('RGB', (W, H), PALETTE['beige'])
draw = ImageDraw.Draw(img)
draw.rectangle([(0, 0), (W//3, H)], fill=PALETTE['cream'])
draw.rectangle([(W//3, 0), (2*W//3, H)], fill=PALETTE['sand'])
draw.rectangle([(2*W//3, 0), (W, H)], fill=PALETTE['champagne'])
random.seed(203)
pixels = img.load()
for y in range(0, H, 2):
    for x in range(0, W, 2):
        r, g, b = pixels[x, y]
        n = random.randint(-8, 8)
        pixels[x, y] = (max(0,min(255,r+n)), max(0,min(255,g+n)), max(0,min(255,b+n)))
draw = ImageDraw.Draw(img, 'RGBA')
draw.line([(W//3, 0), (W//3, H)], fill=(95, 78, 65, 60), width=2)
draw.line([(2*W//3, 0), (2*W//3, H)], fill=(95, 78, 65, 60), width=2)
img = img.filter(ImageFilter.GaussianBlur(0.5))
p = os.path.join(OUT, 'aula-ar3-linhas-marken.webp')
img.save(p, 'WEBP', quality=75, method=6)
print(f"aula-ar3: {os.path.getsize(p)/1024:.1f}KB")
