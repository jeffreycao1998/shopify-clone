'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('collections', [{
      name: 'Collection 1',
      description: 'Best collection on shopify-clone',
      active: false,
      userId: 1,
      imageUrl: 'https://i.imgur.com/IT4LPEy.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('collections', null, {});
  }
};
