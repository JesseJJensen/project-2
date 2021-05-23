'use strict';

const commentData = [
  {
    name: 'Jesse',
    content: 'this is my comment 1',
    articleId: 1,
    userid: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'James',
    content: 'this is my comment 2',
    articleId: 2,
    userid: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Amy',
    content: 'this is my comment 3',
    articleId: 3,
    userid: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Joe',
    content: 'this is my comment 4',
    articleId: 4,
    userid: 4,
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
     await queryInterface.bulkInsert('comments', commentData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('comments', null, {});
  }
};
