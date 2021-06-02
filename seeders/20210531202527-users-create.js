'use strict';

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
     return queryInterface.bulkInsert('Users', [{
      username: 'John',
      email: 'example@example.com',
      password: 'password1',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Laayouni',
      email: 'laayouni@gmail.com',
      password: 'laayouni',
      role: 'guest',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Mouad',
      email: 'Mouad@gmail.com',
      password: 'Mouad',
      role: 'author',
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
