#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
cd ..

git clone https://github.com/Neufund/ico-contracts.git contracts
cd contracts
git checkout kk/frontend-releated-fixes

echo "Install deps"
yarn --no-progress

echo "Run testrpc in the background"
yarn testrpc&
testrpc_pid=$!
echo "TestRPC pid: ${testrpc_pid}"

echo "Deploy smartcontracts"
DEPLOY_OUTPUT="$(yarn deploy)"
echo "$DEPLOY_OUTPUT"

contract_code="$(echo "$DEPLOY_OUTPUT" | awk '$1 ~ /^ICO/' | awk '{print $3}')"
echo "Detected contract address: $contract_code"

cd ..
echo "building website"
cp .env.example .env
APP_STATE=CONTRACTS_DEPLOYED COMMITMENT_TYPE=WHITELISTED COMMITMENT_CONTRACT_ADDRESS=$contract_code yarn build

echo "Spawning http server on port 8080"
http-server ./dist&
http_server_pid=$!
echo "HttpServer pid: ${http_server_pid}"

yarn test-e2e

echo "killing testrpc"
kill $testrpc_pid || true
echo "killing http server"
kill $http_server_pid || true
