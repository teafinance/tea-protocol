import React from 'react'
import styled from 'styled-components'

import farmer from '../../assets/img/logo.png'

const Logo: React.FC = () => {
  return (
    <StyledLogo>
      <img src={farmer} height="60" style={{ marginTop: -4 }} />
    </StyledLogo>
  )
}

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
`


export default Logo