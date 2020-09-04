import React from 'react'
import styled from 'styled-components'

import Card from '../../components/Card'
import CardContent from '../../components/CardContent'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'

const FAQ: React.FC = () => {
  return (
    <Page>
      <PageHeader icon="❓" title="About Tea" />
      <Container>
        <Card>
          <CardContent>
            <StyledParagraph>
            <p>Please see below for the most up to date information regarding the future of the Tea protocol. As has always been our intention, the community will be in control of future decision making. The migration from Teav1 to Teav2 is the first step in this process; from there, Teav2 tokenholders will signal their desired path forward on community proposals.</p>
            </StyledParagraph>
            <StyledPanle>
              <StyledHeading>1. How will the migration process work?</StyledHeading>
              <StyledList>
                <StyledListItem>A new Teav2 ERC-20 token will be created. This will be a standard ERC-20 token with no rebases to serve as placeholder while Teav3 is audited.</StyledListItem>
                <StyledListItem>A migration contract will be audited and deployed as soon as possible. We are in discussions with multiple auditors.</StyledListItem>
                <StyledListItem>All Teav1 holders can burn Teav1 to mint Teav2 via a migration contract.</StyledListItem>
                <StyledListItem>The number of Teav2 tokens received will be based upon Teav1 balanceOfUnderlying, which remains constant regardless of rebases.</StyledListItem>
                <StyledListItem>The migration contract will have a deadline that will be a minimum of 48 hours after deployment and a maximum of 72 hours after deployment. Following the deadline, migration will be impossible and Teav1 tokens will no longer be able to migrate to Teav2.</StyledListItem>
              </StyledList>
            </StyledPanle>
            <StyledPanle>
            <StyledHeading>2. How will the Teav3 protocol relaunch work?</StyledHeading>
            <StyledList>
              <StyledListItem>Teav3 will be a fully audited version of the Tea protocol.</StyledListItem>
              <StyledListItem>There will be a mechanism that allows for Teav2 to be converted to Teav3. The details of this mechanism will be subject to a vote.</StyledListItem>
            </StyledList>
            </StyledPanle>
            <StyledPanle>
            <StyledHeading>3.How will delegators be rewarded?</StyledHeading>
            <StyledList>
              <StyledListItem>Members of the community will submit proposals to reward those who delegated votes to help save Tea.These proposals will be subject to tokenholder approval.</StyledListItem>
              <StyledListItem>You can view snapshotted votes at the time of governance proposal <a href="https://raw.githubusercontent.com/Tea-finance/Tea-protocol/master/Tea_delegator_snapshot_10650187_draft.json" style={{color:'#0773FC'}}>here.</a></StyledListItem>
            </StyledList>
            </StyledPanle>
            <StyledPanle>
            <StyledHeading>4. Can I continue to farm Teav1?</StyledHeading>
            <StyledList>
              <StyledListItem>The staking contracts continue to function.</StyledListItem>
              <StyledListItem>Providing liquidity to the Tea/yCRV Uniswap pool is extremely risky due to the bug in the Tea rebase functionality. A positive rebase will buy yCRV and send it to the frozen reserves contract.</StyledListItem>
            </StyledList>
            </StyledPanle>
            <StyledPanle>
            <StyledHeading>5. What are the official Tea token addresses?</StyledHeading>
            <StyledList>
              <StyledListItem>Teav1: 0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16</StyledListItem>
              <StyledListItem>Teav2: TBD</StyledListItem>
              <StyledListItem>Teav3: TBD</StyledListItem>
            </StyledList>
            </StyledPanle>
          </CardContent>
        </Card>
      </Container>

      <StyledLinkBox>
              <a href="https://twitter.com/tea_finance" target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>Twitter</a>
              <a href="https://t.me/joinchat/UDqHJhQ-7QlYv-Bn0rZzRQ" target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>Telegram</a>
              <a href="https://github.com/teafinance/tea-protocol" target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>GitHub</a>
              <a href='https://etherscan.io/token/0x504fa07ad26bf82455bc67653e8aadb19d25fee3' target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>Smart Contract</a>
              <a href='https://uniswap.info/pair/0x206682199b4e7e52c0663b29c82c192ddd1c82da' target="_blank" style={{color:'#757E94',fontSize:'14px',margin:'0 30px 0 0'}}>Uniswap TEA-yCRV</a>
      </StyledLinkBox>
    </Page>
  )
}

const StyledHeading = styled.h2`
  margin-bottom: 0;
  margin-top: -10px;
`
const StyledList = styled.ul`
  margin: 0;
  padding: 0 ${props => props.theme.spacing[6]}px;;
`
const StyledListItem = styled.li`
  margin-top: ${props => props.theme.spacing[3]}px;
  color: #757E94;
`

const StyledText = styled.p`
  font-style: italic;
  line-height: 2;
  text-indent: ${props => props.theme.spacing[4]}px;
`
const StyledPanle = styled.div`
  background:rgba(255,255,255,1);
  padding: 25px;
  border-radius:10px;
  margin-bottom: 20px;
  border:1px solid rgba(192,204,218,1);
`

const StyledParagraph = styled.div`
  width: 900px;
  margin: -20px auto 20px -100px;
`

const StyledLinkBox = styled.div`
    width: 100%;
    z-index: 99;
    text-align: center;
    line-height: 40px;
    a:hover{
      color: #02D3A3 !important;
    }
`

export default FAQ