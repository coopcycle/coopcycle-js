import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal'
import App from './app'

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
}

const el = document.querySelector('[rel="coopcycle"]');

if (el) {

  const baseURL = el.getAttribute('data-base-url');
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
      document.body.append(script);
    })

    const app = document.createElement('div');
    app.setAttribute('id', 'coopcycle__app');
    document.body.append(app);

    const modal = render(
      <Modal isOpen={ false } contentLabel="Commander" style={ modalStyle }>
        <div className="container-fluid" style={{ marginBottom: 10 }}>
          <button type="button" className="close" aria-label="Close" onClick={e => {
            e.preventDefault();
            modal.portal.close();
          }}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <App baseURL={ baseURL } restaurantId={ restaurantId } stripePublishableKey={ stripePublishableKey } />
      </Modal>, app);

    el.addEventListener('click', (e) => {
      e.preventDefault();
      modal.portal.open();
    });

  }
}

// Here goes the public API under the "Coopcycle" global variable
module.exports = {}
