#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
cd ..

echo "Getting docker image with ico contracts"
docker pull krzkaczor/neufund-ico
echo "Starting docker container"
docker run -d -p 8545:8545 --name neufund-ico krzkaczor/neufund-ico

echo "Building website"
cp -n .env.example .env || true
APP_STATE=CONTRACTS_DEPLOYED COMMITMENT_TYPE=WHITELISTED COMMITMENT_CONTRACT_ADDRESS=0xbe84036c11964e9743f056f4e780a99d302a77c4 RPC_PROVIDER=http://localhost:8545 yarn build

echo "Spawning http server on port 8080"
http-server ./dist&
http_server_pid=$!
echo "HttpServer pid: ${http_server_pid}"

yarn test-e2e

echo "Removing docker container"
docker rm -f neufund-ico
echo "Killing http server"
kill $http_server_pid || true
