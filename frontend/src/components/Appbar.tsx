import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useUserProfile } from "../hooks/useUserProfile";
import newlogo from "../assets/newLogo.svg";
import logo from "../assets/logo.svg";

import { LayoutDashboard, LogOut, UserCog, UserPen } from "lucide-react";


export const Appbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // const toggleDropdown = () => {
    //     setIsDropdownOpen((prev)=>!prev);
    // };

    const {userInfo}= useUserProfile();


    return (
     
        <div className=" fixed z-50 shadow-whit bg-[#ffff] border-b flex justify-between px-8 py-2 h-auto w-full " onClick={()=>{
            if(isDropdownOpen){
                setIsDropdownOpen(false);
            }
        }}>

            <Link to={"/blogs"}>
                <div className="flex justify-center ">
                   
                    <img className="w-12" src={newlogo} alt="Medium" />
                    <img className="p-1" src={logo} alt="Medium" />
                    {/* <div className="mt-2  text-3xl font-bold" > Medium</div> */}
                </div>
            </Link>

            <div className="flex relative">
                {location.pathname !== "/publish" && (
                    <Link to={`/publish`}>
                        <button
                            type="button"
                            className="mr-8 text-black border border-black font-semibold hover:bg-gray-600 hover:text-white  focus:outline-none focus:ring-4 rounded-full text-sm px-7 py-2.5 text-center me-2 mb-2"
                        >
                            Create new Blog
                        </button>
                    </Link>
                )}
               

                <button onClick={()=>{ setIsDropdownOpen((prev)=>!prev)}} className="focus:outline-none -mt-2">
                   {<Avatar size={"big"} name={userInfo?.name || "M"} />}
                </button>

                
            </div>
            {isDropdownOpen && <Dropdown/>}
        </div>
        
    );
};


const Dropdown = () => {
    const nevigate = useNavigate();

    const SignOut= ()=>{
    
        localStorage.removeItem("token");
        nevigate("/");
    }

    return (
        <div
            
            className="absolute right-0 top-14 z-20 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-48"
        >
            <div className="py-3 text-sm text-gray-700 ">
                <div>
                    <div className="flex px-4 py-2 hover:bg-gray-100">
                    <LayoutDashboard className="mr-3" />  Dashboard
                    </div>
                </div>
                <div>
                    <div className="flex px-4 py-2 hover:bg-gray-100">
                    <UserCog className="mr-3" /> Settings
                        </div>
                </div>
                <div>
                    <Link to={"/userblogs"}>
                    <div className="flex px-4 py-2 hover:bg-gray-100">
                    <UserPen className="mr-3" /> Profile
                        </div>
                    </Link>
                </div>
            </div>
            <div className="py-1">
                <button onClick={SignOut} className="  flex justify-center px-4 py-2 font-semibold text-sm text-gray-900 hover:bg-gray-100 w-full">
                <LogOut  className="mr-4"/>  Sign out
                   
                    </button>
            </div>
        </div>
    );
};



