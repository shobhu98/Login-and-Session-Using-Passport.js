const LocalStrategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');
const db=require('./db');
function initialize(passport,email,password) {

// console.log('initialize');


    passport.use('local',new LocalStrategy(
        {
            usernameField : 'email',
            passwordField : 'password',
        },
        function (username,password,done) {
            let user=db.getfromDb(username.body.email);
                 console.log(user);
                // if(user===undefined){
                //     return done(null,false,{message:'no user with that email'})
                // }
                // try {
                //     if(await bcrypt.compare(password,db.getpasswordfromDb(user))){
                //          return done(null,user);
                //     }
                //     else {
                //         return done(null,false,{message:"password incorrect"});
                //     }
                //
                // }catch (e) {
                //        return done(e);
                // }

            
        }));
    passport.serializeUser(function (user,done) {                 //understand it
        done(null,user);
    });
    passport.deserializeUser(function (user,done) {
// understand this also
        done(null,user);
    });


}













module.exports=initialize;