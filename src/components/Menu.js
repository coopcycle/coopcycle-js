import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import _ from 'lodash';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sections: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.props.client.get('/api/restaurants/' + this.props.restaurantId)
      .then((response) => {
        const products = response.products;
        const sections = _.groupBy(products, product => product.recipeCategory)
        this.setState({ loading: false, sections: sections });
      })
      .catch((err) => {
        console.log(err)
        this.setState({ loading: false });
      })
  }

  renderSection(name, products) {
    return (
      <div key={ name }>
        <h3>{ name }</h3>
        <ListGroup>
        { products.map((product) =>
          <ListGroupItem key={ product['@id'] }>
          { product.name } <span className="pull-right">{ product.price } €</span>
          </ListGroupItem>
        ) }
        </ListGroup>
      </div>
    )
  }

  render() {

    if (this.state.loading) {
      return (
        <div>Chargement...</div>
      )
    }

    return (
      <div>
      { _.map(this.state.sections, (products, name) => this.renderSection(name, products)) }
      </div>
    )
  }
}

export default Menu