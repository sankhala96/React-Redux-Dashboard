const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../modals/User');

// Register new user
router.post('/', (req, res) => {
    const { userName, fullName, email, password } = req.body;

    if(!userName || !fullName || !email || !password) {
        res.status(400)
        res.json({ msg: 'Please enter all fields' });
        return;
    }

    // Check for existing
    User.findOne({ email })
        .then(user => {
            if(user) {
                res.status(400)
                res.json({ msg: 'User already exists' });
                return;
            }    
        
            const newUser = new User({
                userName,
                fullName,
                email,
                password
            });

            // Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
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
                                            fullName: user.fullName,
                                            email: user.email
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })
});

module.exports = router;