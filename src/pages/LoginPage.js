import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { LoginForm, Navbar, Breadcrumb } from '../components'

const LoginPage = () => {
  return (
    <Grid fluid>
      <Navbar step={2} />
      <Breadcrumb step={3} />
      <Row>
        <Col md={6} mdOffset={3}>
          <LoginForm />
        </Col>
      </Row>
    </Grid>
  )
}

export default LoginPage