import React, { useState } from "react";
import "./style.css";
import Login from "../../Components/Login";
import Signup from "../../Components/Signup";
const Authentication=({user,setUser})=>{
    const[login,setLogin]=useState(true);
    return(
        <div className="center pager auth flex page-auth">
            {login? 
            (<Login onToggle={()=>setLogin(false)} user={user} setUser={setUser}/>)
            :
            (<Signup onToggle={()=>setLogin(true)} user={user} setUser={setUser}/>)}
           
        </div>
    );
}
export default Authentication;