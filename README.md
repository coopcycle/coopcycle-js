A client library in Javascript for the [Coopcyle API](https://github.com/coopcycle/coopcycle-web).

#### Authentication

Authentication is done thanks to [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token)

#### Running the examples

To run the example on your machine:

* Launch a [local instance of coopcycle-web](https://github.com/coopcycle/coopcycle-web#coopcycle).

* Run

You need to feed the app with your stripe and google credentials

directly inline by `npm install GOOGLE_MAPS_API_KEY=my_googlemaps_key STRIPE_PUBLISHABLE_KEY=my_stripe_publishable_key npm run example`

Or you can set them in to a secret.sh (at the root dir)
```
  GOOGLE_MAPS_API_KEY=my_googlemaps_key
  STRIPE_PUBLISHABLE_KEY=my_stripe_publishable_key
```
and then just launch `npm run example`

* Open [http://localhost:9090/webpack-dev-server/](http://localhost:8080/webpack-dev-server/)

#### Building the project

```
npm run build
```
