import {ethers} from 'ethers'

import BigNumber from 'bignumber.js'
import {stratTimestamp} from '../constants/config.js';

import {ChainId, WETH, Fetcher, Route} from '@uniswap/sdk'
import {addressMap, networkId, tea} from '../constants/config.js';

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const getPoolStartTime = async (poolContract) => {
  return await poolContract.methods.starttime().call()
}

export const stake = async (poolContract, tokenName, amount, account) => {
  let decimals = 18;
  if (tokenName == 'USDT') {
    decimals = 6;
  }
  let now = new Date().getTime() / 1000;
  if (now >= stratTimestamp) {
    return poolContract.methods
      .stake((new BigNumber(amount).times(new BigNumber(10).pow(decimals))).toString())
      .send({from: account, gas: 200000})
      .on('transactionHash', tx => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert("pool not active");
  }
}

export const unstake = async (poolContract, tokenName, amount, account) => {
  let decimals = 18;
  if (tokenName == 'USDT') {
    decimals = 6;
  }
  let now = new Date().getTime() / 1000;
  if (now >= stratTimestamp) {
    return poolContract.methods
      .withdraw((new BigNumber(amount).times(new BigNumber(10).pow(decimals))).toString())
      .send({from: account, gas: 200000})
      .on('transactionHash', tx => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert("pool not active");
  }
}

export const harvest = async (poolContract, account) => {
  let now = new Date().getTime() / 1000;
  if (now >= stratTimestamp) {
    return poolContract.methods
      .getReward()
      .send({from: account, gas: 200000})
      .on('transactionHash', tx => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert("pool not active");
  }
}

export const redeem = async (poolContract, account) => {
  let now = new Date().getTime() / 1000;
  if (now >= stratTimestamp) {
    return poolContract.methods
      .exit()
      .send({from: account, gas: 400000})
      .on('transactionHash', tx => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert("pool not active");
  }
}

export const approve = async (tokenContract, poolContract, account) => {
  return tokenContract.methods
    .approve(poolContract.options.address, ethers.constants.MaxUint256)
    .send({from: account, gas: 80000})
}

export const getPoolContracts = async (yam) => {
  const pools = Object.keys(yam.contracts)
    .filter(c => c.indexOf('_pool') !== -1)
    .reduce((acc, cur) => {
      const newAcc = {...acc}
      newAcc[cur] = yam.contracts[cur]
      return newAcc
    }, {})
  return pools
}

export const getEarned = async (yam, pool, account) => {
  const scalingFactor = new BigNumber(await yam.contracts.yam.methods.teasScalingFactor().call())
  const earned = new BigNumber(await pool.methods.earned(account).call())
  return earned.multipliedBy(scalingFactor.dividedBy(new BigNumber(10).pow(18)))
}

export const getStaked = async (yam, pool, account) => {
  return yam.toBigN(await pool.methods.balanceOf(account).call())
}
//获取token价格
export const getPrice = async (yam, tokenAddr, tokenName) => {
  // return await yam.contracts[tokenName.toLowerCase()+'_router'].midPrice.invert().toSignificant(6);
  const token = await Fetcher.fetchTokenData(networkId, tokenAddr);
  const USDT = await Fetcher.fetchTokenData(networkId, addressMap.usdt);
  const USDTWETHPair = await Fetcher.fetchPairData(USDT, WETH[networkId])
  const tokenPair = await Fetcher.fetchPairData(token, WETH[networkId]);
  const route = new Route([USDTWETHPair, tokenPair], USDT);
  console.log(tokenName + " price", route.midPrice.invert().toSignificant(6));
  return yam.toBigN(route.midPrice.invert().toSignificant(6));
}
//获取tea价格
export const getCurrentPrice = async (yam) => {
  const token = await Fetcher.fetchTokenData(networkId, tea);
  const ycrv = await Fetcher.fetchTokenData(networkId, addressMap.ycrv);
  const tokenPair = await Fetcher.fetchPairData(token, ycrv);
  const route = new Route([tokenPair], ycrv)
  console.log(route.midPrice.invert().toSignificant(6))
  return yam.toBigN(route.midPrice.invert().toSignificant(6));
  // FORBROCK: get current YAM price
  // return yam.toBigN(await yam.contracts.rebaser.methods.getCurrentTWAP().call())
}

export const getTotalSupplyInPool = async (yam, tokenName) => {
  if (tokenName == 'tea_ycrv_uni_lp') {
    return yam.toBigN(24000000).toFixed(0);
  } else if (tokenName == 'usdt') {
    return yam.toBigN(630000).toFixed(0);
  } else if (tokenName == 'aisi') {
    return yam.toBigN(106360).toFixed(0);
  } else {
    return yam.toBigN(106364).toFixed(0);
  }
}
export const getNow = async (yam) => {
return  await yam.web3.eth.getBlock('latest').then(res => res.timestamp);
}
export const getDistributedInPool = async (yam, tokenName,now) => {
  let total = await getTotalSupplyInPool(yam, tokenName);
  let timePassed = now - stratTimestamp;
  if (tokenName == 'tea_ycrv_uni_lp') {
    timePassed = now - 1599148800;
  }
  console.log(tokenName + " timePassed ", timePassed);
  if (0 > timePassed) {
    return 0;
  }
  if (tokenName != 'tea_ycrv_uni_lp') {
    let duration = 1316200;
    if (timePassed > 1316200) {
      return total;
    }
    return yam.toBigN(timePassed).multipliedBy(yam.toBigN(total).div(duration)).toFixed(0);
  } else {
    let duration = 625000;
    total = 600000;
    let weeks = yam.toBigN(timePassed).div(yam.toBigN(duration)).toFixed(0);
    if (weeks == 0) {
      return yam.toBigN(timePassed).multipliedBy(yam.toBigN(total).div(duration)).toFixed(0);
    } else {
      let before = total;
      for (let i = 1; i < weeks - 1; i++) {
        before = before + (total * (0.95 ** i));
      }
      total = yam.toBigN(total).multipliedBy(0.95 ** weeks);
      timePassed = timePassed % duration;
      return yam.toBigN(timePassed).multipliedBy(total.div(duration)).plus(before).toFixed(0);
    }
  }
}
export const getStackingInPool = async (yam, tokenAddr, tokenName, poolAddress) => {
  let balance = await yam.contracts[tokenName.toLowerCase()].methods.balanceOf(poolAddress).call();
  if (yam.toBigN(balance).comparedTo(yam.toBigN(0)) == 0) {
    return 0;
  }
  let price = 1;
  if (tokenName != 'usdt' && tokenName != 'tea_ycrv_uni_lp' && tokenName != 'aisi') {
    price = await getPrice(yam, tokenAddr, tokenName);
  }
  console.log(tokenName + " stacking", balance);
  if (tokenName == 'usdt') {
    return yam.toBigN(balance).div(10 ** 6).multipliedBy(price).toFixed(2);
  } else {
    return yam.toBigN(balance).div(10 ** 18).multipliedBy(price).toFixed(2);
  }
}
export const getReturnsInPool = async (yam, tokenName, teaPrice, stacking) => {
  let dailyReturnByTea = yam.toBigN(106364).div(15);
  if (tokenName == 'tea_ycrv_uni_lp') {
    dailyReturnByTea = yam.toBigN(600000).div(7);
  } else if (tokenName == 'usdt') {
    dailyReturnByTea = yam.toBigN(630000).div(15);
  } else if (tokenName == 'aisi') {
    dailyReturnByTea = yam.toBigN(106360).div(15);
  }
  if (stacking == 0) {
    return {'dailyReturn': 0, 'annualizedReturn': 0}
  }
  let dailyReturn = dailyReturnByTea.multipliedBy(teaPrice * 100).div(stacking);
  let annualizedReturn = dailyReturn.multipliedBy(360);
  return {'dailyReturn': dailyReturn.toFixed(1), 'annualizedReturn': annualizedReturn.toFixed(1)}
}
export const getTargetPrice = async (yam) => {
  return yam.toBigN(1).toFixed(2);
}

export const getCirculatingSupply = async (yam) => {
  let now = await yam.web3.eth.getBlock('latest');
  let scalingFactor = yam.toBigN(await yam.contracts.yam.methods.yamsScalingFactor().call());
  let starttime = yam.toBigN(await yam.contracts.usdt_pool.methods.starttime().call()).toNumber();
  let timePassed = now["timestamp"] - starttime;
  if (timePassed < 0) {
    return 0;
  }
  let yamsDistributed = yam.toBigN(8 * timePassed * 250000 / 625000); //yams from first 8 pools
  timePassed = now["timestamp"] - starttime;
  let pool2Yams = yam.toBigN(timePassed * 1500000 / 625000); // yams from second pool. note: just accounts for first week
  let circulating = pool2Yams.plus(yamsDistributed).times(scalingFactor).div(10 ** 36).toFixed(2)
  return circulating
}

export const getNextRebaseTimestamp = async (yam) => {
  try {
    let now = await yam.web3.eth.getBlock('latest').then(res => res.timestamp);
    let interval = 43200; // 12 hours
    let offset = 28800; // 1am/1pm utc
    let secondsToRebase = 0;
    if (await yam.contracts.rebaser.methods.rebasingActive().call()) {
      if (now % interval > offset) {
        secondsToRebase = (interval - (now % interval)) + offset;
      } else {
        secondsToRebase = offset - (now % interval);
      }
    } else {
      let twap_init = yam.toBigN(await yam.contracts.rebaser.methods.timeOfTWAPInit().call()).toNumber();
      if (twap_init > 0) {
        let delay = yam.toBigN(await yam.contracts.rebaser.methods.rebaseDelay().call()).toNumber();
        let endTime = twap_init + delay;
        if (endTime % interval > offset) {
          secondsToRebase = (interval - (endTime % interval)) + offset;
        } else {
          secondsToRebase = offset - (endTime % interval);
        }
        console.log("secondsToRebase", secondsToRebase);
        console.log("nextRebaseTimestamp", endTime + secondsToRebase);
        return endTime + secondsToRebase;
      } else {
        return now + 13 * 60 * 60; // just know that its greater than 12 hours away
      }
    }
    return secondsToRebase
  } catch (e) {
    console.log(e)
  }
}

export const getTotalSupply = async (yam) => {
  return await yam.contracts.yam.methods.totalSupply().call();
}

export const getStats = async (yam) => {
  const curPrice = await getCurrentPrice(yam)
  const circSupply = await getCirculatingSupply(yam)
  const nextRebase = await getNextRebaseTimestamp(yam)
  const targetPrice = await getTargetPrice(yam)
  const totalSupply = await getTotalSupply(yam)

  return {
    circSupply,
    curPrice,
    nextRebase,
    targetPrice,
    totalSupply
  }
}

export const vote = async (yam, account) => {
  return yam.contracts.gov.methods.castVote(0, true).send({from: account})
}

export const delegate = async (yam, account) => {
  return yam.contracts.yam.methods.delegate("0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84").send({
    from: account,
    gas: 320000
  })
}

export const didDelegate = async (yam, account) => {
  return await yam.contracts.yam.methods.delegates(account).call() === '0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84'
}

export const getVotes = async (yam) => {
  const votesRaw = new BigNumber(await yam.contracts.yam.methods.getCurrentVotes("0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84").call()).div(10 ** 24)
  return votesRaw
}

export const getScalingFactor = async (yam) => {
  return new BigNumber(await yam.contracts.yam.methods.teasScalingFactor().call()).dividedBy(new BigNumber(10).pow(18))
}

export const getDelegatedBalance = async (yam, account) => {
  return new BigNumber(await yam.contracts.yam.methods.balanceOfUnderlying(account).call()).div(10 ** 24)
}

