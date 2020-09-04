import React from 'react'
import styled from 'styled-components'


interface CardProps {
  bgColor?: string,
  color?:string
}
const Card: React.FC<CardProps> = ({ children,bgColor,color }) => {
  return (
    <StyledCard bgColor={bgColor} color={color}>
    {children}
    </StyledCard>
  )
}

interface StyledCardProps {
  bgColor?: string,
  color?:string
}
const StyledCard = styled.div<StyledCardProps>`
  border-radius: 10px;
  display: flex;
  background: ${props=>props.bgColor || '#fff'};
  color: ${props=>props.color || '#212121'};
  flex: 1;
  flex-direction: column;
`

export default Card