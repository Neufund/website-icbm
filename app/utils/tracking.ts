declare const ga: any;
declare const fbq: any;
declare const twq: any;
import { Web3Type } from "../actions/constants";

export const trackCommitEvent = (amount: string, web3Type: Web3Type): void => {
  // ga("send", "event", "commit", "web3Type", web3Type.toString());

  // tslint:disable-next-line no-console - it's just placeholder till we get correct code from contractor
  console.log(
    `here we are sending commit tracking events to GA, fb, and twitter with ${amount} and ${web3Type}`
  );
};

// TODO: check if this can be async there are 3 requests that should end before we can proceed
export const trackMEWEvent = (): void => {
  // tslint:disable-next-line no-console - it's just placeholder till we get correct code from contractor
  console.log(`here we are sending MEW tracking events to GA, fb, and twitter`);
};
