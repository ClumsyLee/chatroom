let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.user) {
    res.redirect('login');
  }

  res.render('index', {user: req.user});
});

module.exports = router;
