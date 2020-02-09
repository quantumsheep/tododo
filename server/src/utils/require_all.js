const glob = require('glob')

/**
 * @param {string} directory 
 */
module.exports = (directory) => glob.sync(directory, { nodir: true }).map(f => require(f))
