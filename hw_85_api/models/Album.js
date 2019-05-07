const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String, required: true
    },
    release: {
        type: String, required: true
    },
    image: String,
    published: {
        type: Boolean, default: false
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;