import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { LoginForm, Navbar } from '../components'

const LoginPage = () => {
  return (
    <Grid>
      <Navbar step={2} />
      <Row>
        <Col md={6} mdOffset={3}>
          <LoginForm />
        </Col>
      </Row>
    </Grid>
  )
}

export default LoginPage