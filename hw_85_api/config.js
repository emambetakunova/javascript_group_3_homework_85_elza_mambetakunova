const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    dbUrl: 'mongodb://localhost/musicApp',
    mongoOptions: {
        useNewUrlParser: true,
        useCreateIndex: true
    },
    facebook: {
        appId: "723759694703408",
        appSecret: "bb0a6c0e93315c0fa26af87af6ec1fe3"
    }
};
