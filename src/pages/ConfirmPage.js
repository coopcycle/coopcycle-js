import React, { Component } from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap';

const ConfirmPage = () => {
  return (
    <Grid fluid>
      <Row>
        <Col md={8} mdOffset={2}>
          <Alert bsStyle="success">Votre commande est validée !</Alert>
        </Col>
      </Row>
    </Grid>
  )
}

export default ConfirmPage