const {User} = require('../models')
const edge = require("edge.js");
module.exports ={
    async createAuth(req, res, next) {
        var user = await User.findByPk(req.session.userId) 
        if(user){
             next() 
        } 
        else{
            return res.redirect('/auth/login')
        }
    },
    async roleAuth(req, res, next){
        var user = await User.findByPk(req.session.userId)
        
        if(user){
            console.log(user.role)
            edge.global('role',user.role)
        }
        next() 
    },
    async userListeAuth(req, res, next){
        var user = await User.findByPk(req.session.userId)
        if(user){
            if(user.role='admin') next();
            else return res.redirect('/auth/login')
        }
        else return res.redirect('/auth/login')
    }
}