'use strict';

const authorData = [
  {
    firstName: 'JesseJ',
    lastName: 'Jensen',
    bio: 'I am a author, and this is how I make a living',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'James',
    lastName: 'Jensen',
    bio: 'I am a author, and this is how I make a living',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Carter',
    lastName: 'Jensen',
    bio: 'I am a author, and this is how I make a living',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Amy',
    lastName: 'Jensen',
    bio: 'I am a author, and this is how I make a living',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Tina',
    lastName: 'Heiby',
    bio: 'I am a author, and this is how I make a living',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Paul',
    lastName: 'Heiby',
    bio: 'I am a author, and this is how I make a living',
    createdAt: new Date(),
    updatedAt: new Date()
  }
 
]

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
     await queryInterface.bulkInsert('authors', authorData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('authors', null, {});
  }
};
