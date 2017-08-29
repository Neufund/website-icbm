function getEnvValue<T>(obj: any, key: string): T {
    return obj[key] != undefined ? obj[key] : Error(`${key} is not exists in .env file`)
}

export const commitmentContractAdress: string = getEnvValue(process.env, 'COMMITMENT_CONTRACT_ADDRESS')