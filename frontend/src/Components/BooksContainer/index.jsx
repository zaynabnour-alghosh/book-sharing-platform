import BookCard from "../BookCard";
import "./style.css";
import {AiOutlineSearch} from "react-icons/ai";
import { useEffect, useState } from "react";
import { sendRequest } from "../../config/request";
const BookContainer=()=>{
    const [bookCards, setBookCards] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filter,setFilter]=useState(' ')
    useEffect(() => {
        const fetchBookCards = async () => {
        try {
            const response=await sendRequest({
                method:"POST",
                route:"/user/getAll"})
            setBookCards(response.bookSuggestions);
            console.log(response.bookSuggestions)
        } catch (error) {
            console.error("Error fetching book cards:", error);
      }
    };
    fetchBookCards();
    }, []); 
    const handleSearch = async() => {
        try {
            const filteredResults=await sendRequest({
            method:"POST",
            route:"/user/search-book"});
            console.log(filteredResults)
            setFilter(filteredResults.filter)
            setSearchResults(filteredResults);
            setSearch(' ');
            

        } catch (error) {
            console.error("Error fetching book cards:", error);
      }
      };

    return(
        <div className="flex row content">
            <div className="primary-bg flex column">
                <div className="header">
                    <h2>
                    All Suggestions
                    </h2> 
                </div>
                <div className="books-container center flex">
                    
                    {bookCards.map((bookCard, index) => (
                    <BookCard   key={index}
                                id={bookCard._id}
                                title={bookCard.title}
                                genre={bookCard.genre.name}
                                author={bookCard.author}
                                pictureUrl={bookCard.pictureUrl}
                                review={bookCard.review}
                                likes={bookCard.likes.length}
                                username={bookCard.user.username}
                                usernameId={bookCard.user._id}
                                />
                    ))}
                </div>
            </div>
            <div className="books-search flex column">
                <div className="top-search flex row">
                    <div className="search primary-bg flex row">
                        <input 
                            type="text" 
                            placeholder='Search by author,genre,keywords...' 
                            name="search" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSearch(e);
                                }
                              }}
                            />
                        <AiOutlineSearch  size={50}/>
                    </div>                        
                </div>
                <div className="search-results">
                    <h2>Filter By:{filter}</h2>
                </div>
            </div>
        </div>
    );
}
export default BookContainer;
   