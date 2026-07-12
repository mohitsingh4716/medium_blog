import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useUserProfile } from "../hooks/useUserProfile";
import { toast } from "sonner";
import moto from "../assets/moto.png";
import { Edit3, LayoutDashboard, LogOut, Settings as SettingsIcon, User } from "lucide-react";

export const Appbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userInfo } = useUserProfile();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on ESC press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown when location changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/blogs" className="flex items-center hover:opacity-85 transition-opacity">
          <div className="w-8 h-8 flex items-center justify-center overflow-hidden mr-0.5">
            <img src={moto} alt="M" className="w-full h-full object-contain" />
          </div>
          <span className="text-3xl font-bold font-serif text-zinc-950 tracking-tight select-none">
            edium
          </span>
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          
          {location.pathname !== "/publish" && (
            <Link to="/publish">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 border border-zinc-900 text-zinc-900 rounded-full hover:bg-zinc-950 hover:text-white transition-all text-sm font-medium shadow-sm active:scale-95 duration-200"
              >
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">Write</span>
              </button>
            </Link>
          )}

          {/* User profile dropdown container */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center justify-center focus:outline-none rounded-full ring-2 ring-transparent hover:ring-zinc-200 focus:ring-zinc-400 transition-all p-0.5"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              aria-label="User Menu"
            >
              <Avatar size="big" name={userInfo?.name || "User"} />
            </button>

            {isDropdownOpen && <DropdownMenu userInfo={userInfo} />}
          </div>
        </div>
      </div>
    </header>
  );
};

const DropdownMenu = ({ userInfo }: { userInfo: any }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userProfile");
      toast.success("Signed out successfully");
      navigate("/");
    } catch (e) {
      toast.error("Something went wrong during sign out");
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white border border-zinc-200 rounded-xl shadow-xl z-50 animate-slide-down overflow-hidden">
      {/* User Info Header */}
      <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-100">
        <p className="text-sm font-semibold text-zinc-900 truncate">{userInfo?.name || "Anonymous User"}</p>
        <p className="text-xs text-zinc-500 truncate">{userInfo?.email || "No email provided"}</p>
      </div>

      {/* Menu Options */}
      <div className="p-1.5 space-y-0.5">
        <Link
          to={`/profile/${userInfo?.id}`}
          className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 rounded-lg hover:text-zinc-950 transition-colors"
        >
          <User className="w-4 h-4 text-zinc-400" />
          My Profile
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 rounded-lg hover:text-zinc-950 transition-colors"
        >
          <LayoutDashboard className="w-4 h-4 text-zinc-400" />
          Dashboard
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 rounded-lg hover:text-zinc-950 transition-colors"
        >
          <SettingsIcon className="w-4 h-4 text-zinc-400" />
          Settings
        </Link>
      </div>

      {/* Logout Action */}
      <div className="p-1.5 border-t border-zinc-100 bg-zinc-50/50">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          Log out
        </button>
      </div>
    </div>
  );
};
