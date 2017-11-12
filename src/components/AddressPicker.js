import React, { Component } from 'react';
import { Panel, FormGroup, ControlLabel, FormControl, Radio, Alert, Button, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByPlaceId } from 'react-places-autocomplete'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import _ from 'lodash';
import { withRouter, Redirect } from 'react-router-dom'
import { toggleAddressForm, pickAddress, createAddress, checkDistance } from '../actions'

const inputMap = {
  postal_code: 'postalCode',
  locality: 'addressLocality'
};

const autocompleteOptions = {
  types: ['address'],
  componentRestrictions: {
    country: "fr"
  }
}

const autocompleteStyles = {
  autocompleteContainer: {
    zIndex: 1
  }
}

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
      placeId: null,
      success: false
    }
  }

  onAddressClick(address, e) {
    this.props.actions.pickAddress(address)
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

          let address = {
            streetAddress,
            geo: { latitude, longitude }
          }
          for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            var value = place.address_components[i].long_name;
            if (inputMap.hasOwnProperty(addressType)) {
              address[inputMap[addressType]] = value;
            }
          }

          this.props.actions.pickAddress(address)
        }
      })
      .catch(error => console.error(error))
  }

  getStreetAddress(cartAddress) {
    if (cartAddress) {
      const isNewAddress = !cartAddress.hasOwnProperty('@id')

      return isNewAddress ? cartAddress.streetAddress : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { cartAddress } = nextProps;

    const isRequestFinished = this.props.checkDistanceRequest.loading && !nextProps.checkDistanceRequest.loading
    const success = isRequestFinished && nextProps.checkDistanceRequest.success

    const newState = { success };

    const streetAddress = this.getStreetAddress(cartAddress);
    if (streetAddress) {
      Object.assign(newState, { streetAddress });
    }
    this.setState(newState);
  }

  componentDidMount() {
    const { cartAddress } = this.props;

    const newState = { success: false }

    const streetAddress = this.getStreetAddress(cartAddress);
    if (streetAddress) {
      Object.assign(newState, { streetAddress })
    }
    this.setState(newState)
  }

  renderAddressForm() {

    const { cartAddress } = this.props;
    const { streetAddress } = this.state;
    const isNewAddress = cartAddress && !cartAddress.hasOwnProperty('@id');

    const inputProps = {
      placeholder: 'Entrez votre adresse',
      value: streetAddress,
      onChange: (streetAddress) => this.setState({ streetAddress }),
      autoComplete: "false",
    }

    const cssClasses = {
      input: 'form-control',
    }

    return (
      <FormGroup validationState={ cartAddress && isNewAddress ? 'success' : null }>
        <ControlLabel>Entrez votre adresse de livraison</ControlLabel>
        <PlacesAutocomplete
          inputProps={ inputProps }
          classNames={ cssClasses }
          options={ autocompleteOptions }
          onSelect={ this.onAddressSelect.bind(this) }
          styles={ autocompleteStyles } />
        <FormControl.Feedback />
      </FormGroup>
    )
  }

  renderAddressItems() {
    return (
      <ListGroup>
        { this.props.addresses.map((item) => {
          const isActive = this.props.cartAddress && this.props.cartAddress['@id'] === item['@id']
          return (
            <ListGroupItem key={ item['@id'] }
              name="address"
              value={ item['@id'] }
              onClick={ this.onAddressClick.bind(this, item) }>
              <span className={ isActive ? 'text-success' : '' }>{ item.streetAddress }</span>
              { isActive &&
              <Glyphicon className="pull-right text-success" glyph="ok" /> }
            </ListGroupItem>
          )
        } ) }
      </ListGroup>
    )
  }

  render() {

    const { loading, error } = this.props.checkDistanceRequest;
    const { success } = this.state;

    const disabled = !this.props.cartAddress || loading;
    const buttonText = loading ? 'Vérification…' : 'Continuer'

    if (success) {
      return (
        <Redirect to={{ pathname: '/menu' }} />
      )
    }

    return (
      <Panel>
        { this.renderAddressForm() }
        <FormGroup>
          <ControlLabel className="text-muted">Vos adresses sauvegardées</ControlLabel>
          { this.props.addresses.length === 0 ? ( <Alert bsStyle="warning">Aucune adresse</Alert> ) : this.renderAddressItems() }
        </FormGroup>
        { (error && !loading) && (
          <Alert bsStyle="danger">Désolé, nous n'assurons pas les livraisons à cette adresse (3km maximum)</Alert>
        ) }
        <hr />
        <Button block disabled={ disabled } bsStyle="primary" bsSize="large" onClick={ () => this.props.actions.checkDistance() }>
          { buttonText }
        </Button>
      </Panel>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    cartAddress: state.cartAddress,
    addresses: state.user ? state.user.addresses : [],
    checkDistanceRequest: state.checkDistanceRequest
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ toggleAddressForm, pickAddress, createAddress, checkDistance }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressPicker))
