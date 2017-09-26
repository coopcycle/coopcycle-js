import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import localforage from 'localforage'

const middlewares = [ thunk ]

// enhancing redux dev tools only work when window exists
// which is not the case at bundle time neither at server side render time
const composeEnhancers = (typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
)

store.subscribe(() => {
  const state = store.getState();
  localforage.setItem('cartItems', state.cartItems)
  localforage.setItem('cartAddress', state.cartAddress)
  localforage.setItem('credentials', state.credentials)
  localforage.setItem('user', state.user)
})

export default store
