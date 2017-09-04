const express = require('express');
const router = express.Router();
const showdown = require('showdown');
const converter = new showdown.Converter();

const Message = require('../models/message');

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
    return;
  }

  Message.find({}, null, {sort: {createdAt: -1}}, (err, messages) => {
    if (err) {
      throw err;
    }
    res.render('index', {
      title: 'FSE Chat Room',
      user: req.user,
      messages,
      converter,
    });
  });
});

module.exports = router;
