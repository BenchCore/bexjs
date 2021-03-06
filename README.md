# bexjs

JavaScript Benchcore API wrapper to interact with the [Bench](http://bex.bex.life) multichain. Can be used to query or make transaction on the Bench Mainnet and Testnet from the client as a browserify or webpack compiled module, or on the server as a standard Node.js module.

## Install

`npm i bexjs --save`

## Documentation
- [Account](/docs/account.md)
- [API](/docs/api.md)
- [Blocks](/docs/blocks.md)
- [Delegate](/docs/delegate.md)
- [Peer](/docs/peer.md)
- [Transaction](/docs/transaction.md)

## Usage

```js
var bexjs = require('bexjs');

bexjs.getBlocksHeight()
  .then((height) => {
    console.log(height); // Return 2465689
  });

bexjs.getBalance('BSANY312MWN7Nd2any9DFh2bRiZRbQwpuZ')
  .then((balance) => {
    console.log(balance); // Return address balance
  });

// Set network to dev ('Bench' | 'BenchTest')
bexjs.setNetwork('BenchTest')

bexjs.getBlocksHeight()
  .then((height) => {
    console.log(height); // Return 1727011
  });
```

### Generate keys pair
```js
const keys = bexjs.getKeys();
console.log(keys);

// keys
{
  publicKey: '030bf73cb609f90d47a62eda1c411e5c7ee463db47fba5e5030b0f2932353d5618',
  privateKey: 'cb3e4b3d24e1c67c075de107c6a527cb7d37a1ec7d7f9bc85091c271a6020962',
  passphrase: 'quick tribe subway tackle wolf fitness leopard syrup kitten reject mansion vast',
  address: 'BSJQHQZyMCCmsXw3Ad2ujiq7Sm8th6eJiy'
}

// From passphrase
const keys = bexjs.getKeys('slogan plug release deny solar seed inject tag light winner box oyster');
console.log(keys);
// keys
{
  publicKey: '02e9239013baf66c98360cd267ba1917674e218a894ac2f36d72e40cffc6e55e8a',
  privateKey: '73079e6c1ebce0c37cf824ee4132a7c2d6a3340cd80eea1aa23b566911b42005',
  passphrase: 'slogan plug release deny solar seed inject tag light winner box oyster',
  address: 'B7VSQMHvcf3j6o6LxEeAnazYYbVyeTJw4v'
}
```

### Transactions

See [Transaction](/docs/transaction.md) for details

#### Send transaction
```js
const tx = bexjs.createTransaction({
  to: 'BGd99C51SgwyEPqnxgxDNzbCB7YqHACYZa', // Recipient address
  amount: 1, // Amount to send
  message: null, // Optionnal message
  passphrase: 'slogan plug release deny solar seed inject tag light winner box oyster', // Sender passphrase
  secondPassphrase: null // Optionnal second passphrase
})

bexjs.sendTransaction(tx)
  .then((res) => {
    console.log(res) // Result of the transaction
  })
  .catch((e) => {
    console.log(e)
  })
```
#### Send vote transaction
```js
// Vote for nomoreheroes
const tx = api.createVoteTransaction({
  passphrase: 'slogan plug release deny solar seed inject tag light winner box oyster', // Voters passphrase
  delegates: ['+03bd4f16e39aaba5cba6a87b7498b08ce540f279be367e68ae96fb05dfabe203ad'], // Public key of the delegate to vote
  secondPassphrase: null // Second passphrase (optionnal)
})

// Unvote for nomoreheroes
const tx = api.createVoteTransaction({
  passphrase: 'slogan plug release deny solar seed inject tag light winner box oyster', // Voters passphrase
  delegates: ['-03bd4f16e39aaba5cba6a87b7498b08ce540f279be367e68ae96fb05dfabe203ad'], // Public key of the delegate to unvote
  secondPassphrase: null
})

bexjs.sendTransaction(tx)
  .then((res) => {
    console.log(res) // Result of the vote transaction
  })
  .catch((e) => {
    console.log(e)
  })
```

### Endpoint parameters
```js
const params = {
  'limit': 2,
  'orderBy': 'productivity:desc'
}
bexjs.getDelegates(params)
  .then((delegates) => {
    console.log(delegates); // Return delegates array according to params
  });
```

## Build

```bash
git clone https://github.com/benchcore/bexjs.git
cd bexjs
npm install
npm run build
```


## Test

`npm run test`

## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
