export const config = {
  url: process.env.E2E_URL || "http://localhost:8080/",
  rpcProvider: "http://localhost:8545",
  puppeteerDebug: !!process.env.PUPPETEER_DEBUG,
};
