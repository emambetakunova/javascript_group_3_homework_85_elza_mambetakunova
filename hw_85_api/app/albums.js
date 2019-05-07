const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const nanoid = require('nanoid');
const auth = require('../middleware/auth');
const tryAuth = require('../middleware/tryAuth');
const permit = require('../middleware/permit');

const Album = require('../models/Album');

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

router.get('/', tryAuth, (req, res) => {
    let criteria = {published: true};
    if (req.user && req.query.artist) {
        criteria = {
            artist: req.query.artist,
            $or: [
                {published: true},
                {user: req.user._id}
            ]
        }
    }
    Album.find(criteria).sort({release: 1}).populate('artist')
        .then(result => {
            if (result) return res.send(result);
            res.sendStatus(404)
        })
        .catch(error => res.status(500).send(error));

});

router.get('/:id', (req, res) => {
    Album.findById(req.params.id).populate('artist')
        .then(album => res.send(album))
        .catch(() => res.sendStatus(500))
});


router.post('/', [auth, permit('user', 'admin'), upload.single('image')], (req, res) => {
    const albumData = req.body;
    if (req.file) {
        albumData.image = req.file.filename;
    }
    const album = new Album({
        title: req.body.title,
        release: req.body.release,
        artist: req.body.artist,
        user: req.user._id
    });
    album.save()
        .then(result => res.send(result))
        .catch(error => res.sendStatus(400).send(error));
});

router.post('/:id/toggle_published', [auth, permit('admin')], async (req, res) => {

    const album = await Album.findById(req.params.id);

    if (!album) {
        return res.sendStatus(404)
    }

    album.published = !album.published;

    await album.save()
        .then(result => res.send(result))
        .catch(error => res.sendStatus(400).send(error));
});

router.delete('/:id', [auth, permit('admin')], (req, res) => {
    Album.deleteOne({_id: req.params.id})
        .then(() => res.send({message: 'success'}))
        .catch(() => res.sendStatus(500).send(error))
});


module.exports = router;