const express = require('express');
const {
  register,
  login,
  forgotPassword,
  resetpassword,
} = require('../controllers/auth');

const router = express();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resetToken').put(resetpassword);

module.exports = router;
