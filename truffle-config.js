require('dotenv-flow').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
var Web3 = require('web3');
// var p = ;
module.exports = {
  compilers: {
    solc: {
      version: '0.5.17',
      parser: 'solcjs',
      settings: {
        optimizer: {
          enabled: true,
          runs: 50000
        },
        evmVersion: 'istanbul',
      },
    },
  },
  plugins: [
     'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: '*******************'
  },
  networks: {
    test: {
      host: '0.0.0.0',
      port: 8545,
      network_id: '1001',
      gasPrice: 50000000000,
      gas: 8000000,
      network_id: '1001',
    },
    distribution: {
      host: '0.0.0.0',
      port: 8545,
      network_id: '1001',
      gasPrice: 50000000000,
      gas: 8000000,
      network_id: '1001',
    },
    test_ci: {
      host: '0.0.0.0',
      port: 8545,
      gasPrice: 1,
      gas: 10000000,
      network_id: '1001',
    },
    mainnet: {
      network_id: '1',
      provider: () => new HDWalletProvider(
        '*******************',
        'wss://mainnet.infura.io/ws/v3/*******************'
      ),
      gasPrice: 480000000000, // 180 gwei
      gas: 2000000,
      skipDryRun: true,
      timeoutBlocks: 8000,
    },
    kovan: {
      network_id: '42',
      provider: () => new HDWalletProvider(
       '*******************',
        'wss://kovan.infura.io/ws/v3/*******************'
      ),
      gasPrice: 1000000000, // 1 gwei
      gas: 10000000,
      skipDryRun: true,
      networkCheckTimeout:600000
    },
    dev: {
      host: 'localhost',
      port: 8445,
      network_id: '1005',
      gasPrice: 1000000000, // 1 gwei
      gas: 8000000,
    },
    coverage: {
      host: '0.0.0.0',
      network_id: '1002',
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 1,
    },
    docker: {
      host: 'localhost',
      network_id: '1313',
      port: 8545,
      gasPrice: 1,
    },
  },
};
