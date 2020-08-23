const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const Post = require('../modals/Post');

router.get('/', auth, (req, res) => {
    const skip = parseInt(req.query.skip);
    const limit = 5;

    Post.find()
        .skip(skip)
        .limit(limit)
        .then(posts => {
            res.status(200);
            res.json(posts);
        })
        .catch(err => {
            res.status(401);
            res.json({ msg: err });
        })
})

module.exports = router;