const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const  JWTStrategy = require('passport-jwt').Strategy; // Strategy for jwt
const  ExtractJwt = require('passport-jwt').ExtractJwt; // Extract for jwt
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Strategy for
const UserModel = require('../model/User/User');



// !passport configuration

passport.use(
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

//Configuring JWT Options
const options={
    jwtFromRequest:ExtractJwt.fromExtractors([(req) => {
        const token = null
        if(req && req.cookies){
             token = req.cookies["token"]
             return token
        }

    }]),
    secretOrKey: process.env.JWT_SECRET
}

//JWT
passport.use(
    new JWTStrategy(options, async(userDecoded, done) => {
          try{
           
            const user = await UserModel.findById(userDecoded._id);
            if(user){
                done(null, user)
            }else{
                done(null, false)
            }

          }catch(error){
                  done(error)
          }
    })
)


// GOOGLE AOUTH
passport.use(
    new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        callbackURL:process.env.GOOGLE_CALLBACK_URL,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET
    }, async(accesstoken, refreshToken, profile, done)=> {
    try{
        // check if user exist
        const user = await UserModel.findOne({
            googleId:profile.id
        })
// destructuring properties from the profile sent by google
const {  id, displayName, name, _json: {picture} } = profile
// check if the user email exis

  const email = ''
  if(Array.isArray(profile?.emails) && profile?.emails?.length > 0){
       email = profile.emails[0].value
  }

// check if user is not found
if(!user){
 const user  = await UserModel.create({
 userName:displayName, 
 googleId:id,
 profilePicture:picture,
 authMethod:"google",
 email

 })
}

done(null, user)



    }catch(error){
   done(error, null)
    }
    })
)

const passportConfig = passport

module.exports = passportConfig