import BigNumber from 'bignumber.js/bignumber';
import Web3 from 'web3';
import * as Types from "./types.js";
import {SUBTRACT_GAS_LIMIT, addressMap, tea as tokenAddress} from '../../constants/config.js';

import ERC20Json from '../clean_build/contracts/IERC20.json';
import TEAJson from '../clean_build/contracts/TEADelegator.json';
import TEARebaserJson from '../clean_build/contracts/TEARebaser.json';
import TEAReservesJson from '../clean_build/contracts/TEAReserves.json';
import TEAGovJson from '../clean_build/contracts/GovernorAlpha.json';
import TEATimelockJson from '../clean_build/contracts/Timelock.json';
import UNIFactJson from './unifact2.json';
import UNIPairJson from './uni2.json';
import UNIRouterJson from './uniR.json';

import USDTPoolJson from '../clean_build/contracts/TEAUSDTPool.json';
import YFIPoolJson from '../clean_build/contracts/TEAYFIPool.json';
import DFPoolJson from '../clean_build/contracts/TEADFPool.json';
import FORPoolJson from '../clean_build/contracts/TEAFORPool.json';
import GARDPoolJson from '../clean_build/contracts/TEAGARDPool.json';
import MATHPoolJson from '../clean_build/contracts/TEAMATHPool.json';
import MCBPoolJson from '../clean_build/contracts/TEAMCBPool.json';
import RENPoolJson from '../clean_build/contracts/TEARENPool.json';
import YCRVPoolJson from '../clean_build/contracts/TEAYCRVPool.json';
import BMCPoolJson from '../clean_build/contracts/TEABMCPool.json';
import SUSHIPoolJson from '../clean_build/contracts/TEASUSHIPool.json';
import AISIPoolJson from '../clean_build/contracts/TEAAISIPool.json';

import IncJson from '../clean_build/contracts/TEAIncentivizer.json';

export class Contracts {
  constructor(
    provider,
    networkId,
    web3,
    options
  ) {
    this.web3 = web3;
    this.defaultConfirmations = options.defaultConfirmations;
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5;
    this.confirmationType = options.confirmationType || Types.ConfirmationType.Confirmed;
    this.defaultGas = options.defaultGas;
    this.defaultGasPrice = options.defaultGasPrice;

    this.uni_pair = new this.web3.eth.Contract(UNIPairJson);
    this.uni_router = new this.web3.eth.Contract(UNIRouterJson, addressMap.UNIRouter);
    this.uni_fact = new this.web3.eth.Contract(UNIFactJson, addressMap.uniswapFactoryV2);

    this.yam = new this.web3.eth.Contract(TEAJson.abi, tokenAddress);

    this.usdt = new this.web3.eth.Contract(ERC20Json.abi, addressMap.usdt);
    this.usdt_pool = new this.web3.eth.Contract(USDTPoolJson.abi, addressMap.usdt_pool);
    this.yfi = new this.web3.eth.Contract(ERC20Json.abi, addressMap.yfi);
    this.yfi_pool = new this.web3.eth.Contract(YFIPoolJson.abi, addressMap.yfi_pool);
    this.df = new this.web3.eth.Contract(ERC20Json.abi, addressMap.df);
    this.df_pool = new this.web3.eth.Contract(DFPoolJson.abi, addressMap.df_pool);
    this.for = new this.web3.eth.Contract(ERC20Json.abi, addressMap.for);
    this.for_pool = new this.web3.eth.Contract(FORPoolJson.abi, addressMap.for_pool);
    this.gard = new this.web3.eth.Contract(ERC20Json.abi, addressMap.gard);
    this.gard_pool = new this.web3.eth.Contract(GARDPoolJson.abi, addressMap.gard_pool);
    this.math = new this.web3.eth.Contract(ERC20Json.abi, addressMap.math);
    this.math_pool = new this.web3.eth.Contract(MATHPoolJson.abi, addressMap.math_pool);
    this.mcb = new this.web3.eth.Contract(ERC20Json.abi, addressMap.mcb);
    this.mcb_pool = new this.web3.eth.Contract(MCBPoolJson.abi, addressMap.mcb_pool);
    this.ren = new this.web3.eth.Contract(ERC20Json.abi, addressMap.ren);
    this.ren_pool = new this.web3.eth.Contract(RENPoolJson.abi, addressMap.ren_pool);
    this.ycrv = new this.web3.eth.Contract(ERC20Json.abi, addressMap.ycrv);
    this.ycrv_pool = new this.web3.eth.Contract(YCRVPoolJson.abi, addressMap.ycrv_pool);
    this.bmc = new this.web3.eth.Contract(ERC20Json.abi, addressMap.bmc);
    this.bmc_pool = new this.web3.eth.Contract(BMCPoolJson.abi, addressMap.bmc_pool);
    this.sushi = new this.web3.eth.Contract(ERC20Json.abi, addressMap.sushi);
    this.sushi_pool = new this.web3.eth.Contract(SUSHIPoolJson.abi, addressMap.sushi_pool);
    this.aisi = new this.web3.eth.Contract(ERC20Json.abi, addressMap.aisi);
    this.aisi_pool = new this.web3.eth.Contract(AISIPoolJson.abi, addressMap.aisi_pool);

    this.tea_incentivizer_pool = new this.web3.eth.Contract(IncJson.abi, addressMap.incentivizer_pool);
    this.tea_ycrv_uni_lp = new this.web3.eth.Contract(ERC20Json.abi, addressMap.lpTokenPairAddress);
    this.erc20 = new this.web3.eth.Contract(ERC20Json.abi);

    this.rebaser = new this.web3.eth.Contract(TEARebaserJson.abi, addressMap.rebaser);
    this.reserves = new this.web3.eth.Contract(TEAReservesJson.abi, addressMap.reserves);
    this.gov = new this.web3.eth.Contract(TEAGovJson.abi, addressMap.gov);
    this.timelock = new this.web3.eth.Contract(TEATimelockJson.abi, addressMap.timelock);
    this.setProvider(provider, networkId);
    this.setDefaultAccount(this.web3.eth.defaultAccount);

  }


