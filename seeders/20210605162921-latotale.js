'use strict';
var faker = require('faker');
const {User,Article,Tag}  = require('../models');
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
     
    var user = []
    var year = 2000
    for(var i=0;i<20;i++){
        var date = new Date()
        if(i==0){
          user.push({
            username : 'admin',
            email:'admin@gmail.com',
            password:'admin',
            role:'admin',
            createdAt:  date,
            updatedAt:  date
      
          }) 
        }
        else{

        date.setFullYear(year++)
        user.push({
          username: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: i%9 == 0 ? 'admin' :(i%2 == 0 ? 'author' : 'guest'),
          createdAt: date,
          updatedAt: date
      })
        }
    }

 
  await queryInterface.bulkInsert('Users', user, {});

       // tags:
       var tag = []
       for(var i=0;i<10;i++){
        date.setFullYear(year++)
        tag.push({
          name: faker.fake("{{random.word}} {{random.word}} {{random.word}}"),
          createdAt: new Date(),
          updatedAt: new Date()
         })
       }

       await queryInterface.bulkInsert('Tags', tag, {});
       
         // articles:
         var article = []
         var users = await User.findAll();
        for(user of users)
        {
          var number = faker.datatype.number({'min':2,'max':10})
          for(var i = 0;i<number;i++)
          {
                var date = new Date(user.createdAt)
                date.setDate(date.getDate()+i)
                article.push(
                {
                  title: faker.name.title(),
                  content: faker.lorem.text(),
                  published : true,
                  UserId :user.id,
                  createdAt:date,
                  updatedAt:date
                })
          }
        }
        await queryInterface.bulkInsert('Articles', article, {});
        

     // ArticleTags:
     var articleTags = []
     var articles = await Article.findAll();
     var tags = await Tag.findAll({
      attributes: ['id']
     });
     for(article of articles)
     {

       var number = faker.datatype.number({'min':2,'max':6})
       var TagIds = faker.random.arrayElements(tags,number);
       
       for(const TagId of TagIds)
       {
             articleTags.push(
             {
               TagId :TagId.id,
               ArticleId :article.id,
               createdAt:article.createdAt,
               updatedAt:article.createdAt
             })
       }
     }
     await queryInterface.bulkInsert('ArticleTags', articleTags, {});

     //comments:
     var comments = []

  for(article of articles)
     {

       var number = faker.datatype.number({'min':0,'max':10})
      
       for(var i = 0;i<number;i++)
       {
             comments.push(
             {
               content : faker.lorem.text(),
               ArticleId :article.id,
               createdAt:article.createdAt,
               updatedAt:article.createdAt
             })
       }
     }
    await queryInterface.bulkInsert('Comments',comments, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('ArticleTags', null, {});
     await queryInterface.bulkDelete('Comments', null, {});
     await queryInterface.bulkDelete('Articles', null, {});
     await queryInterface.bulkDelete('Users', null, {});
     await queryInterface.bulkDelete('Tags', null, {});
  }
};
