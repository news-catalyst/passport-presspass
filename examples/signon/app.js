var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , PressPassStrategy = require('passport-presspass').Strategy
  , cookieParser = require("cookie-parser")
  , bodyParser = require("body-parser")
  , methodOverride = require("method-override")
  , session = require("express-session")

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(identifier, done) {
  done(null, identifier);
});

passport.use(new PressPassStrategy({
    pressPassBase: "http://dev.squarelet.com/", // or omit; this is helpful for development
    clientID: '<your client secret>',
    callbackURL: 'http://localhost:3000/auth/openid/return',
  },
  function(iss, sub, profile, verified) {
    process.nextTick(function () {
      return verified(null, profile)
    });
  }
));

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../../public'));


app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/auth/openid', 
  passport.authenticate('presspass', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/auth/openid/return', 
  passport.authenticate('presspass', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(3000);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
