import { Link } from "react-router-dom";

function Qinfos({length}) {
    return ( 
        <div className="qinfo m-10">
            <div className="totalquestions mb-3">
                <p className="font-bold text-3xl">{ length ? length : "-"} Questions</p>
            </div>
            <div className="otherinfo flex justify-between">
                <div className="sort flex gap-5 bg-slate-100 flex items-center p-3 rounded-sm font-bold">
                    <div className="newest active text-white h-full p-2 rounded-sm">Newest</div>
                    <div className="Active">Active</div>
                    <div className="More">More</div>
                </div>
                <div className="ask">
                    <Link to="/askquestion">
                        <button className="bg-slate-900 rounded-lg text-white font-bold p-3">Ask Question</button>
                    </Link>
                </div>
            </div>
        </div>
     );
}

export default Qinfos;