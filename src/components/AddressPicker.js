import React, { Component } from 'react';
import { Panel, FormGroup, ControlLabel, FormControl, Radio, Alert, Button } from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByPlaceId } from 'react-places-autocomplete'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import _ from 'lodash';
import { withRouter } from 'react-router-dom'
import { toggleAddressForm, pickAddress, createAddress } from '../actions'

const inputMap = {
  postal_code: 'postalCode',
  locality: 'addressLocality'
};

class AddressPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      streetAddress: '',
      postalCode: '',
      addressLocality: '',
      geo: {
        latitude: 0,
        longitude: 0
      },
      placeId: null
    }
  }

  onAddressClick(e) {
    this.props.actions.pickAddress(e.target.value)
  }

  toggleAddressForm() {
    this.props.actions.toggleAddressForm();
  }

  onAddressSelect(streetAddress, placeId) {
    this.setState({ streetAddress, placeId });

    geocodeByPlaceId(placeId)
      .then(results => {

        if (results.length > 0) {

          const place = results[0];

          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();

          let state = {
            geo: { latitude, longitude }
          }
          for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            var value = place.address_components[i].long_name;
            if (inputMap.hasOwnProperty(addressType)) {
              state[inputMap[addressType]] = value;
            }
          }

          this.setState(state);
        }
      })
      .catch(error => console.error(error))
  }

  onButtonClick() {
    const { streetAddress, geo, postalCode, addressLocality } = this.state;
    if (this.props.showAddressForm) {
      this.props.actions.createAddress(streetAddress, geo, postalCode, addressLocality);
    } else {
      this.props.history.push('/payment')
    }
  }

  renderAddressForm() {

    const { postalCode, addressLocality } = this.state;

    const inputProps = {
      placeholder: 'Entrez votre adresse',
      value: this.state.streetAddress,
      onChange: (streetAddress) => this.setState({ streetAddress }),
      autoComplete: false
    }

    const options = {
      types: ['address'],
      componentRestrictions: {
        country: "fr"
      }
    }

    const cssClasses = {
      input: 'form-control',
    }

    return (
      <form onSubmit={ null }>
        <hr />
        <FormGroup>
          <ControlLabel>Adresse</ControlLabel>
          <PlacesAutocomplete
            inputProps={ inputProps }
            classNames={ cssClasses }
            options={ options }
            onSelect={ this.onAddressSelect.bind(this) } />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Code postal</ControlLabel>
          <FormControl name="postalCode" type="text"
            onChange={ null }
            value={ postalCode } />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Ville</ControlLabel>
          <FormControl name="addressLocality" type="text"
            onChange={ null }
            value={ addressLocality } />
        </FormGroup>
      </form>
    )
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
        <p>Choisissez une adresse existante</p>
        { this.props.addresses.length > 0 ? this.renderAddressItems(): (
          <Alert bsStyle="warning">Aucune adresse</Alert>
        ) }
        <Button onClick={ this.toggleAddressForm.bind(this) }>
          { this.props.showAddressForm ? 'Annuler': 'Ajouter une adresse' }
        </Button>
        { this.props.showAddressForm && this.renderAddressForm() }
        <hr />
        <Button bsStyle="primary" block onClick={ this.onButtonClick.bind(this) }>
          { this.props.showAddressForm ? 'Créer cette adresse': 'Payer la commande' }
        </Button>
      </Panel>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    cartAddress: state.cartAddress,
    addresses: state.user ? state.user.addresses : [],
    showAddressForm: state.showAddressForm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ toggleAddressForm, pickAddress, createAddress }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressPicker))
