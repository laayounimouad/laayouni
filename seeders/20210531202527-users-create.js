'use strict';
var faker = require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   /*
   var data = [];
   for(var i=0;i<20;i++){
     data.push({
      username: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: i%7 == 0 ? 'admin' :(i%2 == 0 ? 'host' : 'guest'),
      createdAt: new Date(),
      updatedAt: new Date()
     })
   }
     await queryInterface.bulkInsert('Users', data, {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    //  await queryInterface.bulkDelete('Users', null, {});
  }
};
