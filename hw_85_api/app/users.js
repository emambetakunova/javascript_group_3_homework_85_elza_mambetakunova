const express = require('express');

const User = require('../models/User');


const router = express.Router();

router.post('/', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.generateToken();

    user.save()
        .then(user => res.send({username: user.username, message: 'User registered', user}))
        .catch(error => res.status(400).send(error))
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'Username/password incorrect'})
    }

    const isMatch = user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Username/password incorrect'})
    }

    user.generateToken();

    await user.save();

    res.send({token: user.token, username: user.username, role: user.role})
});


router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Logged out'};

    if (!token) {
        return res.send(success);
    }
    const user = await User.findOne({token});

    if (!user) {
        return res.send(success);
    }

    user.generateToken();
    await user.save();

    return res.send(success);
});


module.exports = router;