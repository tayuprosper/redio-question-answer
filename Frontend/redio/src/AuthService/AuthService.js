
const API_URL = "http://127.0.0.1:8000"
import { useNavigate } from "react-router-dom";


export const register = async (username, first_name, last_name, email, password)=>{
    const meta = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username,first_name, last_name,email,password})
    }   

    const  response = await fetch(`${API_URL}/user/create/`,meta);
    if (!response.ok){
        return null
    }
    const data = await response.json();
    localStorage.setItem("accessToken", data.access)
    localStorage.setItem("refreshToken", data.refresh)
    return data

};

export const login = async (username, password)=>{
    const meta = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    }   



    const response = await fetch(`${API_URL}/login/`,meta);

    const data = await response.json();
    if (response.ok){
        if (data.access){
            localStorage.setItem("accessToken", data.access)
            localStorage.setItem("refreshToken", data.refresh);
            return data.access
        }else{
            logout();
            return null;
        }
    }
}

export const logout = ()=>{
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken");
}


export const refreshToken = async () => {

    try {
    const token = getRefreshToken();
    let API_OPTIONS = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({"refresh": token})
    }
    const endpoint = '/auth/tokenrefresh/'
    const response = await fetch(`${API_URL}${endpoint}`,API_OPTIONS)


    if (!response.ok){
        window.location.href = "/login"
        logout();
        window.dwes
    };

    const data = await response.json()
    localStorage.setItem("accessToken", data.access)
    return response.access
}catch (error){
    console.log("Error refreshing token", error)
    return null;
}

}


export const editProfile = async (username, first_name, last_name, email, ) =>{
    const endpoint = "/user/editprofile";
    const API_OPTIONS = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({
            "last_name": last_name,
            "first_name": first_name,
            "email": email,
            "username": username,
        })
    }


        const response = await fetch(`${API_URL}${endpoint}`, API_OPTIONS);
    
        if (response.status == 403) {
            refreshToken();
            editProfile(username, first_name,  last_name, email);
        } else
        if (!response.ok) {
            console.log("Error: ", response.statusText);
            return false
        }  else {
        const data = await response.json()
        console.log(data);
        return true;
    }
}



export  const getAccessToken = () => localStorage.getItem("accessToken");
export  const getRefreshToken = () => localStorage.getItem("refreshToken");