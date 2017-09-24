import * as BigNumber from "bignumber.js";
import { Validator } from "redux-form";
import { parseStrToNumStrict } from "../utils/utils";
import { asEtherNumber, asWeiNumber } from "../web3/utils";

export const commitmentValueValidator: Validator = (value, _, props) => {
  const minTicketWei: BigNumber.BigNumber = props.minTicketWei;
  const minTicketEth = asEtherNumber(minTicketWei);

  if (value === undefined) {
    return "Required";
  }

  const number = parseStrToNumStrict(value);
  if (isNaN(number)) {
    return "You must enter a number!";
  }

  const numberInWei = asWeiNumber(new BigNumber.BigNumber(number)) as BigNumber.BigNumber;

  if (numberInWei.lessThan(minTicketWei)) {
    return `Minimum ticket size is ${minTicketEth.toString()} eth!`;
  }

  return undefined;
};
