import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Elements } from 'react-stripe-elements';
import { Cart, Address, Navbar, Breadcrumb, CreditCardForm } from '../components'

const CheckoutPage = () => {
  return (
    <Grid fluid>
      <Navbar />
      <Breadcrumb step={4} />
      <Row>
        <Col md={8} mdOffset={2}>
          <Cart readonly />
          <Address />
          <Elements>
            <CreditCardForm />
          </Elements>
        </Col>
      </Row>
    </Grid>
  )
}

export default CheckoutPage