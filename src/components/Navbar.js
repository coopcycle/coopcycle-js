import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { disconnect } from '../actions'

class Navbar_ extends Component {

  onClickDisconnect() {
    this.props.actions.disconnect()
  }

  onClickBreadcrumb(step, path) {
    if (this.props.step > step) {
      this.props.history.push(path);
    }
  }

  render() {

    const isAuthenticated = !!this.props.user

    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a>Restaurant</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem
              onClick={ () => this.props.history.push('/') }>Panier</NavItem>
            <NavItem>›</NavItem>
            <NavItem style={{ opacity: this.props.step < 2 ? 0.5 : 1 }}
              onClick={ this.onClickBreadcrumb.bind(this, 3, '/checkout') }>Connexion</NavItem>
            <NavItem>›</NavItem>
            <NavItem style={{ opacity: this.props.step < 3 ? 0.5 : 1 }}
              onClick={ this.onClickBreadcrumb.bind(this, 3, '/checkout') }>Adresse</NavItem>
            <NavItem>›</NavItem>
            <NavItem style={{ opacity: this.props.step < 4 ? 0.5 : 1 }}>Paiement</NavItem>
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

  const total = _.sumBy(state.cartItems, (item) => item.product.price * item.quantity).toFixed(2);

  return {
    user: state.user,
    total
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ disconnect }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar_))
