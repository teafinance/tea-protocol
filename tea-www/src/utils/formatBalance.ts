import BigNumber from 'bignumber.js'

export const getDisplayBalance = (balance: BigNumber, decimals = 18) => {
    const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
    if (displayBalance.lt(1)) {
        return displayBalance.toPrecision(4)
    } else {
        return displayBalance.toFixed(2)
    }
}

export const getFullDisplayBalance = (balance: BigNumber, tokenName: string, decimals = 18) => {
    if (tokenName == 'USDT') {
        return balance.dividedBy(new BigNumber(10).pow(6)).toFixed()
    } else {
        return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
    }
}
