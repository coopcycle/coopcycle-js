import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import _ from 'lodash'
import { disconnect, closeModal } from '../actions'

const navbarStyle = {
  marginLeft    : '-15px',
  marginRight   : '-15px',
  borderRadius  : 0
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

    const isAuthenticated = !!this.props.user

    return (
      <Navbar fluid style={ navbarStyle }>
        <Navbar.Header>
          <Navbar.Brand>
            <a>Restaurant</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem>Livraison : <strong>{ this.props.cartAddress && this.props.cartAddress.streetAddress }</strong></NavItem>
            { this.props.cartAddress &&
            <NavItem onClick={ () => this.props.history.push('/') }>Modifier</NavItem> }
          </Nav>
          <Nav pullRight>
            <NavItem><strong>Total</strong>  { this.props.total } €</NavItem>
            <NavItem href="#">{ isAuthenticated ? this.props.user.username : "Vous n'êtes pas connecté" }</NavItem>
            { isAuthenticated && <NavItem onClick={ this.onClickDisconnect.bind(this) }>Déconnexion</NavItem> }
            <NavItem>
              <button type="button" className="close" aria-label="Close"
                style={{ float: 'none' }}
                onClick={ this.onClickClose.bind(this) }>
                <span aria-hidden="true">&times;</span>
              </button>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps(state, props) {

  const total = _.sumBy(state.cartItems, (item) => item.product.price * item.quantity).toFixed(2);

  return {
    user: state.user,
    cartAddress: state.cartAddress,
    total,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ disconnect, closeModal }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar_))
