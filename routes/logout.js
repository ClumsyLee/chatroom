let express = require('express');
let router = express.Router();

/* Logout. */
router.post('/', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
