import {Contract} from "web3-eth-contract"

export interface Farm {
    contract: Contract,
    name: string,
    depositToken: string,
    depositTokenAddress: string,
    earnToken: string,
    earnTokenAddress: string,
    icon: React.ReactNode,
    id: string,
    sort: number,
    staking: number,
    distributed: number,
    total: number,
    dailyReturn: number,
    annualizedReturn: number
}

export interface FarmsContext {
    farms: Farm[]
}