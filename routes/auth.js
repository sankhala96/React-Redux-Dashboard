const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

const User = require('../modals/User');

// Login User
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400)
        res.json({ msg: 'Please enter all fields' });
        return;
    }

    // Check for existing
    User.findOne({ email })
        .then(user => {
            if(!user) {
                res.status(400)
                res.json({ msg: 'User does not exists' });
                return;
            }

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) {
                        res.status(400)
                        res.json({ msg: 'Invalid Credentials' });
                        return;
                    }

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    userName: user.userName,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
});

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})

module.exports = router;