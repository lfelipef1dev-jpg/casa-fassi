const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = "http://localhost:3001";
const SCREENSHOT_DIR = path.join(__dirname, "audit-screenshots");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const routes = [
  { path: "/app", name: "01-dashboard" },
  { path: "/app/universidade", name: "02-universidade" },
  { path: "/app/conteudos", name: "03-conteudos" },
  { path: "/app/vitrine", name: "04-vitrine" },
  { path: "/app/comunidade", name: "05-comunidade" },
  { path: "/app/beneficios", name: "06-beneficios" },
  { path: "/app/reconhecimento", name: "07-reconhecimento" },
  { path: "/app/certificados/produto", name: "08-certificados" },
  { path: "/app/assistente", name: "09-assistente" },
  { path: "/app/perfil", name: "10-perfil" },
];

const viewports = [
  { width: 1920, height: 1080, suffix: "desktop" },
  { width: 1366, height: 768, suffix: "laptop" },
  { width: 375, height: 812, suffix: "mobile" },
  { width: 360, height: 800, suffix: "mobile360" },
];

const STORE_DATA = JSON.stringify({
  state: {
    onboardingCompleto: true, nome: "Felipe Auditor", loja: "Loja Marken Centro - SP",
    funcao: "Vendedor(a)", photo: "", cidade: "São Paulo",
    licoesConcluidas: [], aulasConcluidas: [], aulasSalvas: [], videosSalvos: [],
    horasAssistidas: 0, selosConquistados: [], fotosVitrine: [],
    vitrinesCurtidas: [], postsCurtidos: [],
  },
  version: 0,
});

async function run() {
  if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const consoleWarnings = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
    if (msg.type() === "warning") consoleWarnings.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(`PAGEERROR: ${err.message}`));

  // Abrir pagina base e injetar localStorage antes de navegar
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await sleep(1000);
  await page.evaluate((data) => {
    localStorage.setItem("casa-marken-fassi-store", data);
  }, STORE_DATA);

  console.log("=== AUDITORIA VISUAL ===");
  console.log("Sessao injetada no localStorage\n");

  const results = [];

  for (const route of routes) {
    console.log(`\n--- ${route.name} (${route.path}) ---`);

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await sleep(200);

      const navStart = Date.now();
      try {
        await page.goto(`${BASE}${route.path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
        await sleep(2500);
      } catch (e) {
        console.log(`  ${vp.suffix}: TIMEOUT`);
        continue;
      }
      const navTime = Date.now() - navStart;

      const hasHScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      const sidebarInfo = await page.evaluate((isMobile) => {
        const aside = document.querySelector("aside");
        if (!aside) return { exists: false, visible: false };
        const rect = aside.getBoundingClientRect();
        return {
          exists: true,
          visible: isMobile ? rect.x < 0 : rect.x >= 0,
          x: Math.round(rect.x),
        };
      }, vp.width < 768);

      const hasLogo = await page.evaluate(() => {
        return document.body.innerHTML.includes("logo-horizontal");
      });

      const h1Text = await page.evaluate(() => {
        const h1 = document.querySelector("h1");
        return h1 ? h1.textContent.trim().substring(0, 60) : "N/A";
      });

      const serifCount = await page.evaluate(() => {
        return document.querySelectorAll('[class*="font-serif"]').length;
      });

      const mainInfo = await page.evaluate(() => {
        const main = document.querySelector("main");
        if (!main) return null;
        const rect = main.getBoundingClientRect();
        return { width: Math.round(rect.width), x: Math.round(rect.x) };
      });

      const filename = `${route.name}-${vp.suffix}.png`;
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename), fullPage: false });

      const result = { route: route.name, viewport: vp.suffix, navTime, hasHScroll, sidebar: sidebarInfo, hasLogo, h1: h1Text, serifCount, main: mainInfo };
      results.push(result);

      const hScrollWarn = hasHScroll ? " !! HSCROLL" : "";
      console.log(`  ${vp.suffix} (${vp.width}w): ${navTime}ms | hScroll=${hasHScroll}${hScrollWarn} | sidebar=${sidebarInfo.visible ? "ok" : "hidden"} | logo=${hasLogo} | h1="${h1Text}" | serif=${serifCount} | main=${mainInfo ? mainInfo.width + "px" : "N/A"}`);
    }
  }

  // Teste de flicker
  console.log("\n=== TESTE DE FLICKER ===");
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(`${BASE}/app`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await sleep(1000);

  const sidebarBeforeNav = await page.evaluate(() => {
    const aside = document.querySelector("aside");
    return aside ? aside.getBoundingClientRect().x : null;
  });

  const testRoutes = ["/app/universidade", "/app/conteudos", "/app/comunidade", "/app/perfil", "/app"];
  for (const r of testRoutes) {
    const start = Date.now();
    await page.goto(`${BASE}${r}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    const navTime = Date.now() - start;
    const sidebarAfterNav = await page.evaluate(() => {
      const aside = document.querySelector("aside");
      return aside ? aside.getBoundingClientRect().x : null;
    });
    const stable = sidebarBeforeNav !== null && sidebarAfterNav !== null && sidebarBeforeNav === sidebarAfterNav;
    console.log(`  ${r}: ${navTime}ms | sidebar estavel=${stable}`);
    await sleep(500);
  }

  // Relatorio
  console.log("\n=== RESUMO ===");
  console.log(`Total screenshots: ${fs.readdirSync(SCREENSHOT_DIR).length}`);

  const hScrollIssues = results.filter((r) => r.hasHScroll);
  console.log(`\nScroll horizontal: ${hScrollIssues.length} issues`);
  hScrollIssues.forEach((r) => console.log(`  !! ${r.route} ${r.viewport}`));

  console.log("\n=== CONSOLE ERRORS ===");
  if (consoleErrors.length === 0) console.log("Nenhum erro!");
  else consoleErrors.forEach((e) => console.log(`  ${e}`));

  console.log("\n=== CONSOLE WARNINGS ===");
  if (consoleWarnings.length === 0) console.log("Nenhum warning!");
  else consoleWarnings.slice(0, 10).forEach((w) => console.log(`  ${w}`));

  console.log(`\nScreenshots: ${SCREENSHOT_DIR}`);
  await browser.close();
}

run().catch((err) => { console.error("ERRO FATAL:", err); process.exit(1); });
