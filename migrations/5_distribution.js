var fs = require('fs')

// ============ Contracts ============


// Protocol
// deployed second
const TEAImplementation = artifacts.require("TEADelegate");
const TEAProxy = artifacts.require("TEADelegator");

// deployed third
const TEAReserves = artifacts.require("TEAReserves");
const TEARebaser = artifacts.require("TEARebaser");

const Gov = artifacts.require("GovernorAlpha");
const Timelock = artifacts.require("Timelock");

// deployed fourth
const TEA_USDTPool = artifacts.require("TEAUSDTPool");
const TEA_YFIPool = artifacts.require("TEAYFIPool");
const TEA_DFPool = artifacts.require("TEADFPool");
const TEA_FORPool = artifacts.require("TEAFORPool");
const TEA_GARDPool = artifacts.require("TEAGARDPool");
const TEA_MATHPool = artifacts.require("TEAMATHPool");
const TEA_MCBPool = artifacts.require("TEAMCBPool");
const TEA_RENPool = artifacts.require("TEARENPool");
const TEA_YCRVPool = artifacts.require("TEAYCRVPool");
const TEA_BMCPool = artifacts.require("TEABMCPool");
const TEA_SUSHIPool = artifacts.require("TEASUSHIPool");
const TEA_AISIPool = artifacts.require("TEAAISIPool");

// deployed fifth
const TEAIncentivizer = artifacts.require("TEAIncentivizer");

//verify contract
// example : truffle run verify TEADelegator --network kovan

// deployed end
//create_pair in uniswap
//TEARebaser->init_twap->after 12h activate_rebasing->wait 16pm or 4am (UTC+8) rebase


const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployDistribution(deployer, network, accounts),
  ]);
}

module.exports = migration;

// ============ Deploy Functions ============

