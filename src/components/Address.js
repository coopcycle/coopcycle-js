import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Address extends Component {
  render() {
    const title = (
      <h3>Livraison</h3>
    );

    return (
      <Panel header={ title }>
        { this.props.cartAddress ? this.props.cartAddress.streetAddress : '' }
      </Panel>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    cartAddress: state.cartAddress,
  };
}

export default withRouter(connect(mapStateToProps)(Address))
