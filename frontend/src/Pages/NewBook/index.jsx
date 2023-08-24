import CreateBook from "../../Components/CreateBook";
import React from "react";
import { useState,useEffect } from 'react';
import SideBar from "../../Components/SideBar";
import "./style.css";
const NewBook=()=>{
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
};
    return (
        <div className=" new page flex">
        <SideBar
            items={["Books", "New", "Feed"]}
            selected={"New"}
        />
        <div className="container flex center book-container">
        <button onClick={toggleModal} className="newBook">Create New Suggestion </button>
            <CreateBook showModal={showModal} toggleModal={toggleModal} />
        </div>
    </div>
    );
}
export default NewBook;