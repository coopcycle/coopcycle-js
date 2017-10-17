import React, { Component } from 'react';
import { Panel, FormGroup, Radio, Alert, Button, ControlLabel, FormControl, Row, Col } from 'react-bootstrap';
import { CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { finalizeOrder } from '../actions'
import { cartTotal } from '../utils'

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

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    }
  }

  finalizeOrder() {
    this.setState({ errorMessage: '' })

    this.props.stripe.createToken({ type: 'card' }).then(({ token, error }) => {
      if (error) {
        this.setState({ errorMessage: error.message })
        return
      }

      this.props.actions.finalizeOrder(token);
    });
  }

  render() {

    const { loading, success, apiErrorMessage } = this.props.createOrderRequest;
    let errorMessage = apiErrorMessage || this.state.errorMessage;

    if (success) {
      return (
        <Redirect to={{ pathname: '/confirm' }} />
      )
    }

    const title = (
      <h3>Paiement</h3>
    );

    return (
      <div>
        <Panel header={ title }>
          { errorMessage && <Alert bsStyle="danger">{ errorMessage }</Alert> }
          <form onSubmit={ e => e.preventDefault() }>
            <FormGroup>
              <ControlLabel>Numéro de carte</ControlLabel>
              <CardElement hidePostalCode style={ cardElementStyle } />
            </FormGroup>
          </form>
        </Panel>
        <Button disabled={ loading } bsSize="large" type="submit" block bsStyle="primary" onClick={ this.finalizeOrder.bind(this) }>
          Payer { this.props.total } €
        </Button>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    cartItems: state.cartItems,
    cartAddress: state.cartAddress,
    total: cartTotal(state.cartItems),
    createOrderRequest: state.createOrderRequest
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ finalizeOrder }, dispatch)
  }
}

export default withRouter(injectStripe(connect(mapStateToProps, mapDispatchToProps)(CreditCardForm)))
