import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "./BlogCard";


export const Appbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const location= useLocation();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

 
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        if (dropdownVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownVisible]);

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
                    <Avatar size={"big"} name={"M"} />
                </button>

                {dropdownVisible && <Dropdown dropdownRef={dropdownRef} />}
            </div>
        </div>
        
    );
};

const Dropdown = ({ dropdownRef }: { dropdownRef: React.RefObject<HTMLDivElement> }) => {
    return (
        <div
            ref={dropdownRef}
            id="dropdownNavbar"
            className="absolute right-0 top-14 z-20 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
            <div className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <div>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Dashboard
                    </a>
                </div>
                <div>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Settings
                    </a>
                </div>
                <div>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Profile
                    </a>
                </div>
            </div>
            <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Sign out
                </a>
            </div>
        </div>
    );
};
