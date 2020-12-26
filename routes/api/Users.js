const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../../Models/User');

// @route GET api/users
// @desc Test Route
// @access Public
router.get('/', (req, res) => res.send('Test Route'));

// @route POST api/users
// @desc Register User Route
// @access Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body;
    //See if user exists
    try {
        //see if user exists
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        user = new User({
            name,
            email,
            password
        });

        //Encrypt the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //save to Mongo
        await user.save()

        const payload = { 
            user: {
                id: user.id
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error!')
    }
});

module.exports = router;