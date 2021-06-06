const {User,Article,Tag}  = require('./models');
var faker = require('faker')

async function test(){
//     var users = await User.findAll();
    // var articles = await Article.findAll();
    // console.log(articles);
    var tags = await Tag.findAll({
        attributes: ['id']
      });
    //   var data = tags.dataValues()
    //   console.log(tags[0].id)
      var phTyp = faker.random.arrayElement(tags);
      console.log(phTyp.id)
//     for(user of users){
//         console.log(user.id)
//     }
}


test()
// const rows= user[0]


// for(var i = 0;i<faker.datatype.number({'min':2,'max':10});i++){}
// var date = new Date()
// date.setFullYear(2000)
// var d=date.toDateString()
//console.log(faker.datatype.number({'min':2,'max':10}))