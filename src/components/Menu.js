import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Row, Col, Panel } from 'react-bootstrap';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { addToCart } from '../actions'

class Menu extends Component {

  renderSection(name, products) {
    return (
      <div key={ name }>
        <h4>{ name }</h4>
        <ListGroup>
        { products.map((product) =>
          <ListGroupItem key={ product['@id'] } onClick={() => { this.props.actions.addToCart(product) }}>
          { product.name } <span className="pull-right">{ product.price } €</span>
          </ListGroupItem>
        ) }
        </ListGroup>
      </div>
    )
  }

  render() {
    return (
      <div>
      { _.map(this.props.sections, (products, name) => this.renderSection(name, products)) }
      </div>
    )
  }
}

function mapStateToProps(state, props) {

  const sections = _.groupBy(state.products, product => product.recipeCategory)

  return {
    client: state.client,
    restaurantId: state.restaurantId,
    sections,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ addToCart }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
