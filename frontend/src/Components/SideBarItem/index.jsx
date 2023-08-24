import React, { useState } from "react";
import "./style.css";
import {BiBookOpen} from "react-icons/bi";
import {BsBox2Heart} from "react-icons/bs";
import {FiLogOut} from "react-icons/fi";
import {BiBookAdd} from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

const SideBarItem = ({ label, selected, onSelected }) => {
	const navigation = useNavigate();
	const location = useLocation();
	const clickHandler = () => {
		onSelected(label);
		if (label==="Books"){
			navigation(`/books`);
		}
		else if (label==="New"){
			navigation(`/new`);
			
		}
		else if (label==="Feed"){
			navigation(`/feed`);
			
		}

	};

	let icon;
	if (label === "Books") {
		icon = <BiBookOpen />;
	} else if (label === "New") {
		icon = < BiBookAdd/>;
	} else if (label === "Feed") {
		icon = <BsBox2Heart />;
	}
	
	return (
		<div
			className={selected ? `sidebar-item active` : `sidebar-item`}
			onClick={() => clickHandler()}
		>
			{icon}
			{label}
		</div>
	);
}

export default SideBarItem;
