import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { CreditCardForm, Navbar } from '../components'
import { Elements } from 'react-stripe-elements';

const PaymentPage = () => {
  return (
    <Grid>
      <Navbar step={3} />
      <Row>
        <Col md={8} mdOffset={2}>
          <Elements>
            <CreditCardForm />
          </Elements>
        </Col>
      </Row>
    </Grid>
  )
}

export default PaymentPage
