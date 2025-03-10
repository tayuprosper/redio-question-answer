import { useState } from "react";
import { login } from "./AuthService/AuthService";
import { Link, Navigate, useNavigate } from "react-router-dom";


function LoginPage() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    // const [username,setUsername] = useState('')
    const navigate = useNavigate()
    const handleLogin = async (e)=>{
        e.preventDefault()
        const data = await login(username,password)
        if (data){
           navigate("/")
        }
    }

    return ( 
        <div className="login h-[100vh] w-full flex items-center text-center">
            <div className="form w-[100vw] flex text-center items-center">
            
                <form method="POST" onSubmit={handleLogin} className="flex flex-col items-center text-center w-full">
                    <h2 className="font-bold text-3xl">LOGIN</h2>
                    <input type="text" name="username" id="" placeholder="Enter username" value={username} onChange={(e)=> setUsername(e.target.value)} />
                    <input type="password" name="password" id="" placeholder="Enter password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    <button type="submit" className="font-bold text-white">LOG IN</button>
                    <p className="mt-6">Don't have an acount yet? <Link to={"/signup"}><span className="text-blue-700 font-bold cursor-pointer">sign up now</span></Link></p>
                </form>
            </div>
        </div>
     );
}

export default LoginPage;