const {User} = require('../models')
module.exports = async (req, res, next) => {
    var user = await User.findByPk(req.session.userId) 
    if(user){
         next() 
    } 
    else{
        return res.redirect('/auth/login')
    }
}