const User = require("../models/users.model")
const Genre=require("../models/genres.model")
const Keyword=require("../models/keywords.model")
const Book=require("../models/books.model")
const { isValidObjectId } = require('mongoose');

const postBook = async (req,res)=> {
    const user = await User.findById(req.user._id);
    try{
        const userId=user._id;
        const {title,author,pictureUrl,review,genreName,keywordNames}=req.body;
        let nameGenre=await Genre.findOne({name:genreName});
        if (!nameGenre){
            nameGenre=new Genre({name:genreName});
            await nameGenre.save();
        }
        const existingKeywords = await Keyword.find({ name: { $in: keywordNames } });
        const existingKeywordNames = existingKeywords.map(keyword => keyword.name);
    
        const newKeywords = keywordNames
          .filter(keywordName => !existingKeywordNames.includes(keywordName))
          .map(keywordName => new Keyword({ name: keywordName }));
    
        for (const keyword of newKeywords) {
          await keyword.save();
        }
        const newBook=new Book({
            title,
            author,
            pictureUrl,
            review,
            user:userId,
            genre: nameGenre._id,
            keywords: existingKeywords.concat(newKeywords).map(keyword => keyword._id),
            likes:[],

        });
        await newBook.save();
        await User.findByIdAndUpdate(userId,{$push:{books:newBook._id}});
        await newBook.populate('genre keywords');
        res.status(201).json({message:"Success",book:newBook});


    }catch(error){
        res.status(500).json({message:"An error has occured while posting a book",error:error.message});
    }
};



const searchBook = async (req,res)=> {
    try {
        const { filter } = req.body;
        const regexFilter = new RegExp(filter, 'i');
        let searchBooks;
        let searchType;
        const genre = await Genre.findOne({ name: regexFilter });
        if (genre) {
            searchBooks = await Book.find({ genre: genre._id }).populate('genre keywords');
            searchType = 'genre';
        }
        else {
            const keywords = await Keyword.find({ name: regexFilter });
            if (keywords && keywords.length > 0) {
                const keywordIds = keywords.map(keyword => keyword._id);
                searchBooks = await Book.find({ keywords: { $in: keywordIds } }).populate('genre keywords');
                searchType = 'keyword';
            } 
            else{
            searchBooks = await Book.find({ author: regexFilter }).populate('genre keywords');
            searchType = 'author';
            }
        }
        res.json({ filter:searchType, books: searchBooks });
    
    } catch (error) {
        console.error('An error has occured while searching for books:', error);
        res.status(500).json({ message: 'Error searching for books', error: error.message });
    }
}
const followBookLover = async (req,res)=> {
    const user = await User.findById(req.user._id);
    try{
        const {userToFollowId}=req.body;
        const userToFollow=await User.findById(userToFollowId);
        user.following.push({user:userToFollowId,username:userToFollow.username});
        await user.save();
        userToFollow.followers.push({user: req.user._id ,username: user.username});
        await userToFollow.save();
        res.json({ message:"successfull follow"});
    }catch(error){
        res.status(500).json({message:"An error has occured while following user"});
    }
}   

module.exports = {
    postBook,
    searchBook,
    followBookLover
  };