  setProvider(
    provider,
    networkId
  ) {
    this.yam.setProvider(provider);
    this.rebaser.setProvider(provider);
    this.reserves.setProvider(provider);
    this.gov.setProvider(provider);
    this.timelock.setProvider(provider);
    const contracts = [
      {contract: this.yam, json: TEAJson},
      {contract: this.rebaser, json: TEARebaserJson},
      {contract: this.reserves, json: TEAReservesJson},
      {contract: this.gov, json: TEAGovJson},
      {contract: this.timelock, json: TEATimelockJson},
      {contract: this.usdt_pool, json: USDTPoolJson},
      {contract: this.yfi_pool, json: YFIPoolJson},
      {contract: this.df_pool, json: DFPoolJson},
      {contract: this.for_pool, json: FORPoolJson},
      {contract: this.gard_pool, json: GARDPoolJson},
      {contract: this.math_pool, json: MATHPoolJson},
      {contract: this.mcb_pool, json: MCBPoolJson},
      {contract: this.ren_pool, json: RENPoolJson},
      {contract: this.ycrv_pool, json: YCRVPoolJson},
      {contract: this.bmc_pool, json: BMCPoolJson},
      {contract: this.sushi_pool, json: SUSHIPoolJson},
      {contract: this.aisi_pool, json: AISIPoolJson},


      {contract: this.tea_incentivizer_pool, json: IncJson},
    ]

    contracts.forEach(contract => this.setContractProvider(
      contract.contract,
      contract.json,
      provider,
      networkId,
      ),
    );
    this.tea_ycrv_uni_lp.options.address = addressMap.lpTokenPairAddress;
    this.uni_fact.options.address = addressMap["uniswapFactoryV2"];
    this.uni_router.options.address = addressMap["UNIRouter"];
  }

  setDefaultAccount(
    account
  ) {
    // this.yam.options.from = account;
    // this.snx.options.from = account;
    // this.usdt.options.from = account;

  }

