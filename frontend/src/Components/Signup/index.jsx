import "./style.css";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { sendRequest } from "../../config/request";

const Signup=({onToggle})=>{
    const navigate = useNavigate();
    const signupButton=useRef();
    const [data,setData]=useState({
        username:"",
        email:"",
        password:"",
    });
    const { username,email,password } = data;
    const handleChange=(e)=>{
        setData({...data,[e.target.name] : e.target.value});
    };
    const handleSignup=async(e)=>{
        signupButton.current.disabled=true;
        signupButton.current.textContent="Loading...";
        if(!username || !email || !password){
            signupButton.current.disabled = false;
			signupButton.current.textContent = "Fill all fields";
            setTimeout(() => {
				signupButton.current.textContent = "Sign Up";
			}, 2000);
			return;
        }
        try{
            const response=await sendRequest({
                method:"POST",
                route:"/auth/register",
                body:data,
            });

            if(response.message==="user created successfully"){
                console.log(response.message)
                signupButton.current.disabled = false;
				signupButton.current.textContent = "Success";
                setTimeout(() => {
                    navigate("/");
                    onToggle(); 
                },1000);
            }
        }catch(error){
            console.log(error);
			signupButton.current.disabled = false;
			signupButton.current.textContent = "Failed";
			setTimeout(() => {
				signupButton.current.textContent = "Sign Up";
			}, 2000);
        }
    }
    return (
        <div className="signup page  flex center">
            <div className="signup-container flex column center">
                <h1>Create your account</h1>        
                <div className="signup-row flex column">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="username" 
                        placeholder="Username" 
                        name="username"
						value={username}
						onChange={handleChange}
                        />
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email"
						value={email}
						onChange={handleChange}
                        />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password"
						value={password}
						onChange={handleChange}
                        />
                    <button 
                        className="btn-signup"
                        ref={signupButton}
						onClick={handleSignup}
                        >Sign up</button>
                    <div className="option-login">
                        Already have an account?<span onClick={() => onToggle()}>Log in</span>
                    </div>    
                </div>
            </div>
        </div>
      );
} 
export default Signup;
