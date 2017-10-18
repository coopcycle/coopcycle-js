import React, { Component } from 'react'
import { ControlLabel,
  FormControl,
  FormGroup,
  Panel
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Address extends Component {
  handleChange(event) {
    this.setState({ [ event.target.name ]: event.target.value });
  }
  render() {
    const title = (
      <h3>Livraison</h3>
    );
    return (
      <Panel header={ title }>
        { this.props.cartAddress ? this.props.cartAddress.streetAddress : '' }
        <FormGroup>
          <ControlLabel>Additional Information (digicode, etc...)</ControlLabel>
          <FormControl name="description" type="description"
            onChange={ this.handleChange.bind(this) } />
        </FormGroup>
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
