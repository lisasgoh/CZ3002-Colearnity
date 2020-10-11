const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// router.use("/api", require("./api"));

module.exports = router;
