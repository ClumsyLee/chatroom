const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const crypto = require('crypto');
const flash = require('connect-flash');

const User = require('./models/user');
const index = require('./routes/index');
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');

let app = express();
mongoose.connect('127.0.0.1');
let sessionSecret = '17H<U}(S1e=rIN75x.0DO090/8Jf$H}n';
let sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

// Setup passport.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('local-signup', new LocalStrategy({
  passReqToCallback: true,
},
(req, username, password, done) => {
  User.findOne({username: username}, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false,
                  req.flash('signup-alert', 'The username has been taken.'));
    } else {
      let user = new User();
      user.setup(username, password);

      user.save((err) => {
        if (err) {
          throw err;
        }
        return done(null, user);
      });
    }
  });
}));

passport.use('local-login', new LocalStrategy({
  passReqToCallback: true,
},
(req, username, password, done) => {
  User.findOne({username: username}, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, req.flash('login-alert', 'Invalid username.'));
    }
    if (!user.verify(password)) {
      return done(null, false, req.flash('login-alert', 'Invalid password.'));
    }

    return done(null, user);
  });
}));

// Setup app.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: sessionSecret,
  store: sessionStore,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', index);
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {sessionSecret, sessionStore, app};
