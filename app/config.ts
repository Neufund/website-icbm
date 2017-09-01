function getEnvValue(obj: any, key: string) {
  if (obj[key] === undefined) {
    throw new Error(`${key} is not exists in .env file`);
  }
  return obj[key];
}

export const commitmentContractAdress: string = getEnvValue(
  process.env,
  "COMMITMENT_CONTRACT_ADDRESS"
);

export const commitmentStartDate: string = getEnvValue(process.env, "ICO_START_DATE");

export const RpcProvider: string = getEnvValue(process.env, "RPC_PROVIDER");
