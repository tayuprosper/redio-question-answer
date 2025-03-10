import Search from "./Search";
import { Link } from "react-router-dom";
import { getAccessToken, logout} from "../AuthService/AuthService";
import Dashboard from "../Dashboard";
function Navbar({ searchTerm, setSearchTerm }) {
    const token = getAccessToken();
    return (
        <>
            <div className="bg-slate-100 navbar flex justify-between items-center p-10 h-[5vh]">
                <div className="logo font-bold text-3xl"><h2>RedIo</h2></div>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className="actions flex gap-5 items-center justify-between">
                    {

                        token ?
                            <div className="pro flex justify-between items-center gap-5">
                                <Link to="/login">
                                <div className="login border-1 p-2 rounded-sm font-bold" onClick={logout}>LOGOUT</div>
                                </Link>
                                <Link to="/dashboard">
                                <img src="https://picsum.photos/200/300" className="h-10 w-10 rounded-full" alt="profile" />
                                </Link>
                            </div>
                            :
                            <>
                                <Link to={"/"}>
                                    <div className="login border-1 p-2 rounded-sm font-bold">LOGIN</div>
                                </Link>
                                <Link to={"/login"}>
                                    <div className="signu bg-slate-900 rounded-sm text-white p-2 border-1 font-bold">SIGNUP</div>
                                </Link>
                              </>
                    }
                </div>
            </div>
        </>
    );
}

export default Navbar;