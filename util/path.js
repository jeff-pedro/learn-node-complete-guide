const path = require('path');

// deprecated: process.mainModule.filename
module.exports = path.dirname(require.main.filename);