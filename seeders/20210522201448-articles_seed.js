'use strict';

const articleData = [
  {
    title: 'ARTICLE TITLE: BOOMS IN THE DOWN UNDER',
    content: 'This is the content in the article, lorem somthing, something, something!!!!',
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'ARTICLE TITLE: HOW TO DO THIS!!',
    content: 'This is the content in the article, lorem somthing, something, something!!!!',
    authorId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'ARTICLE TITLE: FAKE ARTICLE SCAMS',
    content: 'This is the content in the article, lorem somthing, something, something!!!!',
    authorId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'ARTICLE TITLE: LEARN TO CODE IN AN HOUR',
    content: 'This is the content in the article, lorem somthing, something, something!!!!',
    authorId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'ARTICLE TITLE: WHY YOUR MOTHER DOES NOT LOVE YOU',
    content: 'This is the content in the article, lorem somthing, something, something!!!!',
    authorId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'ARTICLE TITLE: NEW STUDY FINDS THAT THE EARTH IS FLAT',
    content: 'This is the content in the article, lorem somthing, something, something!!!!',
    authorId: 6,
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
