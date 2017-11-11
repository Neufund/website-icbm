import { formValueSelector } from "redux-form";

import { MyEtherWalletSendMode } from "../actions/constants";
import config from "../config";
import { myEtherWalletUrl } from "../utils/myetherwallet";
import { parseStrToNumStrict } from "../utils/utils";
import { publicCommitment } from "../web3/contracts/ContractsRepository";
import { IAppState } from "./index";

export const selectMyEtherWallerUrl = (state: IAppState): string => {
  const contractAddress = config.contractsDeployed.commitmentContractAddress;
  const value = parseStrToNumStrict(formValueSelector("commitFunds")(state, "ethAmount"));
  const tokenSymbol = "NEU"; // TODO: this should be in config
  const gasLimit = config.contractsDeployed.gasLimit;
  const data = publicCommitment.rawWeb3Contract.commit.getData();

  return myEtherWalletUrl(
    contractAddress,
    value,
    MyEtherWalletSendMode.ETHER,
    tokenSymbol,
    gasLimit,
    data
  );
};
