import "./style.css";
import { sendRequest } from "../../config/request";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login=({onToggle})=>{
	const navigate = useNavigate();
    const loginButton=useRef();
    const [credentials,setCredentials]=useState({
        email:"",
        password:"",
    });
    const { email, password } = credentials;
    const handleChange=(e)=>{
        setCredentials({...credentials,[e.target.name] : e.target.value});
    };
    const handleLogin=async(e)=>{
        loginButton.current.disabled=true;
        loginButton.current.textContent="Loading...";
        if(!email || !password){
            loginButton.current.disabled = false;
			loginButton.current.textContent = "Fill all fields";
            setTimeout(() => {
				loginButton.current.textContent = "Log In";
			}, 2000);
			return;
        }
        try{
            const response=await sendRequest({
                method:"POST",
                route:"/auth/login",
                body:credentials,
            });

             if(response){
                console.log(response)
                loginButton.current.disabled = false;
				loginButton.current.textContent = "Success";
                localStorage.setItem(
					"token",
					response.token
				);
                setTimeout(() => {
					loginButton.current.textContent = "Logging In...";
                }, 1000);
                setTimeout(() => {navigate(`/books`)},1000);
            }
        }catch(error){
            console.log(error.response.data);
			loginButton.current.disabled = false;
			loginButton.current.textContent = "Failed";
			setTimeout(() => {
				loginButton.current.textContent = "Log In";
			}, 2000);
        }
    }
    return (
        <div className="login page  flex center">
            <div className="login-container flex column center">
               
                <h1>Log in to BookNook</h1>        
                <div className="login-row flex column">
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
                        className="btn-login" 
                        ref={loginButton}
						onClick={handleLogin}>
                        Log in
                    </button>
                    <div className="option-signup">
                        Don't have an account?<span onClick={() => onToggle()}>Sign up</span>
                    </div>    
                </div>
            </div>
        </div>
      );
} 
export default Login;
