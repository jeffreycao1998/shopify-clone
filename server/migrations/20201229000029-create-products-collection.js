'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products_collections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id'
        },
      },
      collection_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'collections',
          key: 'id'
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      underscored: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products_collections');
  }
};