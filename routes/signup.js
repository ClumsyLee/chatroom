const express = require('express');
const router = express.Router();

const passport = require('passport');

/* GET login page. */
router.get('/', (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  }

  res.render('signup', {title: 'Sign Up', alert: req.flash('signup-alert')});
});

router.post('/', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true,
}));

module.exports = router;
