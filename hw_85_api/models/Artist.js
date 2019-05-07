const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String, required: true
    },
    description: String,
    image: String,
    published: {
        type: Boolean, default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;