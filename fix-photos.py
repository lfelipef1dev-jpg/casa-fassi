"""
Baixa e processa fotografias reais do Unsplash para capas Marken Fassi.
Substitui as imagens sinteticas geradas anteriormente.
"""
from PIL import Image, ImageOps
import urllib.request
import os, io

OUT = r'C:\PROJETOS\EXPOSTACKER\Marken Fassi - Ecossistema de Embaixadores\public\images\marken\universidade'
W, H = 1200, 675

# Fotos que ja baixei como .tmp e preciso processar
tmp_files = [
    'capa-colecao-alameda.webp',
    'capa-atendimento-premium.webp',
    'aula-ar2-contagem-fios.webp',
    'aula-ar3-linhas-marken.webp',
    'aula-ar5-montar-cama.webp',
]

# Fotos que ainda preciso baixar (usar download endpoint do Unsplash)
# Formato: https://unsplash.com/photos/{ID}/download?force=true
to_download = {
    'capa-tecidos-fios.webp': 'https://unsplash.com/photos/4esjfI8Y8Xg/download?force=true',
    'aula-ar1-tamanhos.webp': 'https://unsplash.com/photos/2oChNpMfh_k/download?force=true',
    'aula-ar4-cuidados-algodao.webp': 'https://unsplash.com/photos/A0MAsOayD5k/download?force=true',
    'aula-ar6-objecao-preco.webp': 'https://unsplash.com/photos/ku3ywiHnkIU/download?force=true',
}

def process_image(img_data, out_path):
    """Processa imagem: converte para RGB, crop central 1200x675, salva WebP."""
    img = Image.open(io.BytesIO(img_data))
    if img.mode in ('RGBA', 'P', 'LA'):
        img = img.convert('RGB')
    # Crop central para 16:9
    img = ImageOps.fit(img, (W, H), method=Image.LANCZOS, centering=(0.5, 0.4))
    img.save(out_path, 'WEBP', quality=78, method=6)
    sz = os.path.getsize(out_path) / 1024
    print(f"  Salvo: {img.size[0]}x{img.size[1]} {sz:.1f}KB")
    return True

print("=== PROCESSANDO .TMP FILES ===\n")
for name in tmp_files:
    tmp_path = os.path.join(OUT, name + '.tmp')
    out_path = os.path.join(OUT, name)
    if os.path.exists(tmp_path):
        print(f"Processando: {name}")
        with open(tmp_path, 'rb') as f:
            data = f.read()
        process_image(data, out_path)
        os.remove(tmp_path)
    else:
        print(f"  .tmp nao encontrado: {name}")

print("\n=== BAIXANDO FOTOS RESTANTES ===\n")
for name, url in to_download.items():
    out_path = os.path.join(OUT, name)
    print(f"Baixando: {name}")
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
        print(f"  Baixado: {len(data)/1024:.0f}KB")
        process_image(data, out_path)
    except Exception as e:
        print(f"  ERRO: {e}")

# Verificar resultado final
print("\n=== VERIFICACAO FINAL ===\n")
from PIL import ImageStat
for f in sorted(os.listdir(OUT)):
    if f.endswith('.tmp'):
        os.remove(os.path.join(OUT, f))
        continue
    if not f.endswith('.webp'):
        continue
    img = Image.open(os.path.join(OUT, f))
    stat = ImageStat.Stat(img)
    std = stat.stddev[:3]
    is_solid = all(s < 20 for s in std)
    tag = 'SINTETICA' if is_solid else 'FOTO REAL'
    sz = os.path.getsize(os.path.join(OUT, f)) / 1024
    print(f"  {f:40s} {sz:6.1f}KB {tag}")
