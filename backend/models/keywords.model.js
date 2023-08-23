const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema({
  name: { 
    type: String, 
    unique: true,
    },
});

module.exports = mongoose.model('Keyword', keywordSchema);