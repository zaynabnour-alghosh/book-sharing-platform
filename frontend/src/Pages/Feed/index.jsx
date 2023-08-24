import BookCard from "../../Components/BookCard";
import FollowingBookCard from "../../Components/FollowingBookCard";
import SideBar from "../../Components/SideBar";
import "./style.css";
const Feed=()=>{
    return(
        <div className=" feed page flex">
			<SideBar
				items={["Books", "New", "Feed"]}
				selected={"Feed"}
			/>
			<div className="container flex column feed-container">
            <div className="followings-books-container flex column">
                   <FollowingBookCard />
                   <FollowingBookCard />
                   <FollowingBookCard />
                   <FollowingBookCard />
                </div>

            </div>
        </div>

    );
}
export default Feed;