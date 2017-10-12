const path = require('path')

const HOST = 'localhost' // so we can test the project remotely over the same network
const PORT = 9090

module.exports = { contentBase: path.join(__dirname, '../src/'),
  host: HOST,
  port: PORT,
  url: `http://${HOST}:${PORT}`
}
