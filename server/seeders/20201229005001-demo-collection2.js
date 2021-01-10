'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('collections', [{
      name: 'Collection 2',
      description: 'Second best collection on shopify-clone',
      active: true,
      userId: 1,
      imageUrl: 'https://i.imgur.com/MEp3Tkw.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('collections', null, {});
  }
};
