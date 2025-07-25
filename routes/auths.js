const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email } = req.body;
  res.json({ success: true, user: { email } });
});

module.exports = router;
