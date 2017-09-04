let express = require('express');
let router = express.Router();

let passport = require('passport');

/* GET login page. */
router.get('/', (req, res, next) => {
  res.render('signup', {title: 'Signup', alert: req.flash('signup-alert')});
});

router.post('/', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true,
}));

module.exports = router;
