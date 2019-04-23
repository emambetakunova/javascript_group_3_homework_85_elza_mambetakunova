const express = require('express');
const auth = require('../middleware/auth');
const History = require('../models/TrackHistory');


const router = express.Router();

router.get('/', auth, (req, res) => {
    History.find({user: req.user._id}).populate({path: 'track', populate: {path: 'album', populate: {path: 'artist'}}}).sort({datetime: -1})
        .then(trackHistory => {
            res.send(trackHistory)
        })
        .catch(() => res.sendStatus(500))
});


router.post('/', auth, async (req, res) => {
    try {
        const trackHistory  = {
            user: req.user._id,
            track: req.body.track,
            datetime: new Date().toISOString()
        };
        const history = new History(trackHistory);
        await history.save();

        res.send(history)

    } catch (e) {
        res.send({message: 'Error happened'})
    }
});


module.exports = router;