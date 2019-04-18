const mongoose = require('mongoose');
const config = require('./config');


const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const artist = await Artist.create(
        {
            name: 'Adele',
            description: 'Adele Laurie Blue Adkins',
            image: 'adele.jpg'
        },
        {
            name: 'Michael Jackson',
            description: 'Michael Joseph Jackson',
            image: 'michael.jpg'
        }
    );

    const album = await Album.create(
        {
            title: 'Adele 21',
            release: 2011,
            artist: artist[0]._id,
            image: 'adele21.jpg'
        },
        {
            title: 'Adele 19',
            release: 2008,
            artist: artist[0]._id,
            image: 'adele19.jpg'
        },
        {
            title: 'Dangerous',
            release: 1991,
            artist: artist[1]._id,
            image: 'dangerous.jpg'
        },
        {
            title: 'Thriller',
            release: 1982,
            artist: artist[1]._id,
            image: 'thriller.jpg'
        }
    );

    const track = await Track.create(
        {
            title: 'Rolling in the Deep',
            length: 3,
            number: 1,
            album: album[0]._id
        },
        {
            title: 'He Want Go',
            length: 3,
            number: 2,
            album: album[0]._id
        },
        {
            title: 'Best for Last',
            length: 3,
            number: 3,
            album: album[1]._id
        },
        {
            title: 'First Love',
            length: 4,
            number: 4,
            album: album[1]._id
        },
        {
            title: 'One and Only',
            length: 4,
            number: 5,
            album: album[0]._id
        },
        {
            title: 'Tired',
            length: 3,
            number: 6,
            album: album[1]._id
        },
        {
            title: 'Billie Jean',
            length: 4,
            number: 1,
            album: album[3]._id
        },
        {
            title: 'Dangerous',
            length: 4,
            number: 2,
            album: album[2]._id
        },
        {
            title: 'Black or White',
            length: 4,
            number: 3,
            album: album[3]._id
        },
        {
            title: 'Remember the time',
            length: 4,
            number: 4,
            album: album[2]._id
        },
        {
            title: 'Thriller',
            length: 4,
            number: 5,
            album: album[3]._id
        },
        {
            title: 'The Lady in My Life',
            length: 4,
            number: 6,
            album: album[3]._id
        }
    );



    await connection.close();

};

run().catch(error => {
    console.error('Something went wrong', error);
});