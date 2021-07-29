import { mapKeys } from "lodash";
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
    `${pdfRendererUrl}/api/immutable-storage/download/${documentHash}?as_pdf=True&placeholders=${JSON.stringify(
      tags
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
    outputFilename
  );
};
