import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useUserProfile } from "../hooks/useUserProfile";


export const Appbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev)=>!prev);
    };

    const {userInfo}= useUserProfile();


    return (
     
        <div className=" fixed z-50 shadow-whit bg-[#ffff] border-b flex justify-between px-8 py-2 h-auto w-full ">
            <Link to={"/blogs"}>
                <div className="flex flex-col justify-center h-12 max-w-36">
                    <img src="https://seekvectorlogo.com/wp-content/uploads/2021/12/medium-vector-logo-2021.png" />
                </div>
            </Link>

            <div className="flex relative">
                {location.pathname !== "/publish" && (
                    <Link to={`/publish`}>
                        <button
                            type="button"
                            className="mr-8 text-black border-2 font-semibold focus:outline-none focus:ring-4 rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2"
                        >
                            Create new Blog
                        </button>
                    </Link>
                )}
               

                <button onClick={toggleDropdown} className="focus:outline-none">
                   {<Avatar size={"big"} name={userInfo?.name || "M"} />}
                </button>

                {isDropdownOpen && <Dropdown/>}
            </div>
        </div>
        
    );
};


const Dropdown = () => {
    const nevigate = useNavigate();

    const SignOut= ()=>{
    
        localStorage.removeItem("token");
        nevigate("/signin");
    }

    return (
        <div
            
            className="absolute right-0 top-14 z-20 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-48"
        >
            <div className="py-3 text-sm text-gray-700 ">
                <div>
                    <div className="block px-4 py-2 hover:bg-gray-100">
                        Dashboard
                    </div>
                </div>
                <div>
                    <div className="block px-4 py-2 hover:bg-gray-100">
                        Settings
                        </div>
                </div>
                <div>
                    <Link to={"/userblogs"}>
                    <div className="block px-4 py-2 hover:bg-gray-100">
                        Profile
                        </div>
                    </Link>
                </div>
            </div>
            <div className="py-1">
                <button onClick={SignOut} className="block px-4 py-2 font-semibold text-sm text-gray-900 hover:bg-gray-100 w-full">
                    Sign out
                    </button>
            </div>
        </div>
    );
};



