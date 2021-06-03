const {User}  = require('../models');

Validator = require('validatorjs');
module.exports =  {
    getAllUsers() {
      return User.findAll()
    },
    // méthodes à implémenter
    getUsers(offset = 0, limit = 10) {
      
     },
    getAdmins() { },
    getAuthors() { },
    getGuests(){ }, 
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
        rule : ['required', {'in':["guest","admin","author"]}]
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
    async updateUser(user) {
      
      var userTemp, validation, validationRules;
        // utilisateur existe :
        validationRules = {
          id:'required',
          username: 'required|string',
          email: 'required|string|email',
          password :'required|string',
          rule : ['required', {'in':["guest","admin","author"]}]
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