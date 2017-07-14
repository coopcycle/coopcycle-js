import { render } from 'react-dom';
import App from './app'

module.exports = {
  init: (el, options) => {
    render(<App baseURL={ options.baseURL }
      restaurantId={ options.restaurantId }
      stripePublishableKey={ options.stripePublishableKey } />, el);
  }
}
