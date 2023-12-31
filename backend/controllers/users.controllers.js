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

const unfollowBookLover = async (req,res)=> {
    const user = await User.findById(req.user._id);
    try{
        const {userToUnfollowId}=req.body;
        const userToUnfollow=await User.findById(userToUnfollowId);
        user.following=user.following.filter((followedUser)=>followedUser.user.toString() !== userToUnfollowId);
        await user.save();
        userToUnfollow.followers=userToUnfollow.followers.filter((follower)=>follower.user.toString() !== req.user._id);
        await userToUnfollow.save();
        res.json({ message:"successfull unfollow"});
    }catch(error){
        res.status(500).json({message:"An error has occured while unfollowing user"});
    }
}   

const viewFollowingFeed = async (req,res)=> {
    const user = await User.findById(req.user._id);
    try{
        const followingUsersIds=user.following.map((followedUser)=>followedUser.user);
        const followingBookFeed= await Book.find({user:{$in:followingUsersIds}})
            .populate('user')
            .populate('genre keywords')
            .sort('-createdAt');
        res.json({ feed:followingBookFeed});
    }catch(error){
        console.error('An error has occured:', error);

        res.status(500).json({message:"An error has occured while viewing followings' feed"});
    }
}

const likeBook = async (req,res)=> {
    const userId = req.user._id;
    const { bookId } = req.body;
    try {
        const book = await Book.findById(bookId);
        if (!book) {
        return res.status(404).json({ message: 'Book not found' });
        }

        const alreadyLiked = book.likes.includes(userId);

        if (!alreadyLiked) {
        book.likes.push(userId);
        await book.save();
        }

        res.json({ likesCount: book.likes.length });
    } catch (error) {
        console.error('An error has occurred:', error);
        res.status(500).json({ message: 'An error has occurred while liking the book', error: error.message });
    }
}

const unlikeBook = async (req,res)=> {
    const userId = req.user._id;
    const { bookId } = req.body;
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
        const alreadyLiked = book.likes.includes(userId);
  
      if (alreadyLiked) {
        book.likes = book.likes.filter(likedUserId => likedUserId.toString() !== userId.toString());
        await book.save();
      }
  
      res.json({ message: 'Successful unlike', likesCount: book.likes.length });
    } catch (error) {
      console.error('An error has occurred:', error);
      res.status(500).json({ message: 'An error has occurred while unliking the book', error: error.message });
    }
}

module.exports = {
    postBook,
    searchBook,
    followBookLover,
    unfollowBookLover,
    viewFollowingFeed,
    likeBook,
    unlikeBook
  };
