const path = require('path');

try {
  const cpPath = path.resolve(__dirname, 'node_modules/pg/lib/connection-parameters.js');
  console.log('Attempting to require from path:', cpPath);
  const cp = require(cpPath);
  console.log('Successfully required pg/lib/connection-parameters directly:', cp);
  
  const pg = require('pg');
  console.log('Successfully required pg:', pg);
} catch (e) {
  console.error('Error requiring pg or its submodules:', e);
}
