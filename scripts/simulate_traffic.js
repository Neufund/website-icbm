/**
 * script to simulate new blocks on parity in dev mode
 * node scripts/simulate_traffic.js 0x00a329c0648769A73afAc7F9381E08FB43dBEA72 0x009f07E268ca8f4bA9D56Bd2B5dED1fd0D51357C
 */

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const src = process.argv[2];
const dst = process.argv[3];

setInterval( () => {
  web3.eth.sendTransaction({from:src, to:dst, value: web3.toWei(1, "ether")});
  console.log(new Date(), " transferred some eth");
}, 12000);
