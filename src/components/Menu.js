import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import Scroll  from 'react-scroll';
import MenuItem from './MenuItem';

const scrollableElementHeight = '600px';

class Menu extends Component {

  renderSection(section, index) {

    if (section.hasMenuItem.length === 0) {
      return;
    }

    let cssStyle = {}

    if (index === this.props.menu.hasMenuSection.length - 1) {
      cssStyle['minHeight'] = scrollableElementHeight
    }

    return (
      <Scroll.Element name={ section.name } key={ section.name } style={ cssStyle }>
        <h4>{ section.name }</h4>
        <ListGroup>
        {
          section.hasMenuItem.map((item, key) => {
            return (<MenuItem key={ key } item={ item } />);
          })
        }
        </ListGroup>
      </Scroll.Element>
    )
  }

  render() {
    return (
      <div id="scrollable" style={{ position: 'relative', height: scrollableElementHeight, overflow:'scroll', }}>
      { _.map(this.props.menu.hasMenuSection, (section, index) => this.renderSection(section, index)) }
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
