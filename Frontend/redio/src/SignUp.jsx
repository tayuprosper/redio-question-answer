import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "./AuthService/AuthService";
import Loading from "./components/Loading";
import { Link } from "react-router-dom";
function SignUp() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [passwordC,setPasswordC] = useState('')
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [formEror, setFormError] = useState('')
    const [email,setEmail] = useState('')
    const navigate = useNavigate()
    const  handleSignup = async (e)=>{
        e.preventDefault()
        if (password != passwordC){
            setFormError("Password don't match")
            return
        }
        const res = await register(username,firstname, lastname,email,password)
        if (res){
            navigate("/")
        }
    }

    return (
        <div className="login h-[100vh] w-full flex items-center text-center">
        <div className="form w-[100vw] flex text-center items-center">
        {
            formEror && <p className="text-red">{formEror}</p>
        }
            <form action="" className="flex flex-col items-center text-center w-full shadow-2xl py-10 rounded-xl">
                <h2 className="font-bold text-3xl">Signup</h2>
                <input type="text" name="username" id="" placeholder="username" value={username} onChange={(e)=> setUsername(e.target.value)} />
                <input type="text" name="first_name" id="" placeholder="First name" value={firstname} onChange={(e)=> setFirstname(e.target.value)} />
                <input type="text" name="last_name" id="" placeholder="Last name" value={lastname} onChange={(e)=> setLastname(e.target.value)} />
                <input type="email" name="email" id="" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input type="password" name="password" id="" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                <input type="password" name="password" id="" placeholder="Confirm Password" value={passwordC} onChange={(e)=> setPasswordC(e.target.value)} />
                <button type="submit" onClick={handleSignup} className="font-bold text-white">Sign up</button>
                <p className="mt-6 font-bold">Have an acount already? <Link to={"/login"}><span className="text-blue-700 font-bold cursor-pointer"> log in now</span></Link></p>
            </form>
        </div>
    </div>
    );
}

export default SignUp;