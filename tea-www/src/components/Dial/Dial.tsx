import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

interface DialProps {
  children?: React.ReactNode,
  disabled?: boolean,
  size?: number,
  value: number
}

const Dial: React.FC<DialProps> = ({ children, disabled, size = 256, value }) => {
  const { color } = useContext(ThemeContext)

  return (
    <StyledDial size={size}>
      <StyledOuter>
        <CircularProgressbar
          value={value}
          styles={buildStyles({
            strokeLinecap: 'round',
            pathColor: !disabled ? color.secondary.main : color.black,
            pathTransitionDuration: 1,
          })}
        />
      </StyledOuter>
      <StyledInner size={size}>
        {children}
      </StyledInner>
    </StyledDial>
  )
}

interface StyledInnerProps {
  size: number
}

const StyledDial = styled.div<StyledInnerProps>`
  padding: 24px;
  position: relative;
  margin: 0 auto;
  z-index: 9;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`

const StyledInner = styled.div<StyledInnerProps>`
  align-items: center;
  background-color: #fff;
  border-radius: ${props => props.size}px;
  display: flex;
  justify-content: center;
  position: relative;
  box-shadow:0px 0px 12px 0px rgba(2,211,163,0.1);
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`

const StyledOuter = styled.div`
  background-color: #F1F3F8;
  border-radius: 10000px;
  box-shadow:0px 0px 12px 0px rgba(2,211,163,0.1);
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
`

export default Dial