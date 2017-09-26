/**
 * script to simulate new blocks on parity in dev mode.
 * See https://github.com/Neufund/commit.neufund.org/blob/master/docs/parity.md#simulating-traffic for details.
 */

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const src = process.argv[2];
const dst = process.argv[3];

setInterval( () => {
  web3.eth.sendTransaction({from:src, to:dst, value: web3.toWei(1, "ether")});
  console.log(new Date(), " transferred some eth");
}, 9000);
