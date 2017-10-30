import { ThunkAction } from "redux-thunk";
import { IAppState } from "../reducers/index";
import { getNetworkId } from "../web3/utils";
import { Web3Service } from "../web3/web3Service";
import { Web3Type } from "./constants";
import { loadAgreements } from "./legalAgreement";
import { loadIcoParams } from "./loadIcoParams";
import { loadUserAccount, setLoadingAction } from "./loadUserAccount";
import { setEthNetworkAction, setWeb3Action } from "./web3";

export const initCommit: ThunkAction<{}, IAppState, {}> = async (dispatch, getState) => {
  await Web3Service.instance.injectWeb3IfAvailable();
  const networkId = await getNetworkId(Web3Service.instance.rawWeb3);
  dispatch(setEthNetworkAction(networkId));
  dispatch(setWeb3Action(Web3Type.GENERIC));

  await dispatch(loadIcoParams);
  await dispatch(loadAgreements);
  await dispatch(loadUserAccount);

  // this can happen if no user can be loaded
  if (getState().userState.loading) {
    await dispatch(setLoadingAction(false));
  }
};
