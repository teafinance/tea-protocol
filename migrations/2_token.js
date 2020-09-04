// ============ Contracts ============

// Token
// deployed first
const TEAImplementation = artifacts.require("TEADelegate");
const TEAProxy = artifacts.require("TEADelegator");

// ============ Main Migration ============

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployToken(deployer, network),
  ]);
};

module.exports = migration;

// ============ Deploy Functions ============


async function deployToken(deployer, network) {
  await deployer.deploy(TEAImplementation);
  if (network != "mainnet") {
    await deployer.deploy(TEAProxy,
      "TEA",
      "TEA",
      18,
      "1800000000000000000000000", // 1800k
      TEAImplementation.address,
      "0x"
    );
  } else {
    await deployer.deploy(TEAProxy,
      "TEA",
      "TEA",
      18,
      "1800000000000000000000000", // 1800k
      TEAImplementation.address,
      "0x"
    );
  }

}
