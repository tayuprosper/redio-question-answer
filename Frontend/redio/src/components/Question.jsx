import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { putComment } from "../CrudService/Crud";
function Profile({ info }) {
    const navigator = useNavigate()
    const [answer,setAnswer] = useState('')
    const [codeSample, setCodeSample] = useState('')
    const copyCode = ()=>{
        navigator.clipboard.writeText(info.code_sample)
        .then(()=>{
            alert("Code copied")
        })
        .catch((err)=>{
            alert("an error occured ", err)
        })
    }

    const handleComment = async ()=>{
        const res = await putComment(answer,codeSample,info.id)
        if (res){
            navigator("/")
        }
     }
    return (
        <div className="post gap-4">
            <div className="profile font-bold flex items-center gap-3">
                <div className="img rounded-full">
                    <img src="https://picsum.photos/200/300" className="rounded-full w-20 h-20" alt="profile" />
                </div>
                <div className="info flex flex-col text-xl gap-1">
                    <div className="infonames flex gap-2 ">
                        <div className="username">
                            {info.author.username}
                        </div>
                        <div className="date">
                            {info.author.last_name}
                        </div>
                    </div>
                    <p className="text-sm">{info.created_at}</p>
                </div>
            </div>

            <div className="content bg-slate-200 rounded-sm p-4 mt-5">
                <div className="text font-bold flex p-2 justify-between">
                <p>{info.content}</p>
                {
                    info.code_sample && <img src="copy.svg" alt="copy code" className="h-5 pointer" onClick={copyCode}/> 
                }
                 
                </div>
                {
                    info.code_sample &&
                    <>
                        <div className="code_sample max-h-80 text-white overflow-scroll  m-2 bg-[#01001B] rounded-sm p-2">
                            <pre><code>{info.code_sample}</code></pre>
                        </div>
                    </> 
                    
                }
                <div className="reactions flex mt-6 gap-4 font-bold items-center text-center">
                    <div className="upvotes">
                        {
                            info.top_answers.map((d,index) => (
                                <p key={index} className="upsvtxt">{d.upvotes}</p>
                            ))
                            
                        }
                        <p>Upvotes</p>
                    </div>
                    <div className="answers">
                    <p className="answtxt">1.3k</p>
                    <p>Answers</p>
                    </div>
                    <div className="flex items-center w-[70%]">
                        <AnswerQuestion answer={answer} setAnswer={setAnswer}/>
                        <img src="send.svg" alt="" onClick={handleComment} className="h-10"/>
                        <img src="code.svg" alt="" className="h-10"/>
                    </div>
                </div>
            </div>

        </div>
    )
}

function AnswerQuestion({answer, setAnswer}) {
    return ( 
        <div className="w-[100%]">
        <div className="bg-slate-200 w-[100%] items-center">
            <input type="text" className="w-[100%] border-1 rounded-sm p-3" placeholder="Share your thoughts" value={answer} onChange={(event) => setAnswer(event.target.value)}/>
        </div>
        </div>
     );
}


function Question({ data }) {
    
    console.log(data)
    return (
        <div className="question p-[50px] flex flex-col gap-10">
            
            {
                data.map((d, i) => (
                    <>
                    <hr />
                    <Profile key={i} info={d} />
                    </>
                    
                ))
                }
        </div>
    );
}


export default Question;