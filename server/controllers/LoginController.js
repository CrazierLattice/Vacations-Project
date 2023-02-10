const { login, refreshToken } = require('../actions/LoginActions');

const router = require('express').Router()

router.post('/',login);
router.post('/refresh',refreshToken);


module.exports = router;