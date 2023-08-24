import React, { useState } from "react";
import "./style.css";
import Login from "../../Components/Login";
import Signup from "../../Components/Signup";
const Authentication=()=>{
    const[login,setLogin]=useState(true);
    return(
        <div className="center  auth flex page">
            {login? 
            (<Login onToggle={()=>setLogin(false)}/>)
            :
            (<Signup onToggle={()=>setLogin(true)}/>)}
           
        </div>
    );
}
export default Authentication;