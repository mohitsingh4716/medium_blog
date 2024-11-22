import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useUserProfile } from "../hooks/useUserProfile";
import newlogo from "../assets/newLogo.svg";
import logo from "../assets/logo.svg";
import {toast} from "sonner";

import { LayoutDashboard, LogOut, UserCog, UserPen } from "lucide-react";


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
                <div className="flex lg:justify-center">
                   
                    <img className="w-9" src={newlogo} alt="Medium" />
                    <img className="p-1 w-36" src={logo} alt="Medium" />
                    {/* <div className="mt-2  text-3xl font-bold" > Medium</div> */}
                </div>
            </Link>

            <div className="flex relative">
                {(location.pathname !== "/publish") && (
                    <Link to={`/publish`}>
                        <button
                            type="button"
                            className="mx-4 my-2 lg:-my-0.5 lg:mr-8 text-black border border-black font-semibold hover:bg-gray-600 hover:text-white  focus:outline-none focus:ring-4 rounded-full lg:text-sm text-xs lg:px-7 lg:py-2.5 px-2 py- text-center me-2 mb-2"
                        >
                            Create new Blog
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



