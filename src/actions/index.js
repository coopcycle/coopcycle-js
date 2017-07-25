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

const loadUser = () => {
  return localforage.getItem('user')
}

const loadProducts = (client, restaurantId) => {
  return client.get('/api/restaurants/' + restaurantId)
    .then(response => response.products)
}

export const initialize = (baseURL, restaurantId) => (dispatch, getState) => {
  localforage.getItem('coopcyle__api_credentials')
    .then(credentials => {
      const client = new Client(baseURL, credentials)

      Promise.all([ loadProducts(client, restaurantId), loadCartItems(), loadCartAddress(), loadUser() ])
        .then(values => {
          const [ products, cartItems, cartAddress, user ] = values;
          dispatch({ type: 'INITIALIZE', client, restaurantId, cartItems, cartAddress, user, products })
        })
    })
}

const authenticationSuccess = (dispatch, getState, credentials) => {
  getState().client.get('/api/me')
    .then(user => dispatch({ type: 'AUTHENTICATION_SUCCESS', user, credentials }))
}

export const authenticate = (username, password) => (dispatch, getState) => {
  dispatch({ type: 'AUTHENTICATION_REQUEST' });
  getState().client
    .login(username, password)
    .then(credentials => authenticationSuccess(dispatch, getState, credentials))
    .catch(err => dispatch({ type: 'AUTHENTICATION_FAILURE' }))
}

export const register = (email, username, password) => (dispatch, getState) => {
  dispatch({ type: 'REGISTRATION_REQUEST' });
  getState().client
    .register(email, username, password)
    .then(credentials => authenticationSuccess(dispatch, getState, credentials))
    .catch(err => dispatch({ type: 'REGISTRATION_FAILURE' }))
}

export const disconnect = (username, password) => (dispatch, getState) => {
  localforage.removeItem('user')
    .then(() => localforage.removeItem('credentials'))
    .then(() => dispatch({ type: 'DISCONNECT' }))
}

export const pickAddress = (address) => {
  return { type: 'PICK_ADDRESS', address };
}

export const toggleAddressForm = () => {
  return { type: 'TOGGLE_ADDRESS_FORM' };
}

export const createAddress = (streetAddress, geo, postalCode, addressLocality) => (dispatch, getState) => {
  dispatch({ type: 'CREATE_ADDRESS_REQUEST' });
  getState().client
    .post('/api/me/addresses', { streetAddress, geo, postalCode, addressLocality })
    .then(address => dispatch({ type: 'CREATE_ADDRESS_SUCCESS', address }))
    .catch(err => dispatch({ type: 'CREATE_ADDRESS_FAILURE' }))
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
