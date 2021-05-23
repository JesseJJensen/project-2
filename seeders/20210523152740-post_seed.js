'use strict';

const postData = [
  {
    title: 'Title post',
    author: 'Jesse Jensen',
    content: 'This is the content for this post, lorem somthing, something, something!!!!',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Title post',
    author: 'Jesse Jensen',
    content: 'This is the content for this post, lorem somthing, something, something!!!!',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Title post',
    author: 'Jesse Jensen',
    content: 'This is the content for this post, lorem somthing, something, something!!!!',
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Title post',
    author: 'Jesse Jensen',
    content: 'This is the content for this post, lorem somthing, something, something!!!!',
    userId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Title post',
    author: 'Jesse Jensen',
    content: 'This is the content for this post, lorem somthing, something, something!!!!',
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Title post',
    author: 'Jesse Jensen',
    content: 'This is the content for this post, lorem somthing, something, something!!!!',
    userId: 2,
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
     await queryInterface.bulkInsert('posts', postData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('posts', null, {});
  }
};
