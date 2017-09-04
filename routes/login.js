let express = require('express');
let router = express.Router();

let passport = require('passport');

/* GET login page. */
router.get('/', (req, res, next) => {
  if (req.user) {
    res.redirect('/');
    return;
  }

  res.render('login', {title: 'Login', alert: req.flash('login-alert')});
});

router.post('/', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

module.exports = router;
