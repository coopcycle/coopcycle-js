import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { RegisterForm, Navbar, Breadcrumb } from '../components'

const RegisterPage = () => {
  return (
    <Grid fluid>
      <Navbar step={2} />
      <Breadcrumb step={3} />
      <Row>
        <Col md={6} mdOffset={3}>
          <RegisterForm />
        </Col>
      </Row>
    </Grid>
  )
}

export default RegisterPage