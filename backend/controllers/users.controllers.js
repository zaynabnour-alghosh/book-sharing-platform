const User = require("../models/users.model")
const Genre=require("../models/genres.model")
const Keyword=require("../models/keywords.model")
const Book=require("../models/books.model")

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

module.exports = {
    postBook,
  };
