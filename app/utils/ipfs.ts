import config from "../config";

export async function getDocumentFromIPFS(hash: string): Promise<string> {
  const ipfsResponse = await fetch(`${config.contractsDeployed.ipfsNode}ipfs/${hash}`);
  if (ipfsResponse.status >= 200 && ipfsResponse.status <= 299) {
    return ipfsResponse.text();
  }
  throw new Error(`IPFS request failed with ${ipfsResponse.status} code`);
}

export function fillDocument(document: string, substitutions: { [key: string]: string }): string {
  return Object.keys(substitutions).reduce((doc, key) => {
    const value = substitutions[key];
    return doc.replace(new RegExp(`\{${key}\}`, "g"), value);
  }, document);
}
