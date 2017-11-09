import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { getNetworkId } from "../web3/utils";
import { Web3Service } from "../web3/web3Service";
import { loadAgreements } from "./legalAgreement";
import { loadIcoParams } from "./loadIcoParams";
import { setEthNetworkAction } from "./web3";

export const initCommit: ThunkAction<{}, IAppState, {}> = async dispatch => {
  await dispatch(loadAgreements);
  const networkId = await getNetworkId(Web3Service.instance.rawWeb3);
  dispatch(setEthNetworkAction(networkId));

  await dispatch(loadIcoParams);
};
