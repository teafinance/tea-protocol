import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Countdown, { CountdownRenderProps} from 'react-countdown'

import Button from '../../../components/Button'
import Loader from '../../../components/Loader'

import useFarms from '../../../hooks/useFarms'

import { Farm } from '../../../contexts/Farms'

import { getPoolStartTime } from '../../../yamUtils'
import loadImg from '../../../assets/img/tea-loading.png'


const moneyFilter = (s:number, n:number) => {
    if (!s) return 0;
    n = n > 0 && n <= 20 ? n : 2;
    var str = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    let l = str.split(".")[0].split("").reverse(),
      r = str.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
  
    return (t.split("").reverse().join("") + "." + r).replace(/\.00$/, '');
  }


const FarmCards: React.FC = () => {
  const [farms] = useFarms()

  const rows = farms.reduce<Farm[][]>((farmRows, farm) => {
    const newFarmRows = [...farmRows]
    if (newFarmRows[newFarmRows.length - 1].length === 3) {
      newFarmRows.push([farm])
    } else {
      newFarmRows[newFarmRows.length - 1].push(farm)
    }
    return newFarmRows
  }, [[]])

  const allFarmRows:any[] = []
  
    rows.map((farmRow,i)=>{
        farmRow.map((farm)=>{
            if(farm.depositToken.toUpperCase()=='TEA_YCRV_UNI_LP'){
                allFarmRows.push(farm)
            }
        })
    })
  return (
    <StyledCards>
        <table style={{border:0,width:'100%'}} cellSpacing='0' cellPadding='0'>
        <StyledTbody>
            <StyledThead>
                <td>Staking Token</td>
                <td>Staking $ in Pool</td>
                <td>Distributed / Total TEA</td>
                <td>Return (Daily/Annualized)</td>
                <td>Stake to earn TEA</td>
            </StyledThead>
       </StyledTbody>
      {!!rows[0].length ?   
        (<StyledTbody>
          {allFarmRows.map((farm, j) => (   
            <React.Fragment key={j}>
              <StyledSpacer/>
              <FarmCard farm={farm} />
            </React.Fragment>
          ))}
        </StyledTbody> 
      ) : (
        <StyledTbody>
            <tr>
                <td colSpan={5} style={{textAlign:'center'}}>
                    <StyledLoading>
                      <img src={loadImg} height="50" width="50" />
                    </StyledLoading>
                </td>
           </tr>
        </StyledTbody>
        )}
         
        </table>
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: Farm,
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const [startTime, setStartTime] = useState(0)

  const getStartTime = useCallback(async () => {
    const startTime = await getPoolStartTime(farm.contract)
    setStartTime(startTime)
  }, [farm, setStartTime])

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>{paddedHours}:{paddedMinutes}:{paddedSeconds}</span>
    )
  }

  useEffect(() => {
    if (farm && farm.id === 'ycrv_yam_uni_lp') {
      getStartTime()
    }
  }, [farm, getStartTime])
  
  const poolActive = startTime * 1000 - Date.now() <= 0

  return (
    <StyledCardWrapper>  
            <StyleTdLeftRadius>
                <StyledImg>
                    <img style={{margin: '10px'}} src={require(`../../../assets/img/${[farm.depositToken.toUpperCase()]}.png`)} height="50" width="50" />
                    <span>{farm.depositToken.toUpperCase()}</span>
                </StyledImg>
                
            </StyleTdLeftRadius>
            <StyledTd>
                <StyledMoney>$ {moneyFilter(farm.staking,2)}</StyledMoney>
            </StyledTd>
            <StyledTd>
                {moneyFilter(farm.distributed,2)} ({moneyFilter((farm.distributed/farm.total)*100,2)}%) / {moneyFilter(farm.total,2)}
            </StyledTd>
            <StyledTd>
                {moneyFilter(farm.dailyReturn,2)}% / {moneyFilter(farm.annualizedReturn,2)}%
            </StyledTd>
            <StyleTdRightRadius>
             <StyledButton>
                <Button
                    labelColor="#fff"
                    size="sm"
                    variant="stake"
                    buttonWidth="130"
                    borderRadius="25"
                    disabled={!poolActive}
                    text={poolActive ? 'Stake now!' : undefined}
                    to={`/farms/${farm.id}`}
                >
                    {!poolActive && <Countdown date={new Date(startTime * 1000)} renderer={renderer} />}
                </Button>
                </StyledButton>
            </StyleTdRightRadius>

    </StyledCardWrapper>
  )
}




const StyledCards = styled.div`
  width: 1100px;
  margin: 0 auto;
  border: none;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledTbody =  styled.tbody`
  width: 100%;
`

const StyledThead = styled.tr`
  background: none;
  border: none;
`


const StyledTd = styled.td`
  background: #fff;
  border-color: #fff;
  line-height: 70px;
`

const StyleTdLeftRadius = styled.td`
   border-radius: 10px 0 0 10px;
   background: #fff;
   line-height: 70px;
`

const StyleTdRightRadius = styled.td`
   border-radius: 0 10px 10px 0;
   background: #fff;
   line-height: 70px;
`


const StyledLoading = styled.div`
  padding: 30px 0;
  display: inline-block;
  animation: rotate 1s linear infinite;
  @keyframes rotate{
    from{transform: rotate(0deg)}
    to{transform: rotate(360deg)}
  }
`
const StyledCardWrapper = styled.tr`
    width: 100%;
`

const StyledTitle = styled.h4`
  color: ${props => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${props => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledMoney = styled.div`
  color: #0773FC;
  font-size: 16px;
`

const StyledSpacer = styled.tr`
  height: 10px;
  width: 2px;
`

const StyledButton = styled.div`
`

const StyledImg = styled.div`
  display: flex;
  margin-left: 10px;
`

export default FarmCards
