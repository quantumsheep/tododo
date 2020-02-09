const path = require('path')
const require_all = require('./utils/require_all')

const routes_path = path.resolve(__dirname, './routes/*')

module.exports = require_all(routes_path)
