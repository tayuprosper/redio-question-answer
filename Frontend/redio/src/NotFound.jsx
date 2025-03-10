import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div className="flex h-[100vh] items-center text-center justify-center">
            <div className="content">
                <h1 className="text-5xl text-white">OOPS!! this page does not exist!!</h1>
               <center><img src="cross.svg" className="w-10 h-20" alt="" /></center> 
                <Link to={"/"}>
                    <button className="text-white  font-bold text-3xl border-0 bg-slate-900 rounded-sm p-3">GO BACK</button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;