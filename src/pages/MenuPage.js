import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Menu, Navbar, Cart } from '../components'

const MenuPage = () => {
  return (
    <Grid>
      <Navbar step={1} />
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