var mongoose = require('mongoose');

var Channel = mongoose.Schema({
    id: String,
    name: String,
});

module.exports = Channel;