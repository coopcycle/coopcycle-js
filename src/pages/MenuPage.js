import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Menu, Navbar, Breadcrumb, Cart } from '../components'

const MenuPage = () => {
  return (
    <Grid fluid>
      <Navbar />
      <Breadcrumb step={2} />
      <Row>
        <Col md={8}>
          <Menu />
        </Col>
        <Col md={4}>
          <Cart />
        </Col>
      </Row>
    </Grid>
  )
}

export default MenuPage