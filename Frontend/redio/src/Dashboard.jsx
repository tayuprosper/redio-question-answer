import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessToken } from "./AuthService/AuthService";
import { useEffect, useState } from "react";
import { getDashboard, UserProfile } from "./CrudService/Crud";
import QuestionLoader from "./components/QuestionLoader";
import UserQuestion from "./components/UserQuestion";
import ProfileLoader from "./components/ProfileLoader";
import { Link } from "react-router-dom";
import EditPopUp from "./components/EditPopUp";
function Dashboard() {

    const [titleForEdit, setTitleForEdit] = useState('')
    const [codeForEdit, setCodeForEdit] = useState('')
    const [idForEdit, setIdForEdit] = useState('')
    const navigate = useNavigate()
    const token = getAccessToken()
    const [loadingPosts, setLoadingPosts] = useState(true)
    const [loadingUser, setLoadingUser] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [user, setUser] = useState([])
    const [data, setData] = useState([])
    
    if (!token) {
        navigate("/login")
    }

    const getData = async () => {
        const userdata = await UserProfile()
        
        if (userdata) {
            setLoadingUser(false)
            setUser(userdata);
            const res = await getDashboard();
            if (res) {
                setLoadingPosts(false)
                setData(res)
            }

        }

    }



    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="all">
            {
                isEditing && <EditPopUp setIsEditing={setIsEditing} titleForEdit={titleForEdit}  codeForEdit={codeForEdit} idForEdit={idForEdit}/>
            }
            {
                loadingUser ? <ProfileLoader /> :

                    user ?
                        <div className="header shadow-lg rounded-lg p-4  mt-10">
                            <div className="personalinfo flex gap-5 items-center">
                                <div className="img">
                                    <img src="https://picsum.photos/300/300" className="rounded-full h-30 cursor-pointer" alt="" />
                                </div>
                                <div className="info">
                                    <div className="name font-bold text-4xl">
                                        <p>{user[0].fields.first_name} {user[0].fields.last_name}</p>
                                    </div>
                                    <div className="email font-bold">
                                        <p>{user[0].fields.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="profilaction mt-5 flex gap-5 items-center">
                                <Link to="/logout">
                                    <button className="bg-transparent rounded-lg border-2 text-slate-900 font-bold p-3">Logout</button>
                                </Link>
                                <Link to="/editprofile">
                                    <button className="bg-slate-900 rounded-lg border-2 border-slate-900 text-white font-bold p-3">Edit Profile</button>
                                </Link>
                            </div>

                            <div className="bio font-bold text-2xl mt-5">
                                <p>This is my bio here with some links</p>
                            </div>
                        </div>
                        :
                        navigate("/login")
            }
            <div className="yourposts">
                <div className="postsinfo flex justify-between mt-5">
                    <div className="total_posts">
                        <p className="font-bold text-3xl">{data ? data.length : "-" } Questions</p>
                    </div>
                    <div className="new-post">
                        <Link to="/askquestion">
                            <button className="bg-slate-900 rounded-lg text-white font-bold p-3">Ask Question</button>
                        </Link>
                    </div>
                </div>
                <p className="mt-4 font-bold text-2xl">Your Questions</p>
                {
                    loadingPosts ?
                        <>
                            <QuestionLoader />
                            <QuestionLoader />
                            <QuestionLoader />
                            <QuestionLoader />
                        </> :
                        data ?
                            data.map((d, i) => {
                                return (
                                    <div key={i}>
                                        <hr className="mt-5" />
                                        <UserQuestion info={d}  isEditing={isEditing} setIsEditing={setIsEditing} setTitleForEdit={setTitleForEdit}  setCodeForEdit={setCodeForEdit}  setIdForEdit={setIdForEdit} />
                                    </div>

                                )

                            })

                            :
                            <p>Error Reading your posts</p>
                }
            </div>

        </div>
    );
}

export default Dashboard;