import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { RegisterForm, Navbar } from '../components'

const RegisterPage = () => {
  return (
    <Grid>
      <Navbar step={2} />
      <Row>
        <Col md={6} mdOffset={3}>
          <RegisterForm />
        </Col>
      </Row>
    </Grid>
  )
}

export default RegisterPage