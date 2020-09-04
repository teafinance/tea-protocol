import React from 'react'
import styled from 'styled-components'
import Countdown, {CountdownRenderProps} from 'react-countdown'

import Button from '../../../components/Button'
import {NavLink} from 'react-router-dom'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Dial from '../../../components/Dial'
import Label from '../../../components/Label'
import wave from '../../../assets/img/wave.png'

interface RebaseProps {
    nextRebase?: number
}

const Rebase: React.FC<RebaseProps> = ({nextRebase}) => {

    const renderer = (countdownProps: CountdownRenderProps) => {
        const {hours, minutes, seconds} = countdownProps
        const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
        const paddedHours = hours < 10 ? `0${hours}` : hours
        return (
            <span>{paddedHours}:{paddedMinutes}:{paddedSeconds}</span>
        )
    }

    const dialValue = nextRebase / (1000 * 60 * 60 * 12) * 100

    return (
        <StyledRebase>
            <Card>
                <CardContent>
                    <Dial disabled={!nextRebase} size={232} value={dialValue ? dialValue : 0}>
                        <StyledCountdown>
                            <StyledCountdownText>
                                {!nextRebase ? '--' : nextRebase < 100000000 ? (
                                    <Countdown date={new Date(Date.now() + nextRebase)} renderer={renderer}/>
                                ) : (
                                    <Countdown date={new Date(nextRebase)} renderer={renderer}/>
                                )}
                            </StyledCountdownText>
                            <Label text="Next rebase"/>
                        </StyledCountdown>
                    </Dial>
                    <StyledSpacer/>
                    {/* <Button disabled text="Rebase" /> */}
                    <StyleJoinButton to="/farms">
                        Choose a Farm to grow TEA
                    </StyleJoinButton>
                    <StyleJoin>
                        <img width="100%" src={wave}/>
                    </StyleJoin>

                    <StyledLinkBox>
                            <a href="https://twitter.com/tea_finance" target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>Twitter</a>
                            <a href="https://t.me/joinchat/UDqHJhQ-7QlYv-Bn0rZzRQ" target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>Telegram</a>
                            <a href="https://github.com/teafinance/tea-protocol" target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>GitHub</a>
                            <a href='https://etherscan.io/token/0x504fa07ad26bf82455bc67653e8aadb19d25fee3' target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>Smart Contract</a>
                            <a href='https://uniswap.info/pair/0x206682199b4e7e52c0663b29c82c192ddd1c82da' target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>Uniswap TEA-yCRV</a>
                    </StyledLinkBox>

                </CardContent>
            </Card>
        </StyledRebase>
    )
}

const StyledRebase = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
`

const StyleJoin = styled.div`
  width: 100%;
  bottom: 0;
  position: fixed;
  left: 0;
  z-index: 99;
`

const StyledLinkBox = styled.div`
    width: 100%;
    bottom: 0;
    position: fixed;
    left: 0;
    z-index: 99;
    text-align: center;
    line-height: 40px;
    a:hover{
        color: #02D3A3 !important;
    }
`

const StyleJoinButton = styled(NavLink)`
   width: 240px;
   height: 40px;
   line-height: 40px;
   background: #212731;
   text-align: center;
   margin: 10px auto;
   font-size: 16px;
   color: #fff;
   border-radius: 20px;
   cursor: pointer;
   z-index: 99;
   text-decoration: none;
`

export default Rebase