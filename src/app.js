import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import { Grid, Row, Col, Alert} from 'react-bootstrap';
import { MenuPage, LoginPage, RegisterPage, CheckoutPage, ConfirmPage, AddressPage } from './pages';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { initialize } from './actions';
import store from './store';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initialized: false
    };

    // wait for initialization to be done to render anything
    let unsubscribe = store.subscribe(() => {
      this.setState({initialized: true});
      unsubscribe();
    });

    let currentValue = props.isOpen;
    store.subscribe(() => {
      let previousValue = currentValue;
      currentValue = store.getState().isOpen;
      if (currentValue !== previousValue) {
        if (previousValue === true && currentValue === false) {
          this.props.onClose();
        }
      }
    });

    store.dispatch(initialize(props.baseURL, props.restaurantId));
  }

  render() {

    if (this.state.initialized !== true) {
      return (
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2}>
              <Alert className="margin-top-md" bsStyle="warning">Chargement...</Alert>
            </Col>
          </Row>
        </Grid>
      );
    }

    return (
      <Provider store={ store }>
        <StripeProvider apiKey={ this.props.stripePublishableKey }>
          <Router>
            <div>
              <Route exact path="/"         component={ AddressPage } />
              <Route exact path="/menu"     component={ MenuPage } />
              <Route exact path="/login"    component={ LoginPage } />
              <Route exact path="/register" component={ RegisterPage } />
              <Route exact path="/checkout" component={ CheckoutPage } />
              <Route exact path="/confirm"  component={ ConfirmPage } />
            </div>
          </Router>
        </StripeProvider>
      </Provider>
    )
  }
}

export default App
