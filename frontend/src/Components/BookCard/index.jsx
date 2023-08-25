import React from "react";
import "./style.css";
import { FaHeart,FaRegHeart} from 'react-icons/fa';

const BookCard=({id,title,author,pictureUrl,review ,genre,likes,username,usernameId})=>{
    

  
    
    return(
<div class="BookCard-container flex">
    <a class="BookCard-link flex column" href="/books/bookdetails">
        <div className="owner"> 
            <strong>{username}</strong>  
            <span>
                <button className="btnFollow">Follow</button>
            </span>
        </div>
        <div class="BookCard-content flex row">
            <div class="BookCard-image flex center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7B-5DYnVMP8DDI6BLsgHz6AVTs5k7LzXDOw&usqp=CAU" />
            </div>
            <div class="BookCard-info flex column">
                <div class="BookCard-name">
                    <h3>{title}</h3>
                </div>
                <p class="BookCard-author">
                    {author} 
                </p>
                <div class="BookCard-genre">
                    {genre}
                </div>
                <p class="BookCard-description">
                    <span class="BookCard-review">
                        Description: 
                    </span>
                    {review}
                </p>
            </div>
        </div>
        <div className="likes"> 
            <FaHeart className="icon like-icon liked"/>
            <span>
                &nbsp; {likes} Likes 
            </span> 
        </div>
    </a>
</div>
    );
}
export default BookCard;