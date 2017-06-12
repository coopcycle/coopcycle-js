import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.props.client.get('/api/restaurants/' + this.props.restaurantId)
      .then((response) => {
        const products = response.products;
        this.setState({ loading: false, products: products });
      })
      .catch((err) => {
        console.log(err)
        this.setState({ loading: false });
      })
  }

  render() {

    if (this.state.loading) {
      return (
        <div>Chargement...</div>
      )
    }

    return (
      <ListGroup>{this.state.products.map((product) =>
        <ListGroupItem key={ product['@id'] }>{ product.name }</ListGroupItem>
      )}</ListGroup>
    )
  }
}

export default Menu