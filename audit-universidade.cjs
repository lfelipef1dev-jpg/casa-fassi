const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = "http://localhost:3001";
const SCREENSHOT_DIR = path.join(__dirname, "audit-universidade");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(`PAGEERROR: ${err.message}`));
  const failedRequests = [];
  page.on("requestfailed", (req) => {
    failedRequests.push(`${req.url()} - ${req.failure().errorText}`);
  });

  // Autenticar
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await sleep(500);
  await page.evaluate(() => {
    localStorage.setItem("casa-marken-fassi-store", JSON.stringify({
      state: { onboardingCompleto: true, nome: "Felipe", loja: "Loja SP", funcao: "Vendedor(a)", photo: "", cidade: "SP", licoesConcluidas: [], aulasConcluidas: [], aulasSalvas: [], videosSalvos: [], horasAssistidas: 0, selosConquistados: [], fotosVitrine: [], vitrinesCurtidas: [], postsCurtidos: [] }, version: 0
    }));
  });

  // Ir para universidade
  await page.goto(`${BASE}/app/universidade`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await sleep(3000);

  // Screenshot desktop completo (scroll full page)
  await page.setViewport({ width: 1920, height: 1080 });
  await sleep(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "universidade-desktop-full.png"), fullPage: true });
  console.log("Screenshot desktop full salvo");

  // Screenshot desktop viewport
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "universidade-desktop-viewport.png"), fullPage: false });
  console.log("Screenshot desktop viewport salvo");

  // Scroll e capturar cada secao
  const sections = await page.evaluate(() => {
    const headings = [...document.querySelectorAll("h2")];
    return headings.map((h, i) => ({
      index: i,
      text: h.textContent.trim().substring(0, 40),
      y: h.getBoundingClientRect().top + window.scrollY,
    }));
  });
  console.log(`Seções encontradas: ${sections.length}`);
  sections.forEach((s) => console.log(`  ${s.index}: "${s.text}" (y=${Math.round(s.y)})`));

  // Capturar cada secao
  for (const s of sections) {
    await page.evaluate((y) => window.scrollTo(0, y - 100), s.y);
    await sleep(500);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `secao-${s.index}-${s.text.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.png`), fullPage: false });
  }

  // Screenshot tablet
  await page.setViewport({ width: 768, height: 1024 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "universidade-tablet-full.png"), fullPage: true });
  console.log("Screenshot tablet full salvo");

  // Screenshot mobile
  await page.setViewport({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1000);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "universidade-mobile-full.png"), fullPage: true });
  console.log("Screenshot mobile full salvo");

  // Verificar scroll horizontal
  for (const vp of [{ w: 1920, name: "desktop" }, { w: 1366, name: "laptop" }, { w: 768, name: "tablet" }, { w: 375, name: "mobile" }, { w: 360, name: "mobile360" }]) {
    await page.setViewport({ width: vp.w, height: 800 });
    await sleep(300);
    const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    console.log(`Scroll horizontal ${vp.name} (${vp.w}px): ${hasHScroll ? "SIM" : "NAO"}`);
  }

  // Inventariar todas as imagens usadas na pagina
  const images = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")];
    return imgs.map((img) => ({
      src: img.src.replace(/^https?:\/\/[^/]+/, "").replace(/^http:\/\/localhost:3001/, ""),
      alt: img.alt,
      width: img.width,
      height: img.height,
    }));
  });

  console.log(`\n=== IMAGENS NA PAGINA (${images.length}) ===`);
  const srcCounts = {};
  images.forEach((img) => {
    const src = img.src;
    srcCounts[src] = (srcCounts[src] || 0) + 1;
    console.log(`  ${src} | ${img.alt} | ${img.width}x${img.height}`);
  });

  console.log(`\n=== DUPLICATAS DE IMAGEM ===`);
  const dups = Object.entries(srcCounts).filter(([_, count]) => count > 1);
  if (dups.length === 0) {
    console.log("Nenhuma duplicata!");
  } else {
    dups.forEach(([src, count]) => console.log(`  ${src}: ${count}x`));
  }

  console.log(`\n=== IMAGENS UNICAS: ${Object.keys(srcCounts).length} ===`);

  // Erros
  console.log(`\n=== CONSOLE ERRORS ===`);
  if (consoleErrors.length === 0) console.log("Nenhum erro!");
  else consoleErrors.forEach((e) => console.log(`  ${e}`));

  console.log(`\n=== FAILED REQUESTS ===`);
  if (failedRequests.length === 0) console.log("Nenhuma falha!");
  else failedRequests.forEach((r) => console.log(`  ${r}`));

  console.log(`\nScreenshots: ${SCREENSHOT_DIR} (${fs.readdirSync(SCREENSHOT_DIR).length} arquivos)`);
  await browser.close();
}

run().catch((err) => { console.error("ERRO FATAL:", err); process.exit(1); });