  async callContractFunction(
    method,
    options
  ) {
    const {confirmations, confirmationType, autoGasMultiplier, ...txOptions} = options;

    if (!this.blockGasLimit) {
      await this.setGasLimit();
    }

    if (!txOptions.gasPrice && this.defaultGasPrice) {
      txOptions.gasPrice = this.defaultGasPrice;
    }

    if (confirmationType === Types.ConfirmationType.Simulate || !options.gas) {
      let gasEstimate;
      if (this.defaultGas && confirmationType !== Types.ConfirmationType.Simulate) {
        txOptions.gas = this.defaultGas;
      } else {
        try {
          console.log("estimating gas");
          gasEstimate = await method.estimateGas(txOptions);
        } catch (error) {
          const data = method.encodeABI();
          const {from, value} = options;
          const to = method._parent._address;
          error.transactionData = {from, value, data, to};
          throw error;
        }

        const multiplier = autoGasMultiplier || this.autoGasMultiplier;
        const totalGas = Math.floor(gasEstimate * multiplier);
        txOptions.gas = totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit;
      }

      if (confirmationType === Types.ConfirmationType.Simulate) {
        let g = txOptions.gas;
        return {gasEstimate, g};
      }
    }

    if (txOptions.value) {
      txOptions.value = new BigNumber(txOptions.value).toFixed(0);
    } else {
      txOptions.value = '0';
    }

    const promi = method.send(txOptions);

    const OUTCOMES = {
      INITIAL: 0,
      RESOLVED: 1,
      REJECTED: 2,
    };

    let hashOutcome = OUTCOMES.INITIAL;
    let confirmationOutcome = OUTCOMES.INITIAL;

    const t = confirmationType !== undefined ? confirmationType : this.confirmationType;

    if (!Object.values(Types.ConfirmationType).includes(t)) {
      throw new Error(`Invalid confirmation type: ${t}`);
    }

    let hashPromise;
    let confirmationPromise;

    if (t === Types.ConfirmationType.Hash || t === Types.ConfirmationType.Both) {
      hashPromise = new Promise(
        (resolve, reject) => {
          promi.on('error', (error) => {
            if (hashOutcome === OUTCOMES.INITIAL) {
              hashOutcome = OUTCOMES.REJECTED;
              reject(error);
              const anyPromi = promi;
              anyPromi.off();
            }
          });

          promi.on('transactionHash', (txHash) => {
            if (hashOutcome === OUTCOMES.INITIAL) {
              hashOutcome = OUTCOMES.RESOLVED;
              resolve(txHash);
              if (t !== Types.ConfirmationType.Both) {
                const anyPromi = promi;
                anyPromi.off();
              }
            }
          });
        },
      );
    }

    if (t === Types.ConfirmationType.Confirmed || t === Types.ConfirmationType.Both) {
      confirmationPromise = new Promise(
        (resolve, reject) => {
          promi.on('error', (error) => {
            if (
              (t === Types.ConfirmationType.Confirmed || hashOutcome === OUTCOMES.RESOLVED)
              && confirmationOutcome === OUTCOMES.INITIAL
            ) {
              confirmationOutcome = OUTCOMES.REJECTED;
              reject(error);
              const anyPromi = promi;
              anyPromi.off();
            }
          });

          const desiredConf = confirmations || this.defaultConfirmations;
          if (desiredConf) {
            promi.on('confirmation', (confNumber, receipt) => {
              if (confNumber >= desiredConf) {
                if (confirmationOutcome === OUTCOMES.INITIAL) {
                  confirmationOutcome = OUTCOMES.RESOLVED;
                  resolve(receipt);
                  const anyPromi = promi;
                  anyPromi.off();
                }
              }
            });
          } else {
            promi.on('receipt', (receipt) => {
              confirmationOutcome = OUTCOMES.RESOLVED;
              resolve(receipt);
              const anyPromi = promi;
              anyPromi.off();
            });
          }
        },
      );
    }

    if (t === Types.ConfirmationType.Hash) {
      const transactionHash = await hashPromise;
      if (this.notifier) {
        this.notifier.hash(transactionHash)
      }
      return {transactionHash};
    }

    if (t === Types.ConfirmationType.Confirmed) {
      return confirmationPromise;
    }

    const transactionHash = await hashPromise;
    if (this.notifier) {
      this.notifier.hash(transactionHash)
    }
    return {
      transactionHash,
      confirmation: confirmationPromise,
    };
  }

  async callConstantContractFunction(
    method,
    options
  ) {
    const m2 = method;
    const {blockNumber, ...txOptions} = options;
    return m2.call(txOptions, blockNumber);
  }

  async setGasLimit() {
    const block = await this.web3.eth.getBlock('latest');
    this.blockGasLimit = block.gasLimit - SUBTRACT_GAS_LIMIT;
  }

  setContractProvider(
    contract,
    contractJson,
    provider,
    networkId,
  ) {
    contract.setProvider(provider);
    try {
      contract.options.address = contractJson.networks[networkId]
        && contractJson.networks[networkId].address;
    } catch (error) {
      // console.log(error)
    }
  }
}
