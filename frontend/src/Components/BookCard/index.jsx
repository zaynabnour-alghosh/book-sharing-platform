import React from "react";
import "./style.css";
import { sendRequest } from "../../config/request";
import { FaHeart,FaRegHeart} from 'react-icons/fa';
import { useState } from "react";

const BookCard=({_id,title,author,pictureUrl,review ,genre,likes,username,usernameId})=>{
    const [isFollowing, setIsFollowing] = useState(false);
   const userId=usernameId;
   console.log(userId)
   const Follow = async() => {
    setIsFollowing((prevState) => !prevState);
        console.log(userId)
        const data = new FormData();
        data.append('userToFollowId', userId);
        try {
            const response=await sendRequest({
            method:"POST",
            route:"/user/follow",
            body:data,
            includeHeaders:true
        });
            console.log(response)

        } catch (error) {
            console.error("Error fetching book cards:", error);
        }
    };


  
    
    return(
<div class="BookCard-container flex">
    <div class="BookCard-link flex column" >
        <div className="owner"> 
            <strong>{username}</strong>  
            <span>
                <button className={`btnFollow ${isFollowing ? 'following' : ''}`}
                onClick={Follow}
        >
          {isFollowing ? 'Following' : 'Follow'}</button>
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
    </div>
</div>
    );
}
export default BookCard;