import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { editProfile } from "./AuthService/AuthService";
import { useNavigate } from "react-router-dom";
function EditProfile() {
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state;
    const [username, setUsername] = useState(data.fields.username)
    const [firstname, setFirstName] = useState(data.fields.first_name)
    const [lastname, setLastName] = useState(data.fields.last_name)
    const [email, setEmail] = useState(data.fields.email)
    const [error, setError] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    const updateProfile = async (e)=>{
        setIsEditing(true)
        e.preventDefault();
        const res = await editProfile(username, firstname, lastname, email);
        if (!res){
            setIsEditing(false)
            setError("Something Went wrong, try again");
        }else{
            setIsEditing(false)
            navigate("/dashboard");
        }
    }
    return ( 
      <div className="editprofile shadow-xl p-5 rounded-xl my-15 w-[100%] flex flex-col gap-4 items-center">
        <form className="flex flex-col items-center text-center w-full">
                <h2 className="font-bold text-3xl">Edit Profile</h2>
                {
                    error && <p className="text-red-600 font-bold">{error}</p>
                }
                <input type="text" name="username" id="" placeholder="username"  value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <input type="text" name="first_name" id="" placeholder="first name"   value={firstname} onChange={(e)=>setFirstName(e.target.value)}/>
                <input type="text" name="last_name" id="" placeholder="last name"  value={lastname} onChange={(e)=>setLastName(e.target.value)}/>
                <input type="email" name="email" id="" placeholder="Enter email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <button  onClick={(e)=>updateProfile(e)} type="submit" className="font-bold text-white" disabled={isEditing}>{ isEditing ? "Please Wait..." : "UPDATE"}</button>
            </form>
      </div>
     );
}

export default EditProfile;