const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const nanoid = require('nanoid');
const auth = require('../middleware/auth');
const tryAuth = require('../middleware/tryAuth');
const permit = require('../middleware/permit');

const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Track = require('../models/Track');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', tryAuth, async (req, res) => {
    let criteria = {published: true};

    if (req.user) {
        criteria = {
            $or: [
                {published: true},
                {user: req.user._id}
            ]
        }
    }
    const artists = await Artist.find(criteria).sort({artist: 1});
    res.send(artists)
});

router.get('/:id', (req, res) => {
    Artist.findById(req.params.id)
        .then(artist => res.send(artist))
        .catch(() => res.sendStatus(500))
});

router.post('/', [auth, permit('user', 'admin'), upload.single('image')], (req, res) => {
    const artistData = req.body;
    if (req.file) {
        artistData.image = req.file.filename;
    }
    const artist = new Artist({
        name: req.body.name,
        user: req.user._id
    });
    artist.save()
        .then(result => res.send(result))
        .catch(error => res.sendStatus(400).send(error));
});

router.post('/:id/toggle_published', [auth, permit('admin')], async (req, res) => {

    const artist = await Artist.findById(req.params.id);

    if (!artist) {
        return res.sendStatus(404)
    }

    artist.published = !artist.published;

    await artist.save()
        .then(result => res.send(result))
        .catch(error => res.sendStatus(400).send(error));
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    await Artist.deleteOne({_id: req.params.id});

    await Album.find({artist: req.params.id}).then(result => {
        result.forEach((album) => {
            Track.deleteMany({album: album._id})
                .catch(error => res.status(400).send(error))
        })
    });
    await Album.deleteMany({artist: req.params.id});

    res.send('Successful');

});

module.exports = router;