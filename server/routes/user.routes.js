const router = require('express').Router();

const {
  register,
  login,
  authorization,
} = require('../controller/authController');
const { getUserProfile } = require('../controller/userController');

router.post('/register', register);
router.post('/login', login);

router.use(authorization);
router.get('/profile', getUserProfile);

module.exports = router;
