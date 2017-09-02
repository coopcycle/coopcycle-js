import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux'
import Scroll  from 'react-scroll'

class MenuSections extends Component {
  render() {
    return (
      <ListGroup>
      { _.map(this.props.sections, (section) =>
        <ListGroupItem key={ section['@id'] }>
          <Scroll.Link to={ section.name } containerId="scrollable" spy={true} smooth={true} duration={250} href="#">
            { section.name }
          </Scroll.Link>
        </ListGroupItem>
      ) }
      </ListGroup>
    )
  }
}

function mapStateToProps(state, props) {

  const sections = _.groupBy(state.products, product => product.recipeCategory)

  return {
    sections: state.restaurant.hasMenu.hasMenuSection
  };
}

export default connect(mapStateToProps)(MenuSections)
