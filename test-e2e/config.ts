export const config = {
  url: process.env.E2E_URL || "http://localhost:8080/",
  rpcProvider: "http://localhost:8545",
  injectedRpcProvider:
    (process.env.E2E_URL && process.env.E2E_URL + "node") || "http://localhost:8545/node",
  puppeteerDebug: !!process.env.PUPPETEER_DEBUG,
};
