/**
 * Populate DB with sample data, to Disable edit config/environment/index.js,
 * and set 'seedDB: false'
 */

import config from './environment/';

export default function seedDB() {
  if (config.seedDB) {
    //add seeds here.
  }
}
