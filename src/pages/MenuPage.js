import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Grid, Glyphicon, Row, Col } from 'react-bootstrap';
import { Menu, MenuSections, Navbar, Breadcrumb, Cart } from '../components';

const MenuPage = ({ cartAddress, openingHours }) => {

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
        <Col md={3}>
          <div className="margin-bottom-md">
            <h4>Horaires</h4>
            { openingHours.map((openingHour) =>
              <div key={ openingHour }>
                <Glyphicon glyph="time" />
                <span className="text-muted" style={{ marginLeft: '5px' }}>{ openingHour }</span>
              </div>
            ) }
          </div>
          <h4 className="hidden-xs hidden-sm">Menu</h4>
          <MenuSections />
        </Col>
        <Col md={6}>
          <Menu />
        </Col>
        <Col md={3}>
          <Cart />
        </Col>
      </Row>
    </Grid>
  )
}

function mapStateToProps(state, props) {
  return {
    cartAddress: state.cartAddress,
    openingHours: state.restaurant ? state.restaurant.openingHours : []
  };
}

export default withRouter(connect(mapStateToProps)(MenuPage))
