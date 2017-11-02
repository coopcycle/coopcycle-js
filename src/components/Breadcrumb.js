import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Navbar, Nav, NavItem, Breadcrumb } from 'react-bootstrap';
import { disconnect } from '../actions'

class Breadcrumb_ extends Component {

  onClickItem(step, path) {
    if (this.props.step > step) {
      this.props.history.push(path);
    }
  }

  render() {
    const isAuthenticated = !!this.props.user

    return (
      <Breadcrumb>
        <Breadcrumb.Item onClick={ () => this.props.history.push('/') }>
          Adresse
        </Breadcrumb.Item>
        <Breadcrumb.Item active={ this.props.step < 2 } onClick={ e => this.onClickItem(2, '/menu') }>
          Panier
        </Breadcrumb.Item>
        <Breadcrumb.Item active={ this.props.step < 3 } className="hidden-sm hidden-xs">
          Connexion
        </Breadcrumb.Item>
        <Breadcrumb.Item active={ this.props.step < 4 }>
          Paiement
        </Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
  };
}

export default withRouter(connect(mapStateToProps)(Breadcrumb_))
