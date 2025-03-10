
const API_URL = "http://127.0.0.1:8000"

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
    const response = await fetch(`${API_URL}/auth/tokenrefresh/`,API_OPTIONS)


    if (!response.ok) return null;

    const data = await response.json()
    localStorage.setItem("accessToken", data.access)
    return response.access
}catch (error){
    console.log("Error refreshing token", error)
    return null;
}

}



export  const getAccessToken = () => localStorage.getItem("accessToken");
export  const getRefreshToken = () => localStorage.getItem("refreshToken");