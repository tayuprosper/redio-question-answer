function QuestionLoader() {
    return (
        <div className="loader">
            <div className="header gap-4 flex items-center">
                <div className="pic bg-slate-900 w-20 h-20  rounded-full"></div>
                <div className="info flex flex-col gap-2">
                    <div className="name bg-slate-900 w-60 h-5 rounded-full">

                    </div>
                    <div className="date bg-slate-900 w-40 h-5 rounded-full">

                    </div>
                </div>
            </div>
            <div className="content bg-slate-900 w-full h-40 rounded-sm mt-5">

             </div>
        </div>
    );
}

export default QuestionLoader;