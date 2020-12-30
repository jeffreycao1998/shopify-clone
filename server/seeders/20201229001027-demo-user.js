'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'jeffreycao1998@hotmail.com',
      password: '$2b$10$pdSzomzx9ieXHMdaryEoVONLJnjBU32RAEh76zcQ0NP/zZ69TT6Pq', // password is 123
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
