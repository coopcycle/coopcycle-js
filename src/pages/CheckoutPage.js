import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Cart, AddressPicker, Navbar } from '../components'

const CheckoutPage = () => {
  return (
    <Grid>
      <Navbar step={3} />
      <Row>
        <Col md={8} mdOffset={2}>
          <Cart readonly />
          <hr />
          <AddressPicker />
        </Col>
      </Row>
    </Grid>
  )
}

export default CheckoutPage