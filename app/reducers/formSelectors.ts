import { formValueSelector } from "redux-form";

import config from "../config";
import { myCryptoUrl } from "../utils/mycrypto";
import { parseStrToNumStrict } from "../utils/utils";
import { publicCommitment } from "../web3/contracts/ContractsRepository";
import { IAppState } from "./index";

export const selectMyCryptoUrl = (state: IAppState): string => {
  const contractAddress = config.contractsDeployed.commitmentContractAddress;
  let value = parseStrToNumStrict(formValueSelector("commitFunds")(state, "ethAmount"));
  if (isNaN(value)) {
    value = 0;
  }

  const data = publicCommitment.rawWeb3Contract.commit.getData();

  return myCryptoUrl(contractAddress, value, data);
};
