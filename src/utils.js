import _ from 'lodash'

export const cartTotal = cartItems => _.sumBy(cartItems, (item) => item.menuItem.offers.price * item.quantity).toFixed(2)
