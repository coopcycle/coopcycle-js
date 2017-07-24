import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Menu, MenuSections, Cart } from '../components'

const MenuPage = () => {
  return (
    <Grid>
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