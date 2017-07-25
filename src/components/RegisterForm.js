import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Alert, Panel, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { register } from '../actions'

class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    };
  }

  submitForm(e) {
    e.preventDefault();
    const { email, username, password } = this.state;
    this.props.actions.register(email, username, password);
  }

  handleChange(event) {
    this.setState({ [ event.target.name ]: event.target.value });
  }

  render() {

    const { loading, success, error } = this.props.authenticationRequest;
    const props = loading ? { disabled: true } : {}

    if (success) {
      return (
        <Redirect to={{ pathname: '/checkout' }} />
      )
    }

    return (
      <Panel>
        <form onSubmit={this.submitForm.bind(this)}>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email" type="email" placeholder="test@coopcycle.org"
              onChange={ this.handleChange.bind(this) }  />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Nom d'utilisateur</ControlLabel>
            <FormControl name="username" type="text" placeholder="test"
              onChange={ this.handleChange.bind(this) }  />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Mot de passe</ControlLabel>
            <FormControl name="password" type="password"
              onChange={ this.handleChange.bind(this) } />
          </FormGroup>
          <FormGroup>
            <Button { ...props } bsStyle="primary" type="submit" block>
              { loading ? 'Chargement...' : 'Enregistrement' }
            </Button>
          </FormGroup>
          { error ? <Alert bsStyle="danger">Unable to log in</Alert> : ''}
          <hr />
          <p className="text-center">Déjà enregistré ? <a href="#"
            onClick={ (e) => { e.preventDefault(); this.props.history.push('/login') } }>Connectez-vous.</a></p>
        </form>
      </Panel>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    authenticationRequest: state.authenticationRequest
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ register }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterForm))
