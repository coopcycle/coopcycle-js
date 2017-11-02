import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Elements } from 'react-stripe-elements';
import { Cart, Address, Navbar, Breadcrumb, CreditCardForm } from '../components'

const CheckoutPage = ({ user, cartAddress }) => {

  if (!user || !cartAddress) {
    return (
      <Redirect to={{ pathname: '/' }} />
    )
  }

  return (
    <Grid fluid>
      <Navbar />
      <Breadcrumb step={4} />
      <Row className="hidden-xs hidden-sm">
        <Col md={8} mdOffset={2}>
          <Cart readonly />
        </Col>
      </Row>
      <Row>
        <Col md={8} mdOffset={2}>
          <Address />
          <Elements>
            <CreditCardForm />
          </Elements>
        </Col>
      </Row>
    </Grid>
  )
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
    cartAddress: state.cartAddress
  };
}

export default withRouter(connect(mapStateToProps)(CheckoutPage))
