import React, { Component } from 'react'
import { ControlLabel,
  FormControl,
  FormGroup,
  Panel
} from 'react-bootstrap'
import { connect } from 'react-redux'

import { completeAddress } from '../actions'

class Address extends Component {
  constructor () {
    super ()
    this.handleChange = this._handleChange.bind(this)
  }

  _handleChange (event) {
    this.props.completeAddress({ [ event.target.name ]: event.target.value })
  }
  
  render() {
    const { cartAddress } = this.props
    const title = (
      <h3>Livraison</h3>
    )
    return (
      <Panel header={ title }>
        { cartAddress ? cartAddress.streetAddress : '' }
        <hr />
        <FormGroup>
          <ControlLabel>Additional Information (digicode, etc...)</ControlLabel>
          <FormControl name="description" type="description"
            onChange={ this.handleChange.bind(this) } />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Floor</ControlLabel>
          <FormControl name="floor" type="floor"
            onChange={ this.handleChange } />
        </FormGroup>
      </Panel>
    )
  }
}

export default connect(({ cartAddress }) => ({ cartAddress }),
  { completeAddress })(Address)
