"""
Gerador de capas editoriais Marken Fassi.
Cada capa tem textura, cor e composicao unicas.
Paleta: ivory, cream, beige, taupe, marrom natural.
Direcao: quiet luxury, editorial, artesanal.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, math, random

OUT = r'C:\PROJETOS\EXPOSTACKER\Marken Fassi - Ecossistema de Embaixadores\public\images\marken\universidade'
W, H = 1200, 675

# Paleta Marken (quiet luxury)
PALETTE = {
    'ivory':      (245, 242, 235),
    'cream':      (235, 228, 215),
    'beige':      (210, 198, 178),
    'taupe':      (175, 160, 140),
    'mocha':      (140, 120, 100),
    'espresso':   (95, 78, 65),
    'ink':        (62, 55, 48),
    'champagne':  (200, 185, 155),
    'sand':       (220, 210, 190),
    'linen':      (230, 222, 205),
    'warm_gray':  (165, 158, 148),
    'soft_white': (248, 245, 240),
}

def noise_texture(w, h, base_color, intensity=8, seed=42):
    """Cria textura de ruido sutil (grain) sobre cor base."""
    random.seed(seed)
    img = Image.new('RGB', (w, h), base_color)
    pixels = img.load()
    for y in range(h):
        for x in range(w):
            r, g, b = base_color
            n = random.randint(-intensity, intensity)
            pixels[x, y] = (
                max(0, min(255, r + n)),
                max(0, min(255, g + n)),
                max(0, min(255, b + n))
            )
    return img

def woven_texture(w, h, base_color, thread_color=None, spacing=4, seed=42):
    """Simula trama de tecido (woven) com linhas finas."""
    random.seed(seed)
    if thread_color is None:
        thread_color = tuple(max(0, c - 20) for c in base_color)
    img = Image.new('RGB', (w, h), base_color)
    draw = ImageDraw.Draw(img)
    # Linhas horizontais (trama)
    for y in range(0, h, spacing):
        offset = random.randint(-1, 1)
        c = tuple(max(0, min(255, c + random.randint(-5, 5))) for c in thread_color)
        draw.line([(0, y + offset), (w, y + offset)], fill=c, width=1)
    # Linhas verticais (urdume)
    for x in range(0, w, spacing):
        offset = random.randint(-1, 1)
        c = tuple(max(0, min(255, c + random.randint(-5, 5))) for c in thread_color)
        draw.line([(x + offset, 0), (x + offset, h)], fill=c, width=1)
    return img

def linen_texture(w, h, base_color, seed=42):
    """Textura de linho — fibras irregulares."""
    random.seed(seed)
    img = Image.new('RGB', (w, h), base_color)
    pixels = img.load()
    for y in range(h):
        for x in range(w):
            r, g, b = base_color
            # Fibra horizontal dominante
            h_n = random.randint(-12, 8)
            # Fibra vertical sutil
            v_n = random.randint(-4, 4)
            pixels[x, y] = (
                max(0, min(255, r + h_n + v_n)),
                max(0, min(255, g + h_n + v_n)),
                max(0, min(255, b + h_n + v_n))
            )
    return img

def gradient_bg(w, h, color_top, color_bottom):
    """Gradiente vertical suave."""
    img = Image.new('RGB', (w, h))
    pixels = img.load()
    for y in range(h):
        t = y / (h - 1)
        r = int(color_top[0] * (1 - t) + color_bottom[0] * t)
        g = int(color_top[1] * (1 - t) + color_bottom[1] * t)
        b = int(color_top[2] * (1 - t) + color_bottom[2] * t)
        for x in range(w):
            pixels[x, y] = (r, g, b)
    return img

def add_vignette(img, intensity=0.3):
    """Adiciona vinheta sutil nas bordas."""
    w, h = img.size
    vignette = Image.new('L', (w, h), 0)
    draw = ImageDraw.Draw(vignette)
    cx, cy = w // 2, h // 2
    max_r = math.sqrt(cx**2 + cy**2)
    pixels = vignette.load()
    for y in range(h):
        for x in range(w):
            d = math.sqrt((x - cx)**2 + (y - cy)**2)
            v = int(255 * (d / max_r) * intensity)
            pixels[x, y] = min(255, v)
    dark = Image.new('RGB', (w, h), (0, 0, 0))
    result = Image.composite(img, Image.blend(img, dark, 0.5), vignette)
    return result

def add_label(img, label, subtitle=None, position='bottom-left'):
    """Adiciona rotulo editorial discreto."""
    w, h = img.size
    draw = ImageDraw.Draw(img, 'RGBA')
    try:
        font_label = ImageFont.truetype("C:/Windows/Fonts/GARA.TTF", 28)
        font_sub = ImageFont.truetype("C:/Windows/Fonts/GARA.TTF", 16)
    except:
        try:
            font_label = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 28)
            font_sub = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 16)
        except:
            font_label = ImageFont.load_default()
            font_sub = ImageFont.load_default()

    margin = 40
    if position == 'bottom-left':
        x = margin
        y = h - margin - 40
    elif position == 'top-left':
        x = margin
        y = margin
    else:
        x = w - margin - 300
        y = h - margin - 40

    # Label
    draw.text((x, y), label, fill=(255, 255, 255, 200), font=font_label)
    if subtitle:
        draw.text((x, y + 36), subtitle, fill=(255, 255, 255, 140), font=font_sub)

def save_webp(img, name, quality=82):
    path = os.path.join(OUT, name)
    img.save(path, 'WEBP', quality=quality, method=6)
    sz = os.path.getsize(path) / 1024
    print(f"  {name}: {img.size[0]}x{img.size[1]} {sz:.1f}KB")
    return path

print("=== GERANDO CAPAS EDITORIAIS MARKEN FASSI ===\n")

# ============================================================
# CURSOS — 3 novas capas unicas
# ============================================================

# 1. Tecidos e Fios — macro de trama (woven texture, cream/ivory)
print("[1/9] capa-tecidos-fios.webp — macro trama de tecido")
img = woven_texture(W, H, PALETTE['cream'], thread_color=PALETTE['beige'], spacing=3, seed=101)
img = img.filter(ImageFilter.GaussianBlur(0.5))
img = add_vignette(img, 0.25)
add_label(img, "Tecidos e Fios", "O toque Marken Fassi")
save_webp(img, 'capa-tecidos-fios.webp')

# 2. Colecao Alameda — editorial cama (gradient warm, taupe/mocha)
print("[2/9] capa-colecao-alameda.webp — editorial cama")
img = gradient_bg(W, H, PALETTE['taupe'], PALETTE['espresso'])
# Camadas horizontais sugerindo cama
draw = ImageDraw.Draw(img, 'RGBA')
for i, (y, h_bar, alpha) in enumerate([
    (380, 60, 60), (440, 50, 80), (490, 40, 100), (530, 35, 120), (565, 30, 140)
]):
    c = PALETTE['ivory'] if i % 2 == 0 else PALETTE['cream']
    draw.rectangle([(0, y), (W, y + h_bar)], fill=(*c, alpha))
img = img.filter(ImageFilter.GaussianBlur(1.5))
img = add_vignette(img, 0.2)
add_label(img, "Coleção Alameda", "Composição editorial")
save_webp(img, 'capa-colecao-alameda.webp')

# 3. Atendimento Premium — atendimento humano (warm mocha gradient)
print("[3/9] capa-atendimento-premium.webp — atendimento consultivo")
img = gradient_bg(W, H, PALETTE['mocha'], PALETTE['espresso'])
# Luz suave central (spotlight)
draw = ImageDraw.Draw(img, 'RGBA')
for r in range(400, 100, -20):
    alpha = int(30 * (1 - r / 400))
    draw.ellipse([(W//2 - r, 200 - r//2), (W//2 + r, 200 + r//2)], fill=(255, 240, 220, alpha))
img = img.filter(ImageFilter.GaussianBlur(3))
img = add_vignette(img, 0.3)
add_label(img, "Atendimento Premium", "A experiência Marken Fassi")
save_webp(img, 'capa-atendimento-premium.webp')

# ============================================================
# AULAS RÁPIDAS — 6 novas capas unicas
# ============================================================

# 4. ar1 — Qual tamanho de roupa de cama (neutro, medidas)
print("[4/9] aula-ar1-tamanhos.webp — tamanhos e medidas")
img = linen_texture(W, H, PALETTE['soft_white'], seed=201)
# Linhas de medida discretas
draw = ImageDraw.Draw(img, 'RGBA')
for x in [200, 600, 1000]:
    draw.line([(x, 100), (x, 575)], fill=(*PALETTE['taupe'], 60), width=1)
    for y in range(100, 576, 50):
        draw.line([(x-5, y), (x+5, y)], fill=(*PALETTE['taupe'], 80), width=1)
img = add_vignette(img, 0.15)
add_label(img, "Tamanhos", "Roupa de cama")
save_webp(img, 'aula-ar1-tamanhos.webp')

# 5. ar2 — Contagem de fios (macro extremo, cream)
print("[5/9] aula-ar2-contagem-fios.webp — macro fios")
img = woven_texture(W, H, PALETTE['ivory'], thread_color=PALETTE['warm_gray'], spacing=2, seed=202)
img = img.filter(ImageFilter.GaussianBlur(0.3))
img = add_vignette(img, 0.2)
add_label(img, "Contagem de Fios", "30 segundos")
save_webp(img, 'aula-ar2-contagem-fios.webp')

# 6. ar3 — Diferença entre linhas (beige, comparativo)
print("[6/9] aula-ar3-linhas-marken.webp — linhas Marken")
img = Image.new('RGB', (W, H), PALETTE['beige'])
# Divisao vertical em 3 faixas com texturas diferentes
left = woven_texture(W//3, H, PALETTE['cream'], PALETTE['taupe'], spacing=3, seed=203)
mid = linen_texture(W//3, H, PALETTE['sand'], seed=204)
right = woven_texture(W//3, H, PALETTE['champagne'], PALETTE['mocha'], spacing=5, seed=205)
img.paste(left, (0, 0))
img.paste(mid, (W//3, 0))
img.paste(right, (2*W//3, 0))
# Linhas divisorias
draw = ImageDraw.Draw(img, 'RGBA')
draw.line([(W//3, 0), (W//3, H)], fill=(*PALETTE['espresso'], 40), width=1)
draw.line([(2*W//3, 0), (2*W//3, H)], fill=(*PALETTE['espresso'], 40), width=1)
img = add_vignette(img, 0.15)
add_label(img, "Linhas Marken", "Diferenças essenciais")
save_webp(img, 'aula-ar3-linhas-marken.webp')

# 7. ar4 — Cuidados com algodão egípcio (soft, natural)
print("[7/9] aula-ar4-cuidados-algodao.webp — cuidados e conservação")
img = linen_texture(W, H, PALETTE['linen'], seed=301)
# Sugerir dobra de tecido
draw = ImageDraw.Draw(img, 'RGBA')
for i, (y, alpha) in enumerate([(300, 30), (340, 50), (380, 70), (420, 90), (460, 110)]):
    c = PALETTE['ivory'] if i % 2 == 0 else PALETTE['cream']
    draw.rectangle([(100, y), (W-100, y+35)], fill=(*c, alpha))
img = img.filter(ImageFilter.GaussianBlur(1))
img = add_vignette(img, 0.2)
add_label(img, "Cuidados", "Algodão egípcio")
save_webp(img, 'aula-ar4-cuidados-algodao.webp')

# 8. ar5 — Montar cama em 2 min (ivory, composição cama)
print("[8/9] aula-ar5-montar-cama.webp — composição de cama")
img = gradient_bg(W, H, PALETTE['ivory'], PALETTE['cream'])
# Camadas da cama (headboard -> pillows -> sheets)
draw = ImageDraw.Draw(img, 'RGBA')
# Headboard
draw.rectangle([(200, 150), (1000, 280)], fill=(*PALETTE['taupe'], 100))
# Travesseiros
for x in [280, 460, 640, 820]:
    draw.rounded_rectangle([(x, 290), (x+140, 370)], radius=15, fill=(*PALETTE['soft_white'], 180))
# Lençol
draw.rectangle([(150, 380), (1050, 575)], fill=(*PALETTE['cream'], 150))
# Manta no pé
draw.rectangle([(150, 500), (1050, 575)], fill=(*PALETTE['beige'], 120))
img = img.filter(ImageFilter.GaussianBlur(1.5))
img = add_vignette(img, 0.2)
add_label(img, "Composição", "Cama em 2 minutos")
save_webp(img, 'aula-ar5-montar-cama.webp')

# 9. ar6 — Cliente diz "está caro" (warm, atendimento/venda)
print("[9/9] aula-ar6-objecao-preco.webp — objeção de preço")
img = gradient_bg(W, H, PALETTE['espresso'], PALETTE['ink'])
# Luz lateral (janela)
draw = ImageDraw.Draw(img, 'RGBA')
for r in range(300, 50, -15):
    alpha = int(25 * (1 - r / 300))
    draw.ellipse([(W - 300 - r, 100 - r//2), (W - 300 + r, 100 + r//2)], fill=(255, 235, 210, alpha))
img = img.filter(ImageFilter.GaussianBlur(4))
img = add_vignette(img, 0.35)
add_label(img, "Objeção", "Cliente diz 'está caro'")
save_webp(img, 'aula-ar6-objecao-preco.webp')

print("\n=== RESUMO ===")
total_kb = 0
for f in sorted(os.listdir(OUT)):
    if f.startswith('capa-tecidos-fios') or f.startswith('capa-colecao-alameda') or f.startswith('capa-atendimento-premium') or f.startswith('aula-ar'):
        sz = os.path.getsize(os.path.join(OUT, f)) / 1024
        total_kb += sz
        print(f"  {f}: {sz:.1f}KB")
print(f"  Total novas: {total_kb:.1f}KB")
