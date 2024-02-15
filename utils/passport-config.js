const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;


const UserModel = require('../model/User/User');



// !passport configuration

const passportConfig = passport.use(
    new LocalStrategy({
        usernameField: "userName" // one can specify either username or emmail depending on the login method.
    }, async (userName, password, done) => {
        try{
         
            const user = await UserModel.findOne({
                userName
            })
            if(!user){
                return done(null, false, {message: "Invalid login credentials"})
            }
          // compareing user password using
          const isPasswordMatch = await bcrypt.compare(password, user.password)
          
          if(!isPasswordMatch) {
            return done(null, false, {message:"Invalid login credentials"})
          }
          return done(null, user)
        }catch(err){
             return done(err)
        }
    })
)

module.exports = passportConfig