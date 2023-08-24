
import "./style.css";
import ModalComponent from "../Modal";
const CreateBook=({showModal , toggleModal})=>{
    return (
        <ModalComponent showModal={showModal} onRequestClose={toggleModal}>
            <div className="create-book">
                <h1>New Book Suggestion</h1>
                <div className="create-book__input">
                   <label htmlFor="name">Name</label>
                   <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                        />
                </div>
                <div className="create-book__input">
                   <label htmlFor="author">author</label>
                   <input 
                        type="text" 
                        name="author" 
                        id="author" 
                        // value={cuisine}
                        // onChange={(e) => setCuisine(e.target.value)}
                        />
                </div>
                <div className="create-book__input">
                   <label htmlFor="review">Review</label>
                   <input 
                        type="text" 
                        name="review" 
                        id="review" 
                        // value={cuisine}
                        // onChange={(e) => setCuisine(e.target.value)}
                        />
                </div>
                <div className="create-book__input">
                    <label htmlFor="keywords">Keywords</label>
                    <input
                        type="text"
                        name="keyword"
                        id="keywords"
                        // value={ingredient}
                        // onChange={(e) => setIngredient(e.target.value)}
                        // onKeyDown={(e) => {
                        //     if (e.key === 'Enter') {
                        //       handleIngredientChange(e);
                        //     }
                        //   }}
                    />
                    {/* <ul>
                        {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                        ))}
                    </ul> */}
                </div>
                <div className="create-book__input">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        // multiple
                        // accept="image/*"
                        // onChange={handleImageChange}
                    />
                    {/* <ul>
                        {image.map((img, index) => (
                        <li key={index}>{img.name}</li>
                        ))}
                    </ul> */}
                </div>
                <div className="create-book__buttons">
                  <button className="cancel-button" onClick={toggleModal}>Cancel</button>
                  <button className="confirm-button">Add</button>
                </div>
            </div>
        </ModalComponent>
        
    
    );
}
export default CreateBook;