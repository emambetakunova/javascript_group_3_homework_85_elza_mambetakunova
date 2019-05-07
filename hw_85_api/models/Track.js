const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String, required: true
    },
    length: {
        type: Number, required: true
    },
    number: {
        type: Number, required: true
    },
    published: {
        type: Boolean, default: false
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;