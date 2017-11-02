import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import _ from 'lodash'
import { disconnect, closeModal } from '../actions'
import { cartTotal } from '../utils'

import applicolisLogo from '../../assets/applicolis-logo.png'
import coopCycleLogo from '../../assets/coopcycle-logo.png'

const navbarStyle = {
  marginLeft    : '-15px',
  marginRight   : '-15px',
  borderRadius  : 0,
  position: 'relative'
}

const closeStyle = {
  position: 'absolute',
  top: 0,
  right: '4px'
}

class Navbar_ extends Component {

  onClickDisconnect() {
    this.props.actions.disconnect()
  }

  onClickClose(e) {
    e.preventDefault();
    this.props.actions.closeModal();
  }

  render() {

    const isAuthenticated = !!this.props.user;

    return (
      <Navbar inverse fluid style={ navbarStyle }>
        <Navbar.Header>
          <Navbar.Brand>
            <a>{ this.props.restaurantName }</a>
          </Navbar.Brand>
        </Navbar.Header>
        <NavItem style={ closeStyle }>
          <button type="button" className="close" aria-label="Close"
                  onClick={ this.onClickClose.bind(this) }>
            <span aria-hidden="true">&times;</span>
          </button>
        </NavItem>
        <Navbar.Collapse>
          <Nav className="brands">
            <NavItem><img src={ applicolisLogo } /></NavItem>
          </Nav>
          <Nav>
            <NavItem>+</NavItem>
          </Nav>
          <Nav className="brands">
            <NavItem><img src={ coopCycleLogo } />  <span className="coopcycle-brand">CoopCycle</span></NavItem>
          </Nav>
          <Nav>
            <NavItem>Livraison : <strong>{ this.props.cartAddress && this.props.cartAddress.streetAddress }</strong></NavItem>
            { this.props.cartAddress &&
              this.props.history.location.pathname !== '/' &&
            <NavItem onClick={ () => this.props.history.push('/') }><Glyphicon glyph="pencil" /></NavItem> }
          </Nav>
          <Nav pullRight>
            <NavItem><strong>Total</strong>  { this.props.total } €</NavItem>
            <NavItem href="#">{ isAuthenticated ? this.props.user.username : "Vous n'êtes pas connecté" }</NavItem>
            { isAuthenticated && <NavItem onClick={ this.onClickDisconnect.bind(this) }>Déconnexion</NavItem> }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
    cartAddress: state.cartAddress,
    total: cartTotal(state.cartItems),
    restaurantName: state.restaurant ? state.restaurant.name : 'Restaurant'
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ disconnect, closeModal }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar_))
