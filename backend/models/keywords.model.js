const mongoose = require('mongoose');

const keywordsSchema = new mongoose.Schema({
  name: { 
    type: String, 
    unique: true,
    },
});

module.exports = mongoose.model('Keyword', keywordsSchema);