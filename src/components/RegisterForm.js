import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Alert,
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  Panel
} from 'react-bootstrap'

import { register } from '../actions'

class RegisterForm extends Component {

  constructor (props) {
    super(props)

    this.state = {
      givenName: '',
      familyName: '',
      email: '',
      username: '',
      password: '',
      telephone: ''
    }

    this.handleChange = this._handleChange.bind(this)
    this.submitForm = this._submitForm.bind(this)

  }

  _handleChange(event) {
    this.setState({ [ event.target.name ]: event.target.value })
  }
  _submitForm(e) {
    e.preventDefault()
    this.props.register(this.state)
  }

  render() {

    const { authenticationRequest: { loading, success, error },
      history
    } = this.props
    const props = loading ? { disabled: true } : {}

    if (success) {
      return (
        <Redirect to={{ pathname: '/checkout' }} />
      )
    }

    return (
      <Panel>
        <form onSubmit={ this.submitForm }>
          <FormGroup>
            <ControlLabel>First Name</ControlLabel>
            <FormControl name="givenName" type="givenName" placeholder="Karl"
              onChange={ this.handleChange }  />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl name="familyName" type="familyName" placeholder="Marx"
              onChange={ this.handleChange }  />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email" type="email" placeholder="test@coopcycle.org"
              onChange={ this.handleChange }  />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Phone Number</ControlLabel>
            <FormControl name="telephone" type="phoneNumber" placeholder="+33699887766"
              onChange={ this.handleChange }  />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Nom d'utilisateur</ControlLabel>
            <FormControl name="username" type="text" placeholder="test"
              onChange={ this.handleChange }  />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Mot de passe</ControlLabel>
            <FormControl name="password" type="password"
              onChange={ this.handleChange } />
          </FormGroup>
          <FormGroup>
            <Button { ...props } bsStyle="primary" bsSize="large" type="submit" block>
              { loading ? 'Chargement...' : 'Enregistrement' }
            </Button>
          </FormGroup>
          { error ? <Alert bsStyle="danger">Unable to log in</Alert> : ''}
          <hr />
          <p className="text-center">
            Déjà enregistré ? <a href="#"
              onClick={ (e) => { e.preventDefault(); history.push('/login') } } >
              Connectez-vous.
            </a>
          </p>
        </form>
      </Panel>
    )
  }
}

export default compose(
  withRouter,
  connect(({ authenticationRequest }) => ({ authenticationRequest }),
  { register })
)(RegisterForm)
