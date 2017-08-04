import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap';
import { Menu, Navbar, Breadcrumb, Cart } from '../components'

const MenuPage = ({ cartAddress }) => {

  if (!cartAddress) {
    return (
      <Redirect to={{ pathname: '/' }} />
    )
  }

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

function mapStateToProps(state, props) {
  return {
    cartAddress: state.cartAddress,
  };
}

export default withRouter(connect(mapStateToProps)(MenuPage))
