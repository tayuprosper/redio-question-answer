export default function ProfileLoader(){
    return (
        <div className="profile flex flex-col gap-5  shadow-lg rounded-lg p-4 sticky mt-10">
            <div className="userinfo flex items-center gap-4">
                <div className="img bg-slate-900 h-40 w-40 rounded-full">

                </div>
                <div className="info flex flex-col gap-4">
                    <div className="name h-6 w-100 bg-slate-900 rounded-sm"></div>
                    <div className="email h-6 w-80 bg-slate-500 rounded-sm"></div>
                </div>
            </div>
            <div className="bio flex gap-4">
                <div className="bio h-6 w-80 bg-slate-500 rounded-sm"></div>
                <div className="bio h-6 w-80 bg-slate-500 rounded-sm"></div>
            </div>
        </div>
    )
}