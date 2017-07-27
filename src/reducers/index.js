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

// TODO Use Address object instead of id
const cartAddress = (state = null, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.cartAddress;
    case 'PICK_ADDRESS':
      return action.address;
    case 'CREATE_ADDRESS_SUCCESS':
      return action.address['@id'];
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

const credentials = (state = null, action) => {
  switch (action.type) {
    case 'AUTHENTICATION_SUCCESS':
      return action.credentials;
    case 'DISCONNECT':
      return null;
    default:
      return state
  }
}

const user = (state = null, action) => {
  let user;

  switch (action.type) {
    case 'INITIALIZE':
    case 'AUTHENTICATION_SUCCESS':
      return action.user;
    case 'CREATE_ADDRESS_SUCCESS':
      user = _.cloneDeep(state);
      user.addresses.push(action.address);
      return user;
    case 'DISCONNECT':
      return null;
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

const showAddressForm = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_ADDRESS_FORM':
      return !state;
    case 'CREATE_ADDRESS_SUCCESS':
      return false;
    default:
      return state
  }
}

const asyncRequest = {
  loading: false,
  success: false,
  error: false,
}

const authenticationRequest = (state = asyncRequest, action) => {
  switch (action.type) {
    case 'AUTHENTICATION_REQUEST':
      return { ...asyncRequest, loading: true };
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

const createOrderRequest = (state = asyncRequest, action) => {
  switch (action.type) {
    case 'CREATE_ORDER_REQUEST':
      return { ...asyncRequest, loading: true };
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

const createAddressRequest = (state = asyncRequest, action) => {
  switch (action.type) {
    case 'CREATE_ADDRESS_REQUEST':
      return { ...asyncRequest, loading: true };
    case 'CREATE_ADDRESS_SUCCESS':
    case 'CREATE_ADDRESS_FAILURE':
      return {
        loading: false,
        success: action.type === 'CREATE_ADDRESS_SUCCESS',
        error: action.type === 'CREATE_ADDRESS_FAILURE',
      };
    default:
      return state
  }
}

const isOpen = (state = true, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return true;
    case 'CLOSE_MODAL':
      return false;
    default:
      return state
  }
}

export default combineReducers({
  cartItems,
  cartAddress,
  client,
  restaurantId,
  credentials,
  user,
  authenticationRequest,
  createOrderRequest,
  createAddressRequest,
  products,
  showAddressForm,
  isOpen
})
