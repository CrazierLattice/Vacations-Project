const { registerAction } = require('../actions/RegisterActions')
const router = require('express').Router()

router.post('/' , registerAction)

module.exports = router