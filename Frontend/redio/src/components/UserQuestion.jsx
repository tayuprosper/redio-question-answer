import { useState } from "react"
import DeleteWarning from "./DeleteWarning";
function UserQuestion( {info, index, setIsEditing, setCodeForEdit, setTitleForEdit, setIdForEdit }) {
    const [deleting, setDeleting] = useState(false)
    const editCode =(pk,title,code_sample)=>{
        setCodeForEdit(code_sample);
        setIdForEdit(pk);
        setTitleForEdit(title);
        setIsEditing(true)
    }

    const copyCode = ()=>{
        navigator.clipboard.writeText(info.code_sample)
        .then(()=>{
            alert("Code copied")
        })
        .catch((err)=>{
            alert("an error occured ", err)
        })
    }
    return (
         
        <div className="post gap-4">
        
        {
            deleting ? <DeleteWarning setDeleting={setDeleting} id={info.pk} /> : <></>
        }
            <div className="content bg-slate-200 rounded-sm p-4 mt-5">
                <div className="text font-bold flex p-2 justify-between">
                    
                    <p>{info.fields.content}</p>
                    <div className="editing flex gap-6 items-center cursor-pointer">
                    <img src="edit.svg" alt="copy code" className="h-5 cursor-pointer" onClick={()=>editCode(info.pk,info.fields.content, info.fields.code_sample)} />
                    {
                        info.fields.code_sample && <img src="copy.svg" alt="copy code" className="h-5 cursor-pointer" onClick={copyCode} />
                         
                    }
                    <img src="delete.svg" alt="delete" className="h-7" onClick={()=>setDeleting(true)}/>
                    </div>
                </div>
                {
                    info.fields.code_sample &&
                    <>
                        <div className="code_sample max-h-80 text-white overflow-scroll  m-2 bg-[#01001B] rounded-sm p-2">
                            <pre><code>{info.fields.code_sample}</code></pre>
                        </div>
                        
                    </>

                }
                <div className="reactions flex mt-6 gap-4 font-bold items-center text-center">
                    <div className="answers cursor-pointer">
                        <p className="answtxt">{ info.fields.answer_count }</p>
                        <p>Answers</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default UserQuestion;