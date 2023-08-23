const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema({
  name: { 
    type: String, 
    unique: true, 
    },
});

module.exports = mongoose.model('Genre', genresSchema);