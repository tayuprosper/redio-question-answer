import { DeleteQuestion } from "../CrudService/Crud";
import { useNavigate } from "react-router-dom";
function DeleteWarning({setDeleting, id}) {
    const navigate = useNavigate()
    const deletePost = async ()=>{
        const res = await DeleteQuestion(id)
        if (res){
            setDeleting(false)
            navigate("/dashboard")
        }else{
            setDeleting(false)
        }
    }
    const closeModal =()=>{
        setDeleting(false)
    }
    return ( 
        <div className="edit  inset-0 z-50 absolute fixed h-screen flex items-center justify-center bg-white/30 backdrop-blur-md">
            <div className="content bg-white w-[40%] p-5 shadow-xl shadow-black-500/50 rounded-lg m-30">
                <div className="close flex justify-end">
                    <img src="close.svg" className="w-10 cursor-pointer" alt="" onClick={closeModal} />
                </div>
                 <div className="title mb-4 h-auto max-h-[30vh]">
                    <p className="w-[100%] h-[100%] border-none outline-none p-4 font-bold text-2xl" >
                        Are you Sure you want to delete this Question?
                    </p>
                </div>
                <div className="update flex gap-5 w-[100%] justify-around mt-4">
                    <button className="bg-blue-500 text-white rounded-lg font-bold p-3">CANCEL</button>
                    <button className="bg-blue-500 text-white rounded-lg font-bold p-3" onClick={deletePost} >CONFIRM</button>
                </div>
            </div>
               
            </div>
     );
}

export default DeleteWarning;