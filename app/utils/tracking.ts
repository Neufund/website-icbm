declare const ga: any;
declare const fbq: any;
declare const twttr: any;
import { Web3Type } from "../actions/constants";
import config from "../config";

export const trackCommitEvent = (amount: string, web3Type: Web3Type): void => {
  try {
    ga("send", "event", "commit", web3Type.toString(), amount);

    fbq("trackCustom", "GenericSignUp", {
      value: amount,
    });

    if (typeof twttr !== "undefined") {
      twttr.conversion.trackPid(config.contractsDeployed.twitterTrackCommitId, {
        tw_sale_amount: amount,
        tw_order_quantity: 1,
      });
    }
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log("error in tracking commit", e);
  }
};

export const trackMCEvent = (): void => {
  try {
    ga("send", "event", "MyCrypto", "link");

    fbq("trackCustom", "MyCryptoSignUp", {
      value: 0,
    });

    if (typeof twttr !== "undefined") {
      twttr.conversion.trackPid(config.contractsDeployed.twitterTrackMEWId, {
        tw_sale_amount: 0,
        tw_order_quantity: 0,
      });
    }
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log("error in tracking MyCrypto link click", e);
  }
};
