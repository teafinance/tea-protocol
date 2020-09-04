import React, { useMemo } from 'react'
import styled from 'styled-components'

import numeral from 'numeral'

import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'

import { getDisplayBalance } from '../../../utils/formatBalance'
import BigNumber from 'bignumber.js'

import Spacer from '../../../components/Spacer'

interface StatsProps {
  circSupply?: string,
  curPrice?: number,
  targetPrice?: number,
  totalSupply?: string
}
const Stats: React.FC<StatsProps> = ({
  circSupply,
  curPrice,
  targetPrice,
  totalSupply,
}) => {

  const formattedTotalSupply = useMemo(() => {
    if (totalSupply) {
        if(new BigNumber(totalSupply).comparedTo(new BigNumber(10).pow(26))>0){
            return numeral(getDisplayBalance(new BigNumber(totalSupply).dividedBy(new BigNumber(10).pow(6)))).format('0.0a')
        }else {
            return numeral(getDisplayBalance(new BigNumber(totalSupply))).format('0.0a')
        }
    } else return '--'
  }, [totalSupply])

  return (
    <StyledStats>
      <Spacer />
      <Card bgColor="#E5F6FF" color="#236BFF">
        <CardContent>
          <StyledStat>
            <StyledValue>{curPrice ? `$${curPrice}` : '--'}</StyledValue>
            <Label text="Current Price" />
          </StyledStat>
        </CardContent>
      </Card>

      <Spacer />

      <Card bgColor="#E2F6E9" color="#399758">
        <CardContent>
          <StyledStat>
            <StyledValue>{targetPrice ? `$${targetPrice}` : '--'}</StyledValue>
            <Label text="Target Price" />
          </StyledStat>
        </CardContent>
      </Card>

      <Spacer />

      <Card bgColor="#FFF0E9" color="#FF5026">
        <CardContent>
          <StyledStat>
            {/*<StyledValue>*/}
              {/*--*/}
            {/*</StyledValue>*/}
              <StyledValue>{formattedTotalSupply ? `$${formattedTotalSupply}` : '--'}</StyledValue>

              <Label text="Total Supply" />
          </StyledStat>
        </CardContent>
      </Card>
      <Spacer />
    </StyledStats>
  )
}

const StyledStats = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`

const StyledStat = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledValue = styled.span`
  font-size: 36px;
  font-weight: 700;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
`

export default Stats