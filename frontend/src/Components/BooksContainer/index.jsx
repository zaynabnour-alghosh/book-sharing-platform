import BookCard from "../BookCard";
import "./style.css";
import {AiOutlineSearch,AiOutlineArrowRight} from "react-icons/ai";

const BookContainer=()=>{
    return(
        <div className="flex row content">
            <div className="primary-bg flex column">
                <div className="header">
                    <h2>
                    All Suggestions
                    </h2> 
                </div>
                <div className="books-container center flex">
                    <BookCard />
                    <BookCard />
                    <BookCard />
                </div>
            </div>
            <div className="books-search flex column">
                <div className="top-search flex row">
                    <div className="search primary-bg flex row">
                        <input 
                            type="text" 
                            placeholder='Seach Books...' 
                            name="search" 
                            // value={search}
                            // onChange={(e) => setSearch(e.target.value)}
                            // onKeyDown={(e) => {
                            //     if (e.key === 'Enter') {
                            //       handleSearch(e);
                            //     }
                            //   }}
                            />
                        <AiOutlineSearch  size={50}/>
                    </div>                        
                </div>
                <div className="search-results">
                    <h2>Here goes the search results</h2>
                </div>
                

            </div>
        </div>

        
        
    );
}
export default BookContainer;
   