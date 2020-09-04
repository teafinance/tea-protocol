import React from 'react'
import {
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom'
import { useWallet } from 'use-wallet'
import styled from 'styled-components'
import farmer from '../../assets/img/logo图形.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'

import Farm from '../Farm'
import Countdown, {CountdownRenderProps} from 'react-countdown'
import FarmCards from './components/FarmCards'
import StakeCards from './components/StakeCards'

import backgroundImg from '../../assets/img/background.png'
import teaBackgroundImg from '../../assets/img/tea-background.png'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account, connect } = useWallet()

  const renderer = (countdownProps: CountdownRenderProps) => {
      const {days,hours, minutes, seconds} = countdownProps
      const paddedDays = days
      const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
      const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
      const paddedHours = hours < 10 ? `0${hours}` : hours
      return (
        <StyledTimePanel>
            <StyledTimeItem>
                <StyledTimeBox>{paddedDays}</StyledTimeBox>
                <StyledTimeTag>Day</StyledTimeTag>
            </StyledTimeItem>
            <StyledTimeItem>
                <StyledTimeBox>{paddedHours}</StyledTimeBox>
                <StyledTimeTag>Hour</StyledTimeTag>
            </StyledTimeItem>
            <StyledTimeItem>
                <StyledTimeBox>{paddedMinutes}</StyledTimeBox>
                <StyledTimeTag>Min</StyledTimeTag>
            </StyledTimeItem>
            <StyledTimeItem>
                <StyledTimeBox>{paddedSeconds}</StyledTimeBox>
                <StyledTimeTag>Sec</StyledTimeTag>
            </StyledTimeItem>
        </StyledTimePanel>
      )
  }
  return (
    <Switch>
      <Page>
      {!!account ? (
        <>
          <Route exact path={path}>
              <StyledBackground><img src={backgroundImg}/></StyledBackground>
              <div style={{overflow:'hidden'}}>
              <StyledTeaBackground><img src={teaBackgroundImg} /></StyledTeaBackground>
              </div>
              
              <PageHeader
                icon={<img src={farmer} height="60" />}
                subtitle="Earn TEA tokens by staking with following coins."
                title="Select a Farm."
              />
              <StyledTimeWord>
                Time till Staking Period End
              </StyledTimeWord>

              <StyledCountdown>
                  <StyledCountdownText>
                    <Countdown date={1600378600000} renderer={renderer}/>
                  </StyledCountdownText>
              </StyledCountdown>
           
            
            <StyledStake>
               <StyledStakeType>UniSwap LP Token Staking</StyledStakeType>
               <StyledStakeDesc>Providing liquidity for <a target="_blank" href="https://uniswap.info/pair/0x206682199b4e7e52c0663b29c82c192ddd1c82da">TEA-yCRV pair</a>  on Uniswap to obtain Uniswap LP token, staking to the following pool to yield. Distrbuting 3571 TEA per hour.</StyledStakeDesc>
               <StakeCards />
            </StyledStake>
            <StyledStake style={{padding: '0 0 100px 0'}}>
               <StyledStakeType>Yield Staking</StyledStakeType>
               <StyledStakeDesc>Earn TEA tokens by staking community tokens.</StyledStakeDesc>
               <FarmCards />
            </StyledStake>
          </Route>
          <Route path={`${path}/:farmId`}>
            <Farm />
          </Route>

          <StyledLinkBox>
                  <a href="https://twitter.com/tea_finance" target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>Twitter</a>
                  <a href="https://t.me/joinchat/UDqHJhQ-7QlYv-Bn0rZzRQ" target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>Telegram</a>
                  <a href="https://github.com/teafinance/tea-protocol" target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>GitHub</a>
                  <a href='https://etherscan.io/token/0x504fa07ad26bf82455bc67653e8aadb19d25fee3' target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>Smart Contract</a>
                  <a href='https://uniswap.info/pair/0x206682199b4e7e52c0663b29c82c192ddd1c82da' target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>Uniswap TEA-yCRV</a>
          </StyledLinkBox>
        </>
      ) : (
        <div style={{
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
        }}>
          <Button
            labelColor="#fff"
            onClick={() => connect('injected')}
            text="Unlock Wallet"
          />
        </div>
      )}
      </Page>
    </Switch>
  )
}

const StyledStake = styled.div`
    background: #F8F9FB;
    width: 100%;
    padding: 40px 0 40px 0;
`

const StyledStakeType = styled.div`
    font-size: 24px;
    color: #212731;
    font-weight: bold;
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
`

const StyledTimeWord = styled.div`
  margin: -10px 0 10px 0;
  color: #399758;
  font-size: 16px;
  
`

const StyledTimePanel = styled.div`
  display: flex;
  margin: 0 auto 87px auto;
`

const StyledTimeItem = styled.div`
    margin-right: 15px;
`

const StyledTimeTag = styled.div`
   text-align: center;
   color: #399758;
   font-size: 14px;
   margin-top: 4px;
`

const StyledStakeDesc = styled.div`
  text-align: center;
  font-size: 14px;
  margin-bottom: 40px;
  color: #757E94;
  a{
    color: #0773FC;
  }
`


const StyledLinkBox = styled.div`
    width: 100%;
    text-align: center;
    line-height: 40px;
    position: fixed;
    bottom:0;
    left: 0;
    background: #F8F9FB;
    a:hover{
      color: #02D3A3 !important;
    }
`
const StyledTimeBox = styled.div`
   font-size: 35px;
   color: #399758;
   height: 60px;
   padding: 0 10px;
   font-weight: bold;
   background: #E2F6E9;
   border-radius: 4px;
   line-height: 60px;
   text-align: center;
   min-width: 40px;
`

const StyledBackground = styled.div`
    left: 0;
    top: 0;
    width: 100%;
    position:absolute; 
    img{
        width: 100%;
        min-height: 470px;
    }
    z-index: -3;
`

const StyledTeaBackground = styled.div`
  width: 1920px;
  position:absolute; 
  left: 50%; 
  margin-left:-960px;
  z-index: -1;
  top: 0;
  img{
      width: 100%;
  }
`

const StyledCountdown = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCountdownText = styled.span`
  color: ${props => props.theme.color.grey[600]};
  font-size: 36px;
  font-weight: 700;
`


export default Farms