import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Row, Col, Panel } from 'react-bootstrap';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Scroll  from 'react-scroll'
import { addToCart } from '../actions'

class Menu extends Component {

  renderSection(section) {

    if (section.hasMenuItem.length === 0) {
      return;
    }

    return (
      <Scroll.Element name={ section.name } key={ section.name }>
        <h4>{ section.name }</h4>
        <ListGroup>
        { section.hasMenuItem.map((item) =>
          <ListGroupItem key={ item['@id'] } onClick={() => { this.props.actions.addToCart(item) }}>
          { item.name } <span className="pull-right">{ item.offers.price } €</span>
          </ListGroupItem>
        ) }
        </ListGroup>
      </Scroll.Element>
    )
  }

  render() {
    return (
      <div id="scrollable" style={{ position: 'relative', height: '632px', overflow:'scroll', }}>
      { _.map(this.props.menu.hasMenuSection, (section) => this.renderSection(section)) }
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    client: state.client,
    menu: state.restaurant.hasMenu
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ addToCart }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
