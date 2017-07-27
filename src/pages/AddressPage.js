import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { AddressPicker, Navbar, Breadcrumb } from '../components'

export default () => {
  return (
    <Grid fluid>
      <Navbar />
      <Breadcrumb step={1} />
      <Row>
        <Col md={8} mdOffset={2}>
          <AddressPicker />
        </Col>
      </Row>
    </Grid>
  )
}