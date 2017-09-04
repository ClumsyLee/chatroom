const express = require('express');
const router = express.Router();

const passport = require('passport');

/* GET signup page. */
router.get('/', (req, res, next) => {
  if (req.user) {
    res.redirect('/');
    return;
  }

  res.render('signup', {title: 'Sign Up', alert: req.flash('signup-alert')});
});

router.post('/', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true,
}));

module.exports = router;