async function deployDistribution(deployer, network, accounts) {
  console.log(network);
  let account = accounts[0];
  let teaAddress = TEAProxy.address;
  let reservesAddress = TEAReserves.address;
  let rebaserAddress = TEARebaser.address;
  let tlAddress = Timelock.address;
  let govAddress = Gov.address;
  console.log("account =", account);

  let tea = new web3.eth.Contract(TEAProxy.abi, teaAddress);
  let yReserves = new web3.eth.Contract(TEAReserves.abi, reservesAddress);
  let yRebaser = new web3.eth.Contract(TEARebaser.abi, rebaserAddress);
  let tl = new web3.eth.Contract(Timelock.abi, tlAddress);
  let gov = new web3.eth.Contract(Gov.abi, govAddress);
  let pair = await yRebaser.methods.uniswap_pair().call();

  console.log("deploying pools")
  await deployer.deploy(TEA_USDTPool, teaAddress);
  await deployer.deploy(TEA_YFIPool, teaAddress);
  await deployer.deploy(TEA_DFPool, teaAddress);
  await deployer.deploy(TEA_FORPool, teaAddress);
  await deployer.deploy(TEA_GARDPool, teaAddress);
  await deployer.deploy(TEA_MATHPool, teaAddress);
  await deployer.deploy(TEA_MCBPool, teaAddress);
  await deployer.deploy(TEA_RENPool, teaAddress);
  await deployer.deploy(TEA_YCRVPool, teaAddress);
  await deployer.deploy(TEA_BMCPool, teaAddress);
  await deployer.deploy(TEA_SUSHIPool, teaAddress);
  await deployer.deploy(TEA_AISIPool, teaAddress);

  await deployer.deploy(TEAIncentivizer, pair, teaAddress);


  //
  let usdt_pool = new web3.eth.Contract(TEA_USDTPool.abi, TEA_USDTPool.address);
  let yfi_pool = new web3.eth.Contract(TEA_YFIPool.abi, TEA_YFIPool.address);
  let df_pool = new web3.eth.Contract(TEA_DFPool.abi, TEA_DFPool.address);
  let for_pool = new web3.eth.Contract(TEA_FORPool.abi, TEA_FORPool.address);
  let gard_pool = new web3.eth.Contract(TEA_GARDPool.abi, TEA_GARDPool.address);
  let math_pool = new web3.eth.Contract(TEA_MATHPool.abi, TEA_MATHPool.address);
  let mcb_pool = new web3.eth.Contract(TEA_MCBPool.abi, TEA_MCBPool.address);
  let ren_pool = new web3.eth.Contract(TEA_RENPool.abi, TEA_RENPool.address);
  let ycrv_pool = new web3.eth.Contract(TEA_YCRVPool.abi, TEA_YCRVPool.address);
  let bmc_pool = new web3.eth.Contract(TEA_BMCPool.abi, TEA_BMCPool.address);
  let sushi_pool = new web3.eth.Contract(TEA_SUSHIPool.abi, TEA_SUSHIPool.address);
  let aisi_pool = new web3.eth.Contract(TEA_AISIPool.abi, TEA_AISIPool.address);

  let tea_incentivizer_pool = new web3.eth.Contract(TEAIncentivizer.abi, TEAIncentivizer.address);
  //
  console.log("setting distributor.......");
  await usdt_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("usdt_pool.methods.setRewardDistribution");
  await yfi_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("yfi_pool.methods.setRewardDistribution");
  await df_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("df_pool.methods.setRewardDistribution");
  await for_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("for_pool.methods.setRewardDistribution");
  await gard_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("gard_pool.methods.setRewardDistribution");
  await math_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("math_pool.methods.setRewardDistribution");
  await mcb_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("mcb_pool.methods.setRewardDistribution");
  await ren_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("ren_pool.methods.setRewardDistribution");
  await ycrv_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("ycrv_pool.methods.setRewardDistribution");
  await bmc_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("bmc_pool.methods.setRewardDistribution");
  await sushi_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("sushi_pool.methods.setRewardDistribution");
  await aisi_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("aisi_pool.methods.setRewardDistribution");


  await tea_incentivizer_pool.methods.setRewardDistribution(account).send({
    from: account,
    gas: 100000
  });
  console.log("tea_incentivizer_pool.methods.setRewardDistribution");

  //630,000
  let initReservesTokenInPool = web3.utils.toBN(630000).mul(web3.utils.toBN(10 ** 18));
  //106,364
  let initOtherTokenInPool = web3.utils.toBN(106364).mul(web3.utils.toBN(10 ** 18));
  //106,360
  let initAisiTokenInPool = web3.utils.toBN(106360).mul(web3.utils.toBN(10 ** 18));

  console.log("transfering.......");
  await tea.methods.transfer(TEA_USDTPool.address, initReservesTokenInPool.toString()).send({from: account});
  console.log("transfering TEA_USDTPool ");
  await tea.methods.transfer(TEA_YFIPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TEA_YFIPool ");
  await tea.methods.transfer(TEA_DFPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TEA_DFPool ");
  await tea.methods.transfer(TEA_FORPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TEA_FORPool ");
  await tea.methods.transfer(TEA_GARDPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TEA_GARDPool ");
  await tea.methods.transfer(TEA_MATHPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TEA_MATHPool ");
  await tea.methods.transfer(TEA_MCBPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TEA_MCBPool ");
  await tea.methods.transfer(TEA_RENPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TEA_RENPool ");
  await tea.methods.transfer(TEA_YCRVPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TEA_YCRVPool ");
  await tea.methods.transfer(TEA_BMCPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TEA_BMCPool ");
  await tea.methods.transfer(TEA_SUSHIPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TEA_SUSHIPool ");
  await tea.methods.transfer(TEA_AISIPool.address, initAisiTokenInPool.toString()).send({from: account});
  console.log("transfering TEA_AISIPool ");


  await tea.methods._setIncentivizer(TEAIncentivizer.address).send({from: account});
  console.log("tea.methods._setIncentivizer");

  console.log("notifying.......")
  await usdt_pool.methods.notifyRewardAmount(initReservesTokenInPool.toString()).send({from: account});
  console.log("notifying usdt_pool")
  await yfi_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying yfi_pool")
  await df_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying df_pool")
  await for_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying for_pool")
  await gard_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying gard_pool")
  await math_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying math_pool")
  await mcb_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying mcb_pool")
  await ren_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying ren_pool")
  await ycrv_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying ycrv_pool")
  await bmc_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying bmc_pool")
  await sushi_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying sushi_pool")
  await aisi_pool.methods.notifyRewardAmount(initAisiTokenInPool.toString()).send({from: account});
  console.log("notifying aisi_pool")

  // incentives is a minter and prepopulates itself.
  await tea_incentivizer_pool.methods.notifyRewardAmount("0").send({
    from: account,
    gas: 500000
  });
  console.log("notifying tea_incentivizer_pool")

  console.log("set reward distribution to timelock.......")
  await usdt_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("usdt_pool set reward distribution to timelock")
  await yfi_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("yfi_pool set reward distribution to timelock")
  await df_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("df_pool set reward distribution to timelock")
  await for_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("for_pool set reward distribution to timelock")
  await gard_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("gard_pool set reward distribution to timelock")
  await math_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("math_pool set reward distribution to timelock")
  await mcb_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("mcb_pool set reward distribution to timelock")
  await ren_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("ren_pool set reward distribution to timelock")
  await ycrv_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("ycrv_pool set reward distribution to timelock")
  await bmc_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("bmc_pool set reward distribution to timelock")
  await sushi_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("sushi_pool set reward distribution to timelock")
  await aisi_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("aisi_pool set reward distribution to timelock")

  await  tea_incentivizer_pool.methods.setRewardDistribution(tlAddress).send({
    from: account,
    gas: 100000
  });
  console.log("tea_incentivizer_pool set reward distribution to timelock")

  console.log("transer ownership for pools.......")
  await usdt_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("usdt_pool transer ownership for pools")
  await yfi_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("yfi_pool transer ownership for pools")
  await df_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("df_pool transer ownership for pools")
  await for_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("for_pool transer ownership for pools")
  await gard_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("gard_pool transer ownership for pools")
  await math_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("math_pool transer ownership for pools")
  await mcb_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("mcb_pool transer ownership for pools")
  await ren_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("ren_pool transer ownership for pools")
  await ycrv_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("ycrv_pool transer ownership for pools")
  await bmc_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("bmc_pool transer ownership for pools")
  await sushi_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("sushi_pool transer ownership for pools")
  await aisi_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("aisi_pool transer ownership for pools")

  await tea_incentivizer_pool.methods.transferOwnership(tlAddress).send({
    from: account,
    gas: 100000
  });
  console.log("tea_incentivizer_pool transer ownership for pools")

  console.log("transer ownership for all.......")
  await tea.methods._setPendingGov(tlAddress).send({from: account});
  console.log(" tea transer ownership")
  await yReserves.methods._setPendingGov(tlAddress).send({from: account});
  console.log(" reserves transer ownership")
  await yRebaser.methods._setPendingGov(tlAddress).send({from: account});
  console.log(" rebaser transer ownership")

  console.log("accept ownership.......")
  await tl.methods.executeTransaction(teaAddress, 0, "_acceptGov()", "0x", 0).send({from: account});
  console.log("tea accept ownership")
  await tl.methods.executeTransaction(reservesAddress, 0, "_acceptGov()", "0x", 0).send({from: account});
  console.log("reserves accept ownership")
  await tl.methods.executeTransaction(rebaserAddress, 0, "_acceptGov()", "0x", 0).send({from: account});
  console.log("rebaser accept ownership")

  console.log("set and accept ownership for gov.......")
  await tl.methods.setPendingAdmin(govAddress).send({from: account});
  console.log("tl.methods.setPendingAdmin")
  await gov.methods.__acceptAdmin().send({from: account});
  console.log("gov.methods.__acceptAdmin")
  await gov.methods.__abdicate().send({from: account});
  console.log("gov.methods.__abdicate")


  console.log("Pair Address=", await  yRebaser.methods.uniswap_pair().call());
  console.log("TEA Address=", teaAddress);
  console.log("Reserves Address=", reservesAddress);
  console.log("Rebaser Address=", rebaserAddress);
  console.log("TimeLock Address=", tlAddress);
  console.log("GOV Address=", govAddress);
  console.log("TEA_USDTPool Address=", TEA_USDTPool.address);
  console.log("TEA_YFIPool Address=", TEA_YFIPool.address);
  console.log("TEA_DFPool Address=", TEA_DFPool.address);
  console.log("TEA_FORPool Address=", TEA_FORPool.address);
  console.log("TEA_GARDPool Address=", TEA_GARDPool.address);
  console.log("TEA_MATHPool Address=", TEA_MATHPool.address);
  console.log("TEA_MCBPool Address=", TEA_MCBPool.address);
  console.log("TEA_RENPool Address=", TEA_RENPool.address);
  console.log("TEA_YCRVPool Address=", TEA_YCRVPool.address);
  console.log("TEA_BMCPool Address=", TEA_BMCPool.address);
  console.log("TEA_SUSHIPool Address=", TEA_SUSHIPool.address);
  console.log("TEA_AISIPool Address=", TEA_AISIPool.address);

  console.log("TEAIncentivizer Address=", TEAIncentivizer.address);


}
