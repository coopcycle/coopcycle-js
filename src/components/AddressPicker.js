import React, { Component } from 'react';
import { Panel, FormGroup, Radio, Alert, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import _ from 'lodash';
import { withRouter } from 'react-router-dom'
import { pickAddress } from '../actions'

class AddressPicker extends Component {

  constructor(props) {
    super(props);
  }

  onAddressClick(e) {
    this.props.actions.pickAddress(e.target.value)
  }

  renderAddressItems() {
    return (
      <FormGroup>
      { this.props.addresses.map((item) =>
        <Radio key={ item['@id'] }
          name="address"
          value={ item['@id'] }
          onClick={ this.onAddressClick.bind(this) }
          defaultChecked={ item['@id'] === this.props.cartAddress }>
          { item.streetAddress }
        </Radio>
      ) }
      </FormGroup>
    )
  }

  render() {

    const title = (
      <h3>Adresses</h3>
    );

    return (
      <Panel className="addresses" header={title}>
        { this.props.addresses.length > 0 ? this.renderAddressItems(): (
          <Alert bsStyle="warning">Aucune adresse</Alert>
        ) }
        <Button bsStyle="primary" block onClick={ () => this.props.history.push('/payment') }>Payer la commande</Button>
      </Panel>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    cartAddress: state.cartAddress,
    addresses: state.user ? state.user.addresses : [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ pickAddress }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressPicker))
