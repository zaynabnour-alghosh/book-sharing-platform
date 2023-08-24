import SideBar from "../../Components/SideBar";
import BookContainer from "../../Components/BooksContainer";
import "./style.css";
const Home=()=>{
    return(
        <div className=" home page flex">
			<SideBar
				items={["Books", "New", "Feed"]}
				selected={"Books"}
			/>
			<div className="container flex book-container">
                <BookContainer />
            </div>
        </div>

    );
}
export default Home;