import React from "react";

function Search({searchTerm, setSearchTerm}) {
    return ( 
      <div className="search w-[70%] m-10">
        <div className="bg-slate-200 p-3 gap-4 w-[100%] flex text-center items-center m-auto">
            <img src="search.svg" alt="search" />
            <input type="text" className="w-[100%]" placeholder="Search question or topic" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
        </div>
      </div>
     );
}

export default Search;