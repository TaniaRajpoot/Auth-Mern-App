
const router = require('express').Router();

const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middleware/Validation'); // ✅ MUST match actual file name



router.post('/login', loginValidation,login);


router.post('/signup', signupValidation, signup);

module.exports = router;
