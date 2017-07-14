import { combineReducers } from 'redux'
import _ from 'lodash';
import Client from '../client'

const cartItems = (state = [], action) => {

  let newState, item;

  switch (action.type) {
    case 'INITIALIZE':
      return action.cartItems || [];
    case 'ADD_TO_CART':
      newState = state.slice();
      item = _.find(newState, (item) => item.product['@id'] === action.product['@id']);
      if (item) {
        ++item.quantity;
      } else {
        item = {
          product: action.product,
          quantity: 1
        }
        newState.push(item);
      }
      return newState;
    case 'REMOVE_FROM_CART':
      return _.filter(state, (item) => item.product !== action.product);
    default:
      return state
  }
}

const cartAddress = (state = null, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.cartAddress;
    case 'PICK_ADDRESS':
      return action.address;
    default:
      return state
  }
}

const client = (state = null, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.client;
    default:
      return state
  }
}

const restaurantId = (state = null, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.restaurantId;
    default:
      return state
  }
}

const user = (state = null, action) => {
  switch (action.type) {
    case 'AUTHENTICATION_SUCCESS':
      return action.user;
    default:
      return state
  }
}

const addresses = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE':
    case 'LOAD_ADDRESSES_SUCCESS':
      return action.addresses || [];
    default:
      return state
  }
}

const authenticationRequestState = {
  loading: false,
  success: false,
  error: false,
}

const authenticationRequest = (state = authenticationRequestState, action) => {
  switch (action.type) {
    case 'AUTHENTICATION_REQUEST':
      return { ...authenticationRequestState, loading: true };
    case 'AUTHENTICATION_SUCCESS':
    case 'AUTHENTICATION_FAILURE':
      return {
        loading: false,
        success: action.type === 'AUTHENTICATION_SUCCESS',
        error: action.type === 'AUTHENTICATION_FAILURE',
      };
    default:
      return state
  }
}

const createOrderRequestState = {
  loading: false,
  success: false,
  error: false,
}

const createOrderRequest = (state = createOrderRequestState, action) => {
  switch (action.type) {
    case 'CREATE_ORDER_REQUEST':
      return { ...createOrderRequestState, loading: true };
    case 'CREATE_ORDER_SUCCESS':
    case 'CREATE_ORDER_FAILURE':
      return {
        loading: false,
        success: action.type === 'CREATE_ORDER_SUCCESS',
        error: action.type === 'CREATE_ORDER_FAILURE',
      };
    default:
      return state
  }
}

const products = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.products;
    default:
      return state
  }
}

export default combineReducers({
  cartItems,
  cartAddress,
  client,
  restaurantId,
  user,
  addresses,
  authenticationRequest,
  createOrderRequest,
  products
})
