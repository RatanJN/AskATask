const express = require('express')
const router = express.Router()
const register = require('../models/register')
const login = require('../models/login')

//register
router.get('/register', (req, res) => {
    res.send('register')
})

//login
router.get('/login', (req, res) => {
    res.send('login')
})

module.exports = router