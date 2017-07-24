import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { LoginForm, Navbar } from '../components'

const AuthPage = () => {
  return (
    <Grid>
      <Navbar />
      <Row>
        <Col md={4} mdOffset={4}>
          <LoginForm />
        </Col>
      </Row>
    </Grid>
  )
}

export default AuthPage