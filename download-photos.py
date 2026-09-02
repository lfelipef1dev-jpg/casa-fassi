"""
Baixa fotografias reais do Unsplash (licenca livre) e processa para capas Marken Fassi.
Direcao: quiet luxury, editorial, neutral, premium.
"""
from PIL import Image, ImageOps
import urllib.request
import os, io

OUT = r'C:\PROJETOS\EXPOSTACKER\Marken Fassi - Ecossistema de Embaixadores\public\images\marken\universidade'
W, H = 1200, 675

# URLs diretas do Unsplash (ja confirmadas nos resultados de busca)
# Todas sao FREE sob Unsplash License
photos = {
    # Cursos (3 novas)
    "capa-tecidos-fios.webp": {
        "url": "https://images.unsplash.com/photo-1741308478108-9cfbf220e192?fm=jpg&w=1200&h=675&fit=crop&q=80",
        "desc": "Cream fabric folds — macro tecido",
        "credit": "Sibeli Velazquez / Unsplash",
    },
    "capa-colecao-alameda.webp": {
        "url": "https://images.unsplash.com/photo-1766245456897-5c86726d084d?fm=jpg&w=1200&h=675&fit=crop&q=80",
        "desc": "Modern bedroom neutral pillows — editorial cama",
        "credit": "Unsplash",
    },
    "capa-atendimento-premium.webp": {
        "url": "https://images.unsplash.com/photo-1631773227827-37eab524e6f6?fm=jpg&w=1200&h=675&fit=crop&q=80",
        "desc": "Boutique retail — atendimento",
        "credit": "Unsplash",
    },
    # Aulas rapidas (6 novas)
    "aula-ar1-tamanhos.webp": {
        "url": "https://images.unsplash.com/photo-1775241186452-c3d99b09f223?fm=jpg&w=1200&h=675&fit=crop&q=80",
        "desc": "Neatly made bed — tamanhos/produtos",
        "credit": "Unsplash",
    },
    "aula-ar2-contagem-fios.webp": {
        "url": "https://images.unsplash.com/photo-1528459801417-a9e919a4141c?fm=jpg&w=1200&h=675&fit=crop&q=80",
        "desc": "Linen texture macro — contagem de fios",
        "credit": "Unsplash",
    },
    "aula-ar3-linhas-marken.webp": {
        "url": "https://images.unsplash.com/photo-1615886603831-88f7a16e1b2c?fm=jpg&w=1200&h=675&fit=crop&q=80",
        "desc": "Fabric texture comparison — linhas",
        "credit": "Unsplash",
    },
    "aula-ar4-cuidados-algodao.webp": {
        "url": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?fm=jpg&w=1200&h=675&fit=crop&q=80",
        "desc": "Folded towels/linen — cuidados",
        "credit": "Unsplash",
    },
    "aula-ar5-montar-cama.webp": {
        "url": "https://images.unsplash.com/photo-1748652253103-8c497a973e0d?fm=jpg&w=1200&h=675&fit=crop&q=80",
        "desc": "Hotel bed decorative pillows — composicao cama",
        "credit": "Unsplash",
    },
    "aula-ar6-objecao-preco.webp": {
        "url": "https://images.unsplash.com/photo-1556742502-ec7c0e9f14b1?fm=jpg&w=1200&h=675&fit=crop&q=80",
        "desc": "Retail sales interaction — objeção",
        "credit": "Unsplash",
    },
}

def download_and_process(url, out_path, desc):
    print(f"Baixando: {desc}")
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
        print(f"  Baixado: {len(data)/1024:.0f}KB")

        img = Image.open(io.BytesIO(data))
        print(f"  Original: {img.size[0]}x{img.size[1]} {img.mode}")

        # Converter para RGB se necessario
        if img.mode in ('RGBA', 'P', 'LA'):
            img = img.convert('RGB')

        # Crop central para 1200x675 (16:9)
        img = ImageOps.fit(img, (W, H), method=Image.LANCZOS, centering=(0.5, 0.4))

        # Salvar como WebP
        img.save(out_path, 'WEBP', quality=78, method=6)
        sz = os.path.getsize(out_path) / 1024
        print(f"  Salvo: {img.size[0]}x{img.size[1]} {sz:.1f}KB")
        return True
    except Exception as e:
        print(f"  ERRO: {e}")
        return False

print("=== BAIXANDO FOTOGRAFIAS REAIS UNSPLASH ===\n")

success = 0
failed = 0
for filename, info in photos.items():
    out_path = os.path.join(OUT, filename)
    if download_and_process(info["url"], out_path, info["desc"]):
        success += 1
    else:
        failed += 1
    print()

print(f"=== RESUMO ===")
print(f"Sucesso: {success}/{len(photos)}")
print(f"Falha: {failed}/{len(photos)}")
