import config from "../config";
import { IDictionary } from "../types";
import { userDownloadFile } from "../utils/utils";

export const downloadAgreement = async (
  documentHash: string,
  tags: IDictionary,
  outputFilename: string
) => {
  const pdfRendererUrl = config.contractsDeployed.pdfRenderer;

  await userDownloadFile(
    `${pdfRendererUrl}api/document?hash=${documentHash}&type=html`,
    {
      method: "POST",
      body: JSON.stringify(tags),
      headers: {
        "Content-Type": "application/json",
      },
    },
    outputFilename
  );
};
