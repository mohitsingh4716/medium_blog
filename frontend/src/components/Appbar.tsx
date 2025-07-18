import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useUserProfile } from "../hooks/useUserProfile";
// import newlogo from "../assets/newLogo.svg";
// import logo from "../assets/logo.svg";
import {toast} from "sonner";
import moto from "../assets/moto.png";

import { Edit3, LayoutDashboard, LogOut, UserCog, UserPen } from "lucide-react";


export const Appbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // const toggleDropdown = () => {
    //     setIsDropdownOpen((prev)=>!prev);
    // };

    const {userInfo}= useUserProfile();



    return (
     
        <div className="fixed z-50 lg:fixed  shadow-white bg-[#ffff] border-b flex justify-between lg:px-8 px-3   lg:py-2 py-1 h-16 lg:w-full w-96  " onClick={()=>{
            if(isDropdownOpen){
                setIsDropdownOpen(false);
            }
        }}>

            <Link to={"/blogs"}>
                {/* <div className="flex lg:justify-center">
                   
                    <img className="w-9" src={newlogo} alt="Medium" />
                    <img className="p-1 w-36" src={logo} alt="Medium" />
                    <div className="mt-2  text-3xl font-bold" > Medium</div>
                </div> */}

                  <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-1">
                        {/* <Edit3 className="w-5 h-5 text-white" /> */}
                        <img src={moto} alt="Medium" />
                        </div>
                        <div className="text-3xl font-bold font-serif text-black pt-2">edium</div>
                    </div>
            </Link>

            <div className="flex relative">
               {(location.pathname !== "/publish") && (
            <Link to={`/publish`}>
                <button
                    type="button"
                    className="mx-2 my-2 lg:mx-4 lg:-my-0.5 lg:mr-8 text-black border border-black font-semibold hover:bg-green-800 hover:text-white focus:outline-none focus:ring-4 rounded-full text-xs lg:text-sm px-3 py-2 lg:px-7 lg:py-2.5 text-center whitespace-nowrap flex items-center gap-1 lg:gap-2"
                >
                    <Edit3 className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="hidden sm:inline">Create new Blog</span>
                    <span className="sm:hidden">Create</span>
                </button>
            </Link>
        )}
               

                <button onClick={()=>{ setIsDropdownOpen((prev)=>!prev)}} className="focus:outline-none -mt-2 mr-3">
                   {<Avatar size={"big"} name={userInfo?.name || ""} />}
                </button>

                
            </div>
            {isDropdownOpen && <Dropdown/>}
        </div>
        
    );
};


const Dropdown = () => {
    const navigate = useNavigate();

    const SignOut= async()=>{
        try{
            localStorage.removeItem("token");
            localStorage.removeItem("userProfile");
    
            toast.success("Signed out successfully");
            navigate("/");
        }catch(e){
            toast.dismiss();
            toast.error("Something went_wrong");
        }
        
    }

    return (
        <div
            
            className="absolute right-0 top-14 z-20 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-48"
        >
            <div className="py-3 text-sm text-gray-700 ">
                <div>
                    <Link to={"/dashboard"}>
                    <div className="flex px-4 py-2 hover:bg-gray-100">
                    <LayoutDashboard className="mr-3" />  Dashboard
                    </div>
                    </Link>
                </div>
                <div>
                    <div className="flex px-4 py-2 hover:bg-gray-100">
                    <UserCog className="mr-3" /> Settings
                        </div>
                </div>
                <div>
                    <Link to={"/userblogs"}>
                    <div className="flex px-4 py-2 hover:bg-gray-100">
                    <UserPen className="mr-3" /> My Blogs
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



