import { useState } from "react";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import { postquestion } from "./CrudService/Crud";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
function AskQuestion() {
    const navigate = useNavigate()
    const [posted, setposted] = useState(false)
    const [desc, setDesc] = useState('')
    const [code, setCode] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [event, setEvent] = useState(null)
    if (posted){
        navigate("/")
    }
    const postQ = async (e)=>{
        setIsLoading(true)
        e.preventDefault()
       const result = await postquestion(desc,code);
       setIsLoading(false)
       setposted(true)
       if (result){
        <Navigate to={"/"}/>
       }
    }
    return (
        <>
        <Navbar/>
        {
            isLoading && <Loading/>
        }
        <div className="login h-[50vh] w-full flex items-center text-center">
        <div className="form w-[100vw] flex text-center items-center">
        
            <form action="" className="flex flex-col items-center text-center w-full">
                <h2 className="font-bold text-3xl">Ask Your Question</h2>
                <input type="text" name="Description" id="" placeholder="Problem description" value={desc} onChange={(e)=> setDesc(e.target.value)} />
                <textarea type="text" name="code-content" id="" placeholder="code sample - optional" value={code} onChange={(e)=> setCode(e.target.value)} ><code></code></textarea>
                <button type="submit" className="font-bold text-white" onClick={postQ}>Post Question</button>
            </form>
        </div>
    </div>
    <Footer/>
        </>
        
    );
}

export default AskQuestion;