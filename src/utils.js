import _ from 'lodash'

function getItemPrice (item) {
  let price = item.menuItem.offers.price

  _.forOwn(item.selectedModifiers, (value, key) => {

    let modifier = _.find(item.menuItem.modifiers, (item) => {
      return item['@id'] === key;
    })

    if (modifier.calculusStrategy === 'ADD_MENUITEM_PRICE') {
      price += value.price
    }
    else if (modifier.calculusStrategy === 'ADD_MODIFIER_PRICE') {
      price += modifier.price
    }
  })

  return price;
}

const cartTotal = cartItems => {
  return _.sumBy(cartItems, (item) => {
    return getItemPrice(item) * item.quantity
  }).toFixed(2)
}

const cartCountItems = cartItems => {
  return _.sumBy(cartItems, (item) => {
    return item.quantity;
  })
}


export { cartTotal, cartCountItems }
