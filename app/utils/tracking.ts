declare const ga: any; // tslint:disable-line no-unused-variable
declare const fbq: any; // tslint:disable-line no-unused-variable
declare const twq: any; // tslint:disable-line no-unused-variable
import { Web3Type } from "../actions/constants";

export const trackCommitEvent = (amount: string, web3Type: Web3Type): void => {
  // ga("send", "event", "commit", "web3Type", web3Type.toString());

  try {
    // tslint:disable-next-line no-console - it's just placeholder till we get correct code from contractor
    console.log(
      `here we are sending commit tracking events to GA, fb, and twitter with ${amount} and ${web3Type}`
    );
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log("error in tracking commit", e);
  }
};

export const trackMEWEvent = (): void => {
  try {
    // tslint:disable-next-line no-console - it's just placeholder till we get correct code from contractor
    console.log(`here we are sending MEW tracking events to GA, fb, and twitter`);
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log("error in tracking MyEtherWallet link click", e);
  }
};
