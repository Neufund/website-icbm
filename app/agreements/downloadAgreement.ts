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
  const enclosedTags = mapKeys(tags, (_, tagName) => `{${tagName}}`);

  await userDownloadFile(
    `${pdfRendererUrl}api/document?hash=${documentHash}&type=html`,
    {
      method: "POST",
      body: JSON.stringify(enclosedTags),
      headers: {
        "Content-Type": "application/json",
      },
    },
    outputFilename
  );
};
