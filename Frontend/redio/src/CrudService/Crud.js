import { getAccessToken, refreshToken } from "../AuthService/AuthService"

const BASE_URL = "http://127.0.0.1:8000"
export const postquestion = async (title, code_sample) => {

    console.log(title)
    console.log(code_sample)
    if (title === "") {
        return;
    }
    const endpoint = "/question/post"
    let API_OPTIONS = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify({
            "content": title,
            "code_sample": code_sample,
        })
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, API_OPTIONS)
    if (response.status === 403) {
        refreshToken()
        postquestion(title, code_sample);
    } else if (response.status == 201) {
        const data = await response.json();
        return data
    } else if (!response.ok) {
        console.log("Error Posting question");
        return null
    }


}


export const putComment = async (comment, code_sample, post_id) => {
    const endpoint = "/question/putanswer/"
    let auth_token = getAccessToken()
    let API_OPTIONS = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify({
            "content": comment,
            "code_sample": code_sample,
            "post_id": post_id,
        })
    }

    let response = await fetch(`${BASE_URL}${endpoint}`, API_OPTIONS)
    if (response.status === 401) {
        refreshToken()
        putComment(comment, code_sample, post_id)
    } else if (response.status === 201) {
        const data = await response.json();
        return data;
    } else if (!response.ok) {
        console.log("Error: ", response.statusText);
        return null;
    }

}

export const getDashboard = async () => {
    const endpoint = "/user/profile"
    let API_OPTIONS = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAccessToken()}`,
        }
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, API_OPTIONS)

    if (response.status == 403) {
        refreshToken();
        getDashboard()
    } else if (!response.ok) {
        console.log("Error: ", response.statusText);
        return null
    }

    const data = await response.json()
    //console.log(data?.[0].model);
    return data;

}

export const UserProfile = async () => {
    const endpoint = "/user/data"
    let API_OPTIONS = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAccessToken()}`,
        }
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, API_OPTIONS)

    if (response.status == 403) {
        refreshToken();
        getDashboard()
    } else if (!response.ok) {
        console.log("Error: ", response.statusText);
        return null
    }

    const data = await response.json()
    return data;

}

export const EditPost = async (pk,code_sample,title)=>{
    const endpoint = "/question/edit";
    const API_OPTIONS ={
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({"pk": pk, "content": title, "code_sample": code_sample}),
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, API_OPTIONS)

    if (response.status == 403) {
        refreshToken();
        getDashboard()
    } else if (!response.ok) {
        //console.log("Error: ", response.statusText);
        return false
    }

    const data = await response.json()
   // console.log(data);
    return true;
}


export const DeleteQuestion = async (pk)=>{
    const endpoint = "/question/delete/";
    const API_OPTIONS = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({"pk": pk}),
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, API_OPTIONS);

    if (response.status == 403) {
        refreshToken();
        getDashboard();
    } else if (!response.ok) {
        //console.log("Error: ", response.statusText);
        return false
    }

    const data = await response.json()
    //console.log(data);
    return true;
}