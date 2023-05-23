const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const envVars = require('../config/envVars');

const basename  = path.basename(__filename);

const models = {};

/**
 * Set event listener to mongoose.connection
 */
mongoose.connection.on('error', (error) => {
  console.log(error);
});

mongoose.connection.on('open', () => {
  console.log(`Connected to ${envVars.DB_URI}`);
});

/**
 * Connect database
 */
mongoose.connect(envVars.DB_URI);

/**
 * Assign models to 'models' object
 */
fs
  .readdirSync(__dirname)
  .filter((filename) => {
    // Get file's name that lives in the same directory without myself.
    return (filename.indexOf('.') !== 0) && (filename !== basename);
  })
  .forEach((filename) => {
    // If file's extension is not 'js', break.
    if (filename.slice(-3) !== '.js') return;

    const filepath = path.join(__dirname, filename)
    
    // When imported file use 'export default', object is assinged 'default'.
    const imported = (require(filepath).default) ?
      require(filepath).default :
      require(filepath);

    if (typeof imported.modelName !== 'undefined') {
      // Model definition file is expected exporting 'Model' of mongoose.
      models[imported.modelName] = imported;
    }
  });

module.exports = models;