import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem, Alert, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import _ from 'lodash';
import { withRouter } from 'react-router-dom'
import { removeFromCart } from '../actions'
import { cartTotal } from '../utils'
import DatePicker from './DatePicker'

class Cart extends Component {

  constructor(props) {
    super(props)

    this.state = {
      toggled: false
    }

    this.onButtonClick = this.onButtonClick.bind(this)
    this.onHeaderClick = this.onHeaderClick.bind(this)
  }

  onHeaderClick () {
    this.setState({'toggled': !this.state.toggled })
  }

  onButtonClick () {
    this.props.history.push(this.props.isAuthenticated ? '/checkout' : '/login')
  }

  displayModifiers (modifiers) {
    return _.map(_.values(modifiers), (value) => {
      return value.name;
    }, '').join(', ');
  }

  renderCartItems() {
    return (
      <ListGroup>
      { this.props.cartItems.map((item, key) =>
        <ListGroupItem key={ key }>
          { item.menuItem.name }
          <span className="quantity text-muted">×{ item.quantity }</span>
          <button type="button" className="close pull-right" aria-label="Close"
            onClick={ () => this.props.actions.removeFromCart(item) }>
            <span aria-hidden="true">×</span>
          </button>
          <br />
          <span>{ this.displayModifiers(item.selectedModifiers) }</span>
        </ListGroupItem>
      ) }
      </ListGroup>
    )
  }

  renderButton() {
    const buttonDisabled = this.props.cartItems.length === 0;

    return (
      <Button disabled={ buttonDisabled } bsStyle="primary" bsSize="large" block onClick={ this.onButtonClick }>Commander</Button>
    )
  }

  render() {
    const { toggled } = this.state

    var panelClasses = ['panel', 'panel-default', 'cart-wrapper']
    if (toggled) {
      panelClasses.push('cart-wrapper--show')
    }

    return (
      <div className={ panelClasses.join(' ') }>
        <div className="panel-heading cart-heading" onClick={ this.onHeaderClick }>
          <span className="cart-heading--items">2</span>
          <span className="cart-heading--total"><i className={ toggled ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down"}></i></span>
          Ma commande
        </div>
        <div className="panel-body">
          {
            !this.props.noDatePicker && (<div><DatePicker /><hr/></div>)
          }
          { this.props.cartItems.length > 0 ? this.renderCartItems(): (
            <Alert bsStyle="warning">Votre panier est vide</Alert>
          ) }
          <hr />
          <p>
            <strong>Total : { this.props.total } €</strong>
          </p>
          { !this.props.readonly && this.renderButton() }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    cartItems: state.cartItems,
    total: cartTotal(state.cartItems),
    isAuthenticated: !!state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ removeFromCart }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
