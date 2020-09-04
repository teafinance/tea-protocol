// ============ Contracts ============

// Token
// deployed first
const TEAImplementation = artifacts.require("TEADelegate");
const TEAProxy = artifacts.require("TEADelegator");

// Rs
// deployed second
const TEAReserves = artifacts.require("TEAReserves");
const TEARebaser = artifacts.require("TEARebaser");

// ============ Main Migration ============

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployRs(deployer, network),
  ]);
};

module.exports = migration;

// ============ Deploy Functions ============

async function deployRs(deployer, network) {
  let reserveToken = "0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8"; // ycrv
  let uniswap_factory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
  await deployer.deploy(TEAReserves, reserveToken, TEAProxy.address);
  await deployer.deploy(TEARebaser,
    TEAProxy.address,
    reserveToken,
    uniswap_factory,
    TEAReserves.address
  );
  let rebase = new web3.eth.Contract(TEARebaser.abi, TEARebaser.address);

  let pair = await rebase.methods.uniswap_pair().call();
  console.log("TEA <-> YCRV UNISWAP Pair: ", pair)
  let tea = await TEAProxy.deployed();
  await tea._setRebaser(TEARebaser.address);
  console.log("tea._setRebaser");
  let reserves = await TEAReserves.deployed();
  await reserves._setRebaser(TEARebaser.address)
  console.log("reserves._setRebaser");

}
