import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Grid, Glyphicon } from 'react-bootstrap';
import { Menu, MenuSections, Navbar, Breadcrumb, Cart } from '../components';

const rowStyle = {
  display: 'flex'
}

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
      <div style={ rowStyle }>
        <div style={{ flex: 1 }}>
          <h4>Menu</h4>
          <MenuSections />
          <h4>Horaires</h4>
          { openingHours.map((openingHour) =>
            <div key={ openingHour }>
              <Glyphicon glyph="time" />
              <span className="text-muted" style={{ marginLeft: '5px' }}>{ openingHour }</span>
            </div>
          ) }
        </div>
        <div style={{ flex: 3, padding: '0 15px' }}>
          <Menu />
        </div>
        <div style={{ flex: 2 }}>
          <Cart />
        </div>
      </div>
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
