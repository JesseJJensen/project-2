'use strict';

const articleData = [
  {
    title: 'ARTICLEtitleONE',
    content: 'This is the content in the article, lorem somthing, something, something!!!!',
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'ARTICLEtitleTWO',
    content: 'This is the content in the article, lorem somthing, something, something!!!!',
    authorId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'ARTICletitleTHREE',
    content: 'This is the content in the article, lorem somthing, something, something!!!!',
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'ARTICLEtitleFOUR',
    content: 'This is the content in the article, lorem somthing, something, something!!!!',
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'ARTICLEtitleFIVE',
    content: 'This is the content in the article, lorem somthing, something, something!!!!',
    authorId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'ARTICLEtitleSIX',
    content: 'This is the content in the article, lorem somthing, something, something!!!!',
    authorId: 2,
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
     await queryInterface.bulkInsert('articles', articleData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('articles', null, {});
  }
};
