import React, { Component } from 'react';
import { Grid, Row, Col, Alert, Button} from 'react-bootstrap';
import { Navbar, Cart } from '../components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';


moment.locale('fr');


class ConfirmPage extends Component {

  onClick() {

  }

  render () {
    const deliveryTime = moment(this.props.deliveryDate).format('HH[h]mm');
    const deliveryDate = moment(this.props.deliveryDate).format('dddd DD MMMM');
    const deliveryIsToday = moment(this.props.deliveryDate).isSame(Date.now());
    let deliveryDateText = !deliveryIsToday ? ' le ' + deliveryDate : '';

    const orderUrl = this.props.client.httpBaseURL + this.props.order.publicUrl;

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
            <Cart readonly="true" noDatePicker="true" />
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

export default withRouter(connect(mapStateToPros)(ConfirmPage))