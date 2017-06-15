import React, { Component } from 'react';
import { Alert, Panel, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      loginError: false,
      loading: false,
      username: '',
      password: ''
    };
  }

  componentWillMount() {
    this.setState({isLoggedIn: false});
  }

  submitForm(e) {
    e.preventDefault();

    const { username, password } = this.state;

    this.setState({ loading: true, loginError: false });
    this.props.client.login(username, password)
      .then(() => {
        this.setState({ isLoggedIn: true, loading: false });
      })
      .catch((err) => {
        this.setState({ loginError: true, loading: false });
      })
  }

  handleChange(event) {
    this.setState({ [ event.target.name ]: event.target.value });
  }

  render() {

    const { isLoggedIn, loginError } = this.state;
    const props = this.state.loading ? { disabled: true } : {}

    return (
      <Panel>
        {
          !isLoggedIn
          ? <form onSubmit={this.submitForm.bind(this)}>
              <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <FormControl name="username" type="text" onChange={ this.handleChange.bind(this) } placeholder="test@coopcycle.org" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl name="password" type="password" onChange={ this.handleChange.bind(this) } />
              </FormGroup>
              { loginError ? <Alert bsStyle="danger">Unable to log in</Alert> : ''}
              <Button { ...props } bsStyle="primary" type="submit" block>{ this.state.loading ? 'Chargement...' : 'Valider' }</Button>
            </form>
          : <Alert bsStyle="success">Congrats! You are logged in at https://coopcycle.org</Alert>
        }
      </Panel>
    )
  }
}

export default LoginForm
