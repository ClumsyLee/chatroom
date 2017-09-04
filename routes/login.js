let express = require('express');
let router = express.Router();

let passport = require('passport');

/* GET login page. */
router.get('/', (req, res, next) => {
  res.render('login', {title: 'Login'});
});

router.post('/', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

module.exports = router;
