import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">Home</StyledLink>
      <StyledLink exact activeClassName="active" to="/farms">Farms</StyledLink>
      <StyledHref>
         <a href="https://medium.com/@teafarmer_alex/announcing-tea-finance-6dccb71b8912?sk=bf7f34f5b809accba2390a54824b0171" target='_blank'>About</a>
      </StyledHref>
      {/* <StyledLink exact activeClassName="active" to="/faq">FAQ</StyledLink> */}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.color.black};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[500]};
  }
  &.active {
    color: ${props => props.theme.color.primary.main};
  }
`
const StyledHref = styled.span`
  a{
    color: ${props => props.theme.color.black};
    font-weight: 700;
    padding-left: ${props => props.theme.spacing[3]}px;
    padding-right: ${props => props.theme.spacing[3]}px;
    text-decoration: none;
    &:hover {
      color: ${props => props.theme.color.grey[500]};
    }
    &.active {
      color: ${props => props.theme.color.primary.main};
    }
  }
`
export default Nav