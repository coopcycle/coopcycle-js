import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AddressPicker, Navbar, Breadcrumb } from '../components';

const AddressPage = ({ history, user }) => {
  return (
    <Grid fluid>
      <Navbar />
      <Breadcrumb step={1} />
      <Row>
        <Col md={8} mdOffset={2}>
          <AddressPicker />
          { !user && (
            <p className="text-center">
              <a href="#" className="text-muted" onClick={ e => {
                e.preventDefault()
                history.push('/login')
              }}>Vous avez déjà un compte ? Connectez-vous.</a>
            </p>
          ) }
        </Col>
      </Row>
    </Grid>
  )
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
  };
}

export default withRouter(connect(mapStateToProps)(AddressPage))