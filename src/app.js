import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { StripeProvider } from 'react-stripe-elements'
import { Grid, Row, Col } from 'react-bootstrap'
import { MenuPage, LoginPage, RegisterPage, CheckoutPage, PaymentPage, ConfirmPage } from './pages'
import Store from './store'
import { HashRouter as Router, Route } from 'react-router-dom'
import { initialize } from './actions'

class App extends Component {

  constructor(props) {
    super(props);
    Store.dispatch(initialize(props.baseURL, props.restaurantId));
  }

  render() {
    return (
      <Provider store={ Store }>
        <StripeProvider apiKey={ this.props.stripePublishableKey }>
          <Router>
            <div>
              <Route exact path="/" component={ MenuPage } />
              <Route exact path="/login" component={ LoginPage } />
              <Route exact path="/register" component={ RegisterPage } />
              <Route exact path="/checkout" component={ CheckoutPage } />
              <Route exact path="/payment" component={ PaymentPage } />
              <Route exact path="/confirm" component={ ConfirmPage } />
            </div>
          </Router>
        </StripeProvider>
      </Provider>
    )
  }
}

export default App
