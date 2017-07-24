import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import localforage from 'localforage'

const middleware = [ thunk ];

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

store.subscribe(() => {
  const state = store.getState();
  localforage.setItem('cartItems', state.cartItems)
  localforage.setItem('cartAddress', state.cartAddress)
  localforage.setItem('credentials', state.credentials)
  localforage.setItem('user', state.user)
})

export default store