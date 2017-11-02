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
        <Scroll.Link className="list-section-item" to={ section.name } offset={1} containerId="scrollable" spy={true} smooth={true} duration={250} href="#">
          <ListGroupItem key={ section['@id'] }>
              { section.name }
          </ListGroupItem>
        </Scroll.Link>
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
