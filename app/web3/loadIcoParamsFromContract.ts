export default async function loadIcoParamsFromContract(address: string) {
  return {
    startDate: new Date("30 Aug 2017 15:05 UTC").toISOString(),
    endDate: new Date("30 Sept 2017 15:05 UTC").toISOString(),
    lockedAccountAddress: "0x00000000000000000000000000000000000000000",
    neumarkTokenAddress: "0x0000000000000000000000000000000000000012343",
    minCap: 13432,
    maxCap: 43434343,
  };
}
