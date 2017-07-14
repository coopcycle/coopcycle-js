import React, { Component } from 'react';
import { Panel, FormGroup, Radio, Alert, Button, ControlLabel, FormControl, Row, Col } from 'react-bootstrap';
import { CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { finalizeOrder } from '../actions'

const cardElementStyle = {
  base: {
    color: '#32325d',
    lineHeight: '24px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
}

class CreditCardForm extends Component {

  handleSubmit(e) {
    // We don't want to let default form submission happen here, which would refresh the page.
    e.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({ type: 'card' }).then(({ token, error }) => {

      console.log('Received Stripe token:', token, error);

      if (error) {
        console.log(error);
        return
      }

      this.props.actions.finalizeOrder(token);

    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  render() {

    const { loading, success, error } = this.props.createOrderRequest;

    if (success) {
      return (
        <Redirect to={{ pathname: '/confirm' }} />
      )
    }

    return (
      <Panel>
        <form onSubmit={ this.handleSubmit.bind(this) }>
          <FormGroup>
            <ControlLabel>Numéro de carte</ControlLabel>
            <CardElement hidePostalCode style={ cardElementStyle } />
          </FormGroup>
          <Button disabled={ loading } type="submit" block bsStyle="primary">Payer { this.props.total } €</Button>
        </form>
      </Panel>
    )
  }
}

function mapStateToProps(state, props) {

  const cartItems = state.cartItems;
  const total = _.sumBy(cartItems, (item) => item.product.price * item.quantity).toFixed(2);

  return {
    restaurantId: state.restaurantId,
    cartItems: cartItems,
    cartAddress: state.cartAddress,
    total: total,
    createOrderRequest: state.createOrderRequest
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ finalizeOrder }, dispatch)
  }
}

export default withRouter(injectStripe(connect(mapStateToProps, mapDispatchToProps)(CreditCardForm)))
