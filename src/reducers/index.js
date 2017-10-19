import { combineReducers } from 'redux'
import _ from 'lodash';
import hash from 'object-hash';

const cartItems = (state = [], action) => {

  let newState, cartItem;

  switch (action.type) {
    case 'INITIALIZE':
      return action.cartItems || [];
    case 'ADD_TO_CART':
      newState = state.slice();
      cartItem = _.find(newState, (item) => {
        return (item.menuItem['@id'] === action.menuItem['@id'] && hash(item.selectedModifiers) === hash(action.selectedModifiers));
      });
      if (cartItem) {
        ++cartItem.quantity;
      } else {
        cartItem = {
          selectedModifiers: action.selectedModifiers,
          menuItem: action.menuItem,
          quantity: 1
        }
        newState.push(cartItem);
      }
      return newState;
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item !== action.cartItem);
    case 'RESET_CHECKOUT':
      return [];
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
    case 'RESET_CHECKOUT':
      return null;
    case 'DISCONNECT':
      if (state) {
        const isNewAddress = !state.hasOwnProperty('@id')
        return isNewAddress ? state : null
      }
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

const restaurant = (state = null, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.restaurant;
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
        order: action.order,
        loading: false,
        success: action.type === 'CREATE_ORDER_SUCCESS',
        error: action.type === 'CREATE_ORDER_FAILURE',
        apiErrorMessage: action.errorMessage
      };
    case 'INITIALIZE':
      return {
        order: action.order
      }
    case 'RESET_CHECKOUT':
      return {};
    default:
      return state
  }
}

const checkDistanceRequest = (state = asyncRequest, action) => {
  switch (action.type) {
    case 'CHECK_DISTANCE_REQUEST':
      return { ...asyncRequest, loading: true };
    case 'CHECK_DISTANCE_SUCCESS':
    case 'CHECK_DISTANCE_FAILURE':
      return {
        loading: false,
        success: action.type === 'CHECK_DISTANCE_SUCCESS',
        error: action.type === 'CHECK_DISTANCE_FAILURE',
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

const deliveryDate = (state = null, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.deliveryDate;
    case 'SET_DELIVERY_DATE':
      return action.date;
    case 'RESET_CHECKOUT':
      return null;
    default:
      return state
  }
}

export default combineReducers({
  cartItems,
  cartAddress,
  client,
  restaurant,
  credentials,
  user,
  authenticationRequest,
  createOrderRequest,
  checkDistanceRequest,
  showAddressForm,
  isOpen,
  deliveryDate
})
