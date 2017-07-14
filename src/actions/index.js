import localforage from 'localforage'
import Client from '../client'

export const addToCart = product => {
  return { type: 'ADD_TO_CART', product }
}

export const removeFromCart = product => {
  return { type: 'REMOVE_FROM_CART', product }
}

const loadCartItems = () => {
  return localforage.getItem('cartItems')
}

const loadCartAddress = () => {
  return localforage.getItem('cartAddress')
}

const loadAddresses = () => {
  return localforage.getItem('addresses')
}

const loadProducts = (client, restaurantId) => {
  return client.get('/api/restaurants/' + restaurantId)
    .then(response => response.products)
}

export const initialize = (baseURL, restaurantId) => (dispatch, getState) => {
  localforage.getItem('coopcyle__api_credentials')
    .then(credentials => {
      const client = new Client(baseURL, credentials)

      Promise.all([ loadCartItems(), loadCartAddress(), loadAddresses(), loadProducts(client, restaurantId) ])
        .then(values => {
          const [ cartItems, cartAddress, addresses, products ] = values;
          dispatch({ type: 'INITIALIZE', client, restaurantId, cartItems, cartAddress, addresses, products })
        })
    })
}

export const authenticate = (username, password) => (dispatch, getState) => {
  dispatch({ type: 'AUTHENTICATION_REQUEST' });
  getState().client
    .login(username, password)
    .then(user => {
      getState().client.get('/api/me')
        .then(me => {
          dispatch({ type: 'LOAD_ADDRESSES_SUCCESS', addresses: me.addresses })
          dispatch({ type: 'AUTHENTICATION_SUCCESS', user })
        })
    })
    .catch(err => dispatch({ type: 'AUTHENTICATION_FAILURE' }))
}

export const pickAddress = (address) => {
  return { type: 'PICK_ADDRESS', address };
}

export const finalizeOrder = (stripeToken) => (dispatch, getState) => {

  const { client, restaurantId, cartItems, cartAddress } = getState();

  let payload = {
    restaurant: '/api/restaurants/' + restaurantId,
    orderedItem: []
  }
  payload.orderedItem = _.map(cartItems, (item) => {
    return {
      quantity: item.quantity,
      product: item.product['@id']
    }
  });
  payload.delivery = {
    deliveryAddress: cartAddress
  }

  dispatch({ type: 'CREATE_ORDER_REQUEST' });

  client.post('/api/orders', payload)
    .then((order) => {
      return client.put(order['@id'] + '/pay', {
        stripeToken: stripeToken.id
      })
    })
    .then((order) => {
      dispatch({ type: 'CREATE_ORDER_SUCCESS', order })
    })
    // TODO Error control

}
