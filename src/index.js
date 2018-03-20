import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import Root from './app';
import Client from './client';

import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    top           : '20px',
    left          : '20px',
    right         : '20px',
    bottom        : '20px',
    padding       : 0,
    borderRadius  : 0
  }
};

const renderApp = (el, isOpen, baseURL, restaurantId, stripePublishableKey) => {

  render(
    <AppContainer>
      <Modal isOpen={ isOpen } contentLabel="Commander" style={ modalStyle }>
        <Root
          baseURL={ baseURL }
          restaurantId={ restaurantId }
          stripePublishableKey={ stripePublishableKey }
          onClose={ () => renderApp(el, false, baseURL, restaurantId, stripePublishableKey) }
          isOpen={ isOpen } />
      </Modal>
    </AppContainer>,
    el);

  if (module.hot) {
    module.hot.accept('./app.js', () => {
      const NextRoot = require('./app.js').default;
      render(
        <Modal isOpen={isOpen} contentLabel="Commander" style={modalStyle}>
          <NextRoot
            baseURL={baseURL}
            restaurantId={restaurantId}
            stripePublishableKey={stripePublishableKey}
            onClose={() => renderApp(el, false, baseURL, restaurantId, stripePublishableKey)}
            isOpen={isOpen}/>
        </Modal>,
        el);
    });
  }
}

if (typeof window !== 'undefined') {

  require('./styles/index.scss')

  const el = document.querySelector('[rel="coopcycle"]');

  if (el) {

    const baseURL = el.getAttribute(  'data-base-url');
    const restaurantId = el.getAttribute('data-restaurant-id');
    const stripePublishableKey = el.getAttribute('data-stripe-publishable-key');
    const googleApiKey = el.getAttribute('data-google-api-key');

    if (baseURL && restaurantId && stripePublishableKey && googleApiKey) {

      const scripts = [
        'https://js.stripe.com/v3/',
        'https://maps.googleapis.com/maps/api/js?libraries=places&key=' + googleApiKey
      ]

      scripts.forEach(src => {
        const script = document.createElement('script');
        script.setAttribute('src', src);
        document.body.appendChild(script);
      })

      const rootEl = document.createElement('div');
      rootEl.setAttribute('id', 'coopcycle__app');
      document.body.appendChild(rootEl);

      let modal = renderApp(rootEl, false, baseURL, restaurantId, stripePublishableKey);

      el.addEventListener('click', (e) => {
        modal = renderApp(rootEl, true, baseURL, restaurantId, stripePublishableKey)
      });

    }
  }

}

// Here goes the public API under the "Coopcycle" global variable
module.exports = {
  Client,
}
