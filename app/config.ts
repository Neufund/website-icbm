function getEnvValue(obj: any, key: string) {
  if (obj[key] === undefined) {
    throw new Error(`${key} is not exists in .env file`);
  }
  return obj[key];
}

export let envPayload: any;

export const app_mode: string = getEnvValue(process.env, "APP_MODE");

switch (app_mode) {
  case "BEFORE_ANNOUNCEMENT":
    envPayload = { app_mode };
    break;
  case "ANNOUNCED":
    envPayload = {
      app_mode,
      commitmentStartDate: getEnvValue(process.env, "ICO_START_DATE"),
    };
    break;
  case "ON_BLOCKCHAIN":
    envPayload = {
      app_mode,
      commitmentContractAddress: getEnvValue(process.env, "COMMITMENT_CONTRACT_ADDRESS"),
      rpcProvider: getEnvValue(process.env, "RPC_PROVIDER"),
    };
    break;
}
