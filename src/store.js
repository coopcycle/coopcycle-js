import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import localforage from 'localforage';
import {ORDER_KEY, CART_ITEM_KEY, CART_ADDRESS_KEY, DELIVERY_DATE_KEY} from "./actions/index";

const middlewares = [ thunk ];

// we maye want enhancing redux dev tools only  in dev ?
// also if server side render is made later, it is
// better to add a guard here
const composeEnhancers = (typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

store.subscribe(() => {
  const state = store.getState();
  localforage.setItem(ORDER_KEY, state.createOrderRequest.order);
  localforage.setItem(CART_ITEM_KEY, state.cartItems);
  localforage.setItem(CART_ADDRESS_KEY, state.cartAddress);
  localforage.setItem('credentials', state.credentials);
  localforage.setItem('user', state.user);
  localforage.setItem(DELIVERY_DATE_KEY, state.deliveryDate);
});

export default store;
