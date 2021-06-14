const {User,Article}  = require('../models');

Validator = require('validatorjs');
module.exports =  {
    getAllUsers() {
      return User.findAll()
    },
    
    // getAllUsers() {
    //   return {
    //     headers :  ["id","username","email","password","role"],
    //     rows:User.findAll()
    //   }
    // },
    
    // méthodes à implémenter
    async getUsers(page = 1, limit = 10) {

      const startIndex = (page - 1) * limit
      const endIndex = page * limit

      const results = {}
     
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }

      if (endIndex < await User.count()) {
        results.next = {
          page: page + 1,
        limit: limit
        }
      }
      results.results =await User.findAll({ offset: startIndex, limit: limit });
      return results;
    },
    getAdmins() { },
    getAuthors() { },
    getGuests(){ }, 
    getArticlesByUser(id){
      return Article.findAll({
        where: {
          UserId: id
        }
      })
    },
    getUser(id) {
      return  User.findByPk(id);
    },
    getUserByEmail(email) { },

    async addUser(user) {
      var userTemp, validation, validationRules;
      validationRules = {
        username: 'required|string',
        email: 'required|string|email',
        password :'required|string',
        role : ['required', {'in':["guest","admin","author"]}]
       };
  
      // validation du requete
        validation = new Validator(user, validationRules);
      // s'il y a une erreur :
      if (!validation.passes()) {
          return validation.errors.all();
      } else {
    // check if user email already registred
    // data are validated
    userTemp = (await User.findOne({
      where: {
        email: user.email
      }
    }));
    // user unique
    if (userTemp==null) {
      // ajout user
      userTemp = ( User.create(user));

      if (userTemp) {
        return  "Utilisateur nouvellement créé";
      }
    } else {
      // user avec le meme email
      return "email déja existe";
    }
  }



    },
    async autoriserLogin(user){
      
      if(!user.email || !user.password) return null
      var userTemp = (await User.findOne({
        where: {
          email: user.email
        }
      }));
      if (userTemp==null) {
        
       return null
      } else {
        if(userTemp.password == user.password) return userTemp
        else return null
      }
    },
    async updateUser(user) {
      
      var userTemp, validation, validationRules;
        // utilisateur existe :
        validationRules = {
          id:'required',
          username: 'required|string',
          email: 'required|string|email',
          password :'required|string',
          role : ['required', {'in':["guest","admin","author"]}]
         };
        validation = new Validator(user, validationRules);
        if (validation.fails()) {
          return validation.errors.all();
        }
        else {
          userTemp = (await User.update(
            { username: user.username,
            email: user.email,
            password :user.password,
            rule :user.rule
          },
          {
            where: {
              id: user.id
            }
          }));
          return "Utilisateur nouvellement modifié";
        }
     },
    async deleteUser(user) {
      if(!user.id){return "il faut un id pour supprimé l'utilisateur"}
      else{
      var temp = await User.destroy({
        where:{
          id:user.id
        }
      })
      if(temp) return "Utilisateur supprimé";
      }
    },
    // D'autres méthodes jugées utiles
  } 