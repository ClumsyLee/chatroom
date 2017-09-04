let express = require('express');
let router = express.Router();

let passport = require('passport');

/* GET login page. */
router.get('/', (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  }

  res.render('login', {alert: req.flash('login-alert')});
});

router.post('/', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

module.exports = router;
