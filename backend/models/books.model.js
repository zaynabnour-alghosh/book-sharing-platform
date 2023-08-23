const mongoose = require('mongoose');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
});

module.exports = mongoose.model('Genre', genreSchema);
const booksSchema = new mongoose.Schema({
    title: { 
        type: String
    }, 
    author: {
        type: String
        },
    pictureUrl:{
        type: String    
        },
    review: { 
        type: String 
        },
    user:{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    likes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ], 
    genre: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Genre' 
    },
    keywords: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Keyword' }
    ],
});

module.exports = mongoose.model('Book', booksSchema);