import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'
import logotrello from '../../images/trello-logo-blue.png'
import styled from 'styled-components'

const NavbarBrands = styled(NavbarBrand)`
  float: left;
  padding: 15px;
  text-align: center;
  width: 100%;
`
class Header extends Component {
  render() {
    return (
      <div>
        <Navbar
          style={{ 'box-shadow': '5px 3px 28px -15px rgba(0,0,0,0.75)' }}
          color="white"
          light
          expand="md"
        >
          <NavbarBrands href="/">
            <img src={logotrello} width="90px" alt="trello" />
          </NavbarBrands>
        </Navbar>
      </div>
    )
  }
}

export default Header
