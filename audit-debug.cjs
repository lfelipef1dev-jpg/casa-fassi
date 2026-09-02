const puppeteer = require("puppeteer");
const fs = require("fs");

const BASE = "http://localhost:3001";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Autenticar
  await page.goto(`${BASE}/onboarding`, { waitUntil: "networkidle2", timeout: 30000 });
  await sleep(2000);
  await page.evaluate(() => {
    const data = {
      state: {
        onboardingCompleto: true, nome: "Felipe", loja: "Loja SP", funcao: "Vendedor(a)",
        photo: "", cidade: "SP", licoesConcluidas: [], aulasConcluidas: [], aulasSalvas: [],
        videosSalvos: [], horasAssistidas: 0, selosConquistados: [], fotosVitrine: [],
        vitrinesCurtidas: [], postsCurtidos: [],
      },
      version: 0,
    };
    localStorage.setItem("casa-marken-fassi-store", JSON.stringify(data));
  });

  // Investigar scroll horizontal nas 2 rotas problematicas
  for (const route of ["/app/universidade", "/app/conteudos"]) {
    console.log(`\n=== ${route} ===`);
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle2", timeout: 30000 });
    await sleep(2000);

    const scrollInfo = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const cliW = document.documentElement.clientWidth;
      const overflow = docW - cliW;

      // Encontrar elementos que causam overflow
      const allEls = document.querySelectorAll("*");
      const culprits = [];
      for (const el of allEls) {
        const rect = el.getBoundingClientRect();
        if (rect.right > cliW + 2 || rect.left < -2) {
          culprits.push({
            tag: el.tagName,
            class: el.className?.toString?.()?.substring(0, 80) || "",
            rect: { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) },
            text: el.textContent?.substring(0, 40)?.trim() || "",
          });
        }
      }
      return { docW, cliW, overflow, culprits: culprits.slice(0, 10) };
    });

    console.log(`scrollWidth: ${scrollInfo.docW}, clientWidth: ${scrollInfo.cliW}, overflow: ${scrollInfo.overflow}px`);
    console.log(`Culpados:`);
    scrollInfo.culprits.forEach((c) => {
      console.log(`  ${c.tag} [${c.class}] | left=${c.rect.left} right=${c.rect.right} w=${c.rect.width} | "${c.text}"`);
    });
  }

  // Investigar 404
  console.log("\n=== 404 INVESTIGATION ===");
  const page2 = await browser.newPage();
  const failedUrls = [];
  page2.on("response", (resp) => {
    if (resp.status() === 404) failedUrls.push(resp.url());
  });
  await page2.goto(`${BASE}/app`, { waitUntil: "networkidle2", timeout: 30000 });
  await sleep(2000);
  console.log("404s na home /app:");
  failedUrls.forEach((u) => console.log(`  ${u}`));

  await browser.close();
}

run().catch(console.error);
