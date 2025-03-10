import { useState } from "react";
import { EditPost } from "../CrudService/Crud";
import { useNavigate } from "react-router-dom";
function EditPopUp({codeForEdit, titleForEdit, idForEdit, setIsEditing}) {
    const navigate = useNavigate()
    const [title, setTitle] = useState(titleForEdit)
    const [code, setCode] = useState(codeForEdit)
    const [error, setError] = useState('')
    const [loading, setIsLoading] = useState(false)
    const editQuestion = async ()=>{
        setIsLoading(true)
        const res = await EditPost(idForEdit,code,title);
        if (res){
            setIsLoading(false)
            setIsEditing(false)
            navigate("/dashboard")
        }else{
            setError("Somethin went wrong please try again!!")
            setIsLoading(false)
        }
    }

    const closeModal = ()=>{
        setIsEditing(false)
    }
    return (
        <div className="edit  inset-0 z-50 absolute fixed h-screen flex items-center bg-white/30 backdrop-blur-md">
            <div className="content bg-white w-[100%] p-5 shadow-xl shadow-black-500/50 rounded-lg m-30">
                <div className="close flex justify-end">
                    <img src="close.svg" className="w-10 cursor-pointer" alt="" onClick={closeModal} />
                </div>
                 <div className="title mb-4 h-auto max-h-[30vh]">
                    <textarea value={title} className="w-[100%] h-[100%] border-none outline-none p-4" onChange={(e)=>setTitle(e.target.value)}>
                        
                    </textarea>
                </div>
                <div className="code bg-slate-600 h-[30vh] max-h-[50vh]  rounded-lg text-white">
                    <textarea value={code} className="w-[100%] h-[100%] border-none outline-none p-4" onChange={(e)=>setCode(e.target.value)}>
                        
                    </textarea>
                </div>
                {
                    error  && <p>{error}</p>
                }
                <div className="update flex w-[100%] justify-center mt-4">
                    <button className="bg-blue-500 text-white rounded-lg font-bold p-3" onClick={editQuestion} disabled={loading}>UPDATE QUESTION</button>
                </div>
            </div>
               
            </div>
    );
}

export default EditPopUp;