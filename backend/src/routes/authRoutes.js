const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/time', authController.getTime);
router.post('/kickout', authController.kickout);
router.post('/generate-link', authController.generateOneTimeLink);
router.get('/validate/:token', authController.validateOneTimeLink);

module.exports = router;
