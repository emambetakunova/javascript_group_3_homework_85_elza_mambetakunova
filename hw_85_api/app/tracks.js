const express = require('express');
const auth = require('../middleware/auth');
const tryAuth = require('../middleware/tryAuth');
const permit = require('../middleware/permit');

const Track = require('../models/Track');

const router = express.Router();

router.get('/', tryAuth, (req, res) => {
    let criteria = {published: true};
    if (req.query.album) {
        criteria = {
            album: req.query.album,
            published: true
        }
    }
    if (req.user && req.query.album) {
        criteria = {
            album: req.query.album,
            $or: [
                {published: true},
                {user: req.user._id}
            ]
        }
    }
    Track.find(criteria).populate('album').sort({number: 1})
        .then(result => {
            if (result) return res.send(result);
            res.sendStatus(404)
        })
        .catch(error => res.status(500).send(error));

});


router.post('/', [auth, permit('user', 'admin')], async (req, res) => {
    const number = await Track.find({album: req.body.album});
    const track = new Track({...req.body, user: req.user._id, number: number.length + 1});
    track.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error));
});


router.post('/:id/toggle_published', [auth, permit('admin')], async (req, res) => {
    const track = await Track.findById(req.params.id);

    if (!track) {
        return res.sendStatus(404)
    }

    track.published = !track.published;

    await track.save()
        .then(result => res.send(result))
        .catch(error => res.sendStatus(400).send(error));
});


router.delete('/:id', [auth, permit('admin')], (req, res) => {
    Track.deleteOne({_id: req.params.id})
        .then(() => res.send({message: 'success'}))
        .catch(() => res.sendStatus(500).send(error))
});

module.exports = router;