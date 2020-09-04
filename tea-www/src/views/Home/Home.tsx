import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'

import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'


import useYam from '../../hooks/useYam'

import Rebase from './components/Rebase'
import Stats from './components/Stats'
import Vote from './components/Vote'

import logoImg from '../../assets/img/logo图形.png'

import { OverviewData } from './types'
import { getStats } from './utils'

const Home: React.FC = () => {

  const { account } = useWallet()

  const yam = useYam()
  const [{
    circSupply,
    curPrice,
    nextRebase,
    targetPrice,
    totalSupply,
  }, setStats] = useState<OverviewData>({})

  const fetchStats = useCallback(async () => {
    const statsData = await getStats(yam)
      console.log(statsData.totalSupply);
    setStats(statsData)
  }, [yam, setStats])

  useEffect(() => {
    if (yam) {
      fetchStats()
    }
  }, [yam])

  return (
    <Page>
      <div style={{
        margin: '20px 0 -30px 0'
      }}>
        <img width="58" src={logoImg} />
      </div>
      <PageHeader icon="" subtitle="TEA is a token seeking price stability with elastic supply monetary model and governable treasury, derived mechanics from some high yield farming projects such as Yam and SushiSwap, with redesigned fair and prolonged distribution model, and support from more vibrant communities." title="TEA Finance" />
      <div style={{
        margin: '-24px auto 48px'
      }}>
      </div>
      
      <div style={{
        width: '100%'
      }}>
        <StyledOverview>
          <Stats
            circSupply={circSupply}
            curPrice={curPrice}
            targetPrice={targetPrice}
            totalSupply={totalSupply}
          />
          <StyledSpacer />
          <Rebase nextRebase={nextRebase} />
        </StyledOverview>
      </div>
    </Page>
  )
}

const StyledOverview = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`

const StyledLink = styled.a`
  font-weight: 700l
  text-decoration: none;
  color: ${props => props.theme.color.primary.main};
`

export default Home