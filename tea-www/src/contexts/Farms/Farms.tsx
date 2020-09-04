import React, {useCallback, useEffect, useState} from 'react'

import {Contract} from 'web3-eth-contract'

import {tea as teaAddress} from '../../constants/config'
import useYam from '../../hooks/useYam'
import {
    getPoolContracts,
    getCurrentPrice,
    getPrice,
    getNow,
    getStackingInPool,
    getTotalSupplyInPool,
    getDistributedInPool,
    getReturnsInPool
} from '../../yamUtils'

import Context from './context'
import {Farm} from './types'
import * as Config from '../../constants/config.js'

const NAME_FOR_POOL: { [key: string]: string } = {
    yam1_pool: 'YAM 1.0 Zombieland',
    snx_pool: 'SNX Homestead',
    // tea_incentivizer_pool: 'Eternal Lands',
    // ycrv_pool: 'Curve Village',
}

const ICON_FOR_POOL: { [key: string]: string } = {
    yam1_pool: '🧟‍♂️',
    snx_pool: '🌎',
    tea_incentivizer_pool: '🌈',
    ycrv_pool: '💰',
}

const SORT_FOR_POOL: { [key: string]: number } = {
    tea_incentivizer_pool: 100,
    usdt_pool: 99,
    df_pool: 3,
    yfi_pool: 3,
    for_pool: 3,
    gard_pool: 3,
    math_pool: 3,
    mcb_pool: 3,
    ren_pool: 3,
    ycrv_pool: 3,
    bmc_pool: 3,
    sushi_pool: 3,
    aisi_pool: 3,
}

const Farms: React.FC = ({children}) => {

    const [farms, setFarms] = useState<Farm[]>([])
    const yam = useYam()

    const fetchPools = useCallback(async () => {
        const pools: { [key: string]: Contract } = await getPoolContracts(yam)

        const poolKeys = Object.keys(pools)
        const teaPrice = await getCurrentPrice(yam);
        const  nowTimestamp=await getNow(yam);
        console.log("teaPrice", teaPrice);
        const farmsArr: Farm[]=  await Promise.all( poolKeys.map(async (x) => {
            const poolKey = x
            const pool = pools[poolKey]
            let tokenKey = poolKey.replace('_pool', '')
            if (tokenKey === 'tea_incentivizer') {
                tokenKey = 'tea_ycrv_uni_lp'
            }
            const method = pool.methods[tokenKey]
            try {
                let tokenAddress = ''
                if (method) {
                    tokenAddress = await method().call()
                } else if (tokenKey === 'tea_ycrv_uni_lp') {
                    tokenAddress = Config.addressMap.lpTokenPairAddress;
                } else if (tokenKey === 'for') {
                    tokenAddress = Config.addressMap.for;
                }
                let staking = await getStackingInPool(yam, tokenAddress, tokenKey, pool.options.address);
                // let staking = 1;
                let returns = await getReturnsInPool(yam, tokenKey, teaPrice, staking);
                const farm:Farm={
                    contract: pool,
                    name: NAME_FOR_POOL[poolKey],
                    depositToken: tokenKey,
                    depositTokenAddress: tokenAddress,
                    earnToken: 'tea',
                    earnTokenAddress: teaAddress,
                    icon: ICON_FOR_POOL[poolKey],
                    id: tokenKey,
                    sort: SORT_FOR_POOL[poolKey],
                    staking: staking,
                    distributed: await getDistributedInPool(yam, tokenKey,nowTimestamp),
                    total: await getTotalSupplyInPool(yam, tokenKey),
                    dailyReturn: returns.dailyReturn,
                    annualizedReturn: returns.annualizedReturn
                };
                return farm;
            } catch (e) {
                console.log(e)
            }
        }));
        console.log("farmsArr", farmsArr);
        farmsArr.sort((a, b) => a.sort < b.sort ? 1 : -1)
        setFarms(farmsArr)
    }, [yam, setFarms])

    useEffect(() => {
        if (yam) {
            fetchPools()
        }
    }, [yam, fetchPools])

    return (
        <Context.Provider value={{farms}}>
            {children}
        </Context.Provider>
    )
}

export default Farms
