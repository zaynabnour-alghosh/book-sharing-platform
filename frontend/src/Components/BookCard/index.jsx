import React from "react";
import "./style.css";
const BookCard=()=>{
    return(
<div class="BookCard-container flex">
    <a class="BookCard-link flex" href="/books/bookdetails">
        <div class="BookCard-content flex row">
            <div class="BookCard-image flex center">
                <img src="data:image/jpeg;base64,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" />
            </div>
            <div class="BookCard-info flex column">
                <div class="BookCard-name">
                    <h3>Name</h3>
                </div>
                <p class="BookCard-author">
                    Auhtor Name
                </p>
                <div class="BookCard-genre">
                    Personal Development
                </div>
                <p class="BookCard-description">
                    <span class="BookCard-review">
                        Description: 
                    </span>
                    Ikigai explains how you can live a longer and happier life by having a purpose, eating healthy, and not retiring.
                </p>
            </div>
        </div>
    </a>
</div>
    );
}
export default BookCard;