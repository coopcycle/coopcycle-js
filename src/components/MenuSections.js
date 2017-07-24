import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux'

class MenuSections extends Component {
  render() {
    return (
      <ListGroup>
      { _.map(this.props.sections, (products, name) =>
        <ListGroupItem key={ name }>
        { name }
        </ListGroupItem>
      ) }
      </ListGroup>
    )
  }
}

function mapStateToProps(state, props) {

  const sections = _.groupBy(state.products, product => product.recipeCategory)

  return {
    sections
  };
}

export default connect(mapStateToProps)(MenuSections)
