import React, { Component } from 'react';
import { Grid, Row, Col, Alert, Button} from 'react-bootstrap';
import { Navbar, Cart } from '../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import moment from 'moment';
import { resetCheckout } from "../actions/index";


moment.locale('fr');


class ConfirmPage extends Component {

  onClick() {
    this.props.actions.resetCheckout();
  }

  render () {

    if (!this.props.order) {
      return (<Redirect to={{ pathname: '/' }} />);
    }

    const { client: { httpBaseURL }, deliveryDate, order: { publicUrl } } = this.props
    const deliveryMoment = moment(deliveryDate)
    const deliveryTime = deliveryMoment.format('HH[h]mm')
    const formattedDeliveryDate = deliveryMoment.format('dddd DD MMMM')
    const deliveryIsToday = formattedDeliveryDate === moment(Date.now()).format('dddd DD MMMM')

    let deliveryDateText = !deliveryIsToday ? ' le ' + formattedDeliveryDate : '';

    const orderUrl = httpBaseURL + publicUrl;

    return (
      <Grid fluid>
        <Navbar />
        <Row>
          <Col md={8} mdOffset={2}>
            <Alert bsStyle="success">
                Votre commande est validée ! Livraison prévue à { deliveryTime }{ deliveryDateText }.
            </Alert>
          </Col>
        </Row>
        <Row className="text-center">
          <Col md={4} mdOffset={2}>
            <a href={ orderUrl } target="blank"><Button bsStyle="primary" bsSize="large">Suivre ma commande</Button></a>
          </Col>
          <Col md={4}>
            <Button onClick={ () => this.onClick() } bsStyle="primary" bsSize="large">Nouvelle commande</Button>
          </Col>
        </Row>
        <Row className="margin-top-md">
          <Col md={8} mdOffset={2}>
            <Cart readonly noDatePicker />
          </Col>
        </Row>
      </Grid>
    )
  }

}

function mapStateToPros (state) {
  return {
    deliveryDate: state.deliveryDate,
    client: state.client,
    order: state.createOrderRequest.order
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ resetCheckout }, dispatch)
  }
}

export default withRouter(connect(mapStateToPros, mapDispatchToProps)(ConfirmPage))
