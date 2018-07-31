/**
 * Populate DB with sample data, to Disable edit config/environment/index.js,
 * and set 'seedDB: false'
 */

import Person from '../models/person';

import config from './environment/';


const generatePersons = () => {
  Person.find({}).remove()
    .then(() => {
      Person.create({
        name: 'Kel\'Thuzad',
        description: 'The Archlich, Lich Lord of the Plaguelands, Lord of Naxxramas',
        age: 58,
      }, {
        name: 'Illidan Stormrage',
        description: 'The Betrayer, Lord of Outland, Ruler of the Naga, The Demon Hunter, The Lord Of Shadows, Master of the Illidari, The Child of Light and Shadow, The Chosen One',
        age: 15032,
      }, {
        name: 'Jaina Proudmoore',
        description: 'Ruler of Dalaran, Grand Magus of the Kirin Tor, former Lady of Theramore, former Apprentice to Antonidas',
        age: 23,
      }, {
        name: 'Sylvanas Windrunner',
        description: 'Warchief (of the Horde), The Dark Lady, The Banshee Queen, Mistress Sylvanas',
      });
    });
};

export default function seedDB() {
  if (config.seedDB) {
    generatePersons();

  }
}
