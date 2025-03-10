import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Question from "./components/Question";
import QuestionLoader from "./components/QuestionLoader";
import Navbar from "./components/Navbar";
import Qinfos from "./components/Qinfos";
import { login, getAccessToken, refreshToken } from "./AuthService/AuthService";
const VERSION = 2;
const endp = ""
const API_BASE_URl = `http://127.0.0.1:8000/`



function App() {
    const accessToken = getAccessToken()
    const API_OPTIONS = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },

    }
    console.log("refresh " + localStorage.getItem("refreshToken"))
    const [movieList, setMovieList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [erroMsg, setErrMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isAuth, setIsAuth] = useState('')
    const fetchQuestions = async () => {
        setIsLoading(true)
        try {

            const endpoint = `${API_BASE_URl}`
            let response = await fetch(endpoint, API_OPTIONS)
            if (response.status === 403) {
               const new_token = refreshToken();
                //const accessToken = getAccessToken()
                const API_OPTIONS = {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${getAccessToken()}`,
                    },

                }
                response = await fetch(endpoint, API_OPTIONS)
            } else if (!response.ok) {
                console.log("An unexpected error occured");
                setMovieList({})
                return null;
            }
            const data = await response.json()

            if (data.Response === 'False') {
                setErrMsg(data.Error || 'Failed to fetch data')
                setMovieList({})
                return;
            }
            // console.log(data)
            setMovieList(data || [])
            console.log(movieList)
        } catch (error) {
            console.error(error)

        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchQuestions()
        setIsAuth(localStorage.getItem("accessToken"))
    }, [])

    return (
        <main className="">
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <Qinfos />
            {
                isLoading ?
                    <>
                        <QuestionLoader />
                        <QuestionLoader />
                        <QuestionLoader />
                        <QuestionLoader />
                    </> :
                    erroMsg ?
                        <>
                            <p className="text-black">An Error Occured. Please reload</p>
                        </>
                        :
                        <>
                            {isAuth && <p className="text-black">You are authenticated </p>}
                            <Question data={movieList} />
                        </>

            }

        </main>
    );
}

export default App;
