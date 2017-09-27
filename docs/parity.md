# Parity in dev mode

Sometimes it is required to run Parity locally in dev mode. To do this use command  
`parity ui --chain dev --jsonrpc-cors "http://localhost:9090" --jsonrpc-hosts="all"`

## Obtaining ETH in dev mode
In Parity 1.7 when you run it in dev mode there should be account `0x00a329c0648769a73afac7f9381e08fb43dbea72` full of eth with password beeing empty string.

Prior to 1.7 procedure was following
- Click on "NEW ACCOUNT".
- Pick "Recover account from recovery phrase".
- Leave the phrase empty and fill the other fields.
- Go to the newly created account and click "TRANSFER" to conduct your first transaction.
- Confirm with a password picked earlier.

## Simulating traffic
In dev mode parity mine new blocks only after new transactions. That's a problem when you want to test transaction confirmations. Resolution here is to simulate new blocks by sending transactions. There is simple `node` script to automate it - `scripts/simulate_traffic.js`.  It periodically sends 1ETH from one account to another. 

As parameters it takes two addresses source and destination.
Source should be that address full of ETH created in previous step.
Destination can by any eth address.

`node scripts/simulate_traffic.js 0x00a329c0648769A73afAc7F9381E08FB43dBEA72 0x009f07E268ca8f4bA9D56Bd2B5dED1fd0D51357C` 

To send transactions without confirmations you need to open this account. For this you need to use `--unlock` and `--password` startup options then you can automatically sign any transactions that's gonna be send from this account. As `--unlock` option automatically disables UI you need to force it back passing `--force-ui` parameter.

Check parity [configuration manual](https://github.com/paritytech/parity/wiki/Configuring-Parity#cli-options) for details. 

Final commandline to run parity in this case:

`parity ui --chain dev --jsonrpc-cors "http://localhost:9090" --jsonrpc-hosts="all" --force-ui --unlock 0x00a329c0648769A73afAc7F9381E08FB43dBEA72 --password "$HOME/parity_dev_pass.txt"`
