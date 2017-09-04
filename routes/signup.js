let express = require('express');
let router = express.Router();

let passport = require('passport');

/* GET login page. */
router.get('/', (req, res, next) => {
  res.render('signup', {title: 'Signup'});
});

router.post('/', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
}));

module.exports = router;
