import { useState } from "react";

const AddCodeToAnswer = function(){
    const [desc, setDesc] = useState('');
    const [code, setCode] = useState('');
    const codeTitle = localStorage.getItem("codeToAnswer");
    const codeDesc = localStorage.getItem("titleToAnswer");
    const sendAnswer = (e) =>{

    }
    return(
        <div className="flex justify-center flex-col items-center my-5">
            <div className="login w-[100%] p-10 flex  justify-center bg-slate-200 items-center text-center">
            <div className="form w-[100vw] flex text-center items-center">
                <div action="" className="font-bold flex flex-col gap-10 items-center text-center w-full">
                    <p className="font-bold text-2xl">{codeTitle}</p>
                    <code className="bg-slate-600 h-auto rounded-sm p-4 h-max-[10vh] text-white font-bold">{codeDesc}</code>
                  </div> 
            </div>
            </div>
            <div className="login h-[50vh] w-full flex items-center text-center">
            <div className="form w-[100vw] flex text-center items-center">
                <form action="" className="flex flex-col items-center text-center w-full">
                    <h2 className="font-bold text-3xl">Add an answer</h2>
                    <input type="text" name="Description" id="" placeholder="Description" value={desc} onChange={(e)=> setDesc(e.target.value)} />
                    <textarea type="text" name="code" id="" placeholder="Code sample" value={code} onChange={(e)=> setCode(e.target.value)} />
                    <button type="submit" className="font-bold text-white" onClick={sendAnswer}>Send Answer</button>
                </form>
            </div>
            </div>
        </div>
            
    )
}

export default AddCodeToAnswer;