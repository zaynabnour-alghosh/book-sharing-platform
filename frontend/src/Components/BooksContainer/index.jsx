import BookCard from "../BookCard";
import "./style.css"
const BookContainer=()=>{
    return(
        <div className="books-container page primary-bg flex column">
            <BookCard />
            <BookCard />
            <BookCard />
        </div>
    );
}
export default BookContainer;
   