const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const db=require('./db');
const LocalStrategy=require('passport-local').Strategy;
var result_m;

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: 'I LOVE SALSA',

}));
app.use(passport.initialize());
app.use(passport.session());
const initializePassport = require('./passport-config');




app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user })
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
});

app.post('/login',checkNotAuthenticated,passport.authenticate('local',
    {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }



));

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
});

app.post('/register' ,checkNotAuthenticated, async (req, res) => {
    try {
       let email=req.body.email;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
      db.InsertintoDb(req.body.email,hashedPassword);
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
});

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login')
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}












passport.use('local',new LocalStrategy(
    {
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },

async  function (req,username,password,done) {
    // console.log(username);
    db.getfromDb(username, async function (result) {
        result_m = result;
        if (result_m.length === 0) {
            return done(null, false, {message: 'no user with that email'})
        }
        try {
            db.getpasswordfromDb(username, async function (res) {
                console.log(res[0].password);
                if (await bcrypt.compare(password, res[0].password)) {
                    return done(null, username)
                } else {
                    return done(null, false, {message: 'Password incorrect'})
                }

            })
        }catch (e) {
            
        }
    })
}));
        




passport.serializeUser(function (user,done) {                 //understand it
    done(null,user);
});
passport.deserializeUser(function (user,done) {
// understand this also
    done(null,user);
});




app.post('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login')
});
app.listen(3400);

