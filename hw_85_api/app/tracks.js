const express = require('express');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const Track = require('../models/Track');

const router = express.Router();

router.get('/', (req, res) => {
    if (req.query.album) {
        Track.find({album: req.query.album}).sort({number: 1})
            .then(result => {
                if (result) return res.send(result);
                res.sendStatus(404)
            })
            .catch(() => res.sendStatus(500));
    } else {
        Track.find()
            .then(tracks => {
                res.send(tracks)
            }).catch(() => res.sendStatus(500))
    }
});

router.post('/', [auth, permit('user', 'admin')], (req, res) => {
    const track = new Track({...req.body, user: req.user._id});
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


router.delete('/:id/delete', [auth, permit('admin')], (req, res) => {
    Track.findByIdAndDelete(req.params.id)
        .then(() => res.send({message: 'success'}))
        .catch(() => res.sendStatus(500).send(error))
});

module.exports = router;