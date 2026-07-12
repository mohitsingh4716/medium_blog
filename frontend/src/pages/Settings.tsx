import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { useUserProfile } from "../hooks/useUserProfile";
import { toast } from "sonner";
import { Check } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Avatar } from "../components/BlogCard";

export const Settings = () => {
  const { userInfo } = useUserProfile();

  // State values
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  // const [avatar, setAvatar] = useState("");

  // Sync state with user profile
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || "");
      setBio(userInfo.description || "");
      setEmail(userInfo.email || "");
      
    }
  }, [userInfo]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    const loadtoast = toast.loading("Updating profile details...");
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/userInfo`,
        {
          name,
          description: bio,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      // Update localStorage so Appbar updates instantly
      localStorage.setItem("userProfile", JSON.stringify(response.data.user));

      toast.dismiss(loadtoast);
      toast.success("Profile details updated successfully!");

      // Dispatch storage event to trigger re-renders in listener components
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      toast.dismiss(loadtoast);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Appbar />
      <div className="max-w-2xl mx-auto px-4 pt-24 pb-16 animate-fade-in">
        {/* Page title */}
        <div className="border-b border-zinc-100 pb-6 mb-8">
          <h1 className="text-3xl font-bold font-serif text-zinc-950">
            Settings
          </h1>
          <p className="text-sm text-zinc-500 font-light mt-1">
            Manage your personal profile and account credentials.
          </p>
        </div>

        {/* Settings Box */}
        <main className="bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/80 shadow-sm">
          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Avatar representation */}
            <div className="flex items-center gap-5 pb-6 border-b border-zinc-100">
              {/* <img
                src={avatar}
                alt={name}
                className="w-16 h-16 rounded-full bg-zinc-50 border border-zinc-200 shadow-inner"
              /> */}

              <button
                className="flex items-center justify-center focus:outline-none rounded-full ring-2 ring-transparent hover:ring-zinc-200 focus:ring-zinc-400 transition-all p-0.5"
                aria-haspopup="true"
                aria-label="User Menu"
              >
                <Avatar size="big" name={userInfo?.name || "User"} />
              </button>
              <div>
                <h3 className="text-sm font-semibold text-zinc-800">
                  Profile Image
                </h3>
                <p className="text-xs text-zinc-500 font-light mt-0.5">
                  {/* Generated automatically using Dicebear based on your name. */}
                </p>
              </div>
            </div>

            {/* Editing Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 pl-0.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 pl-0.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-3.5 py-2 border border-zinc-200 bg-zinc-50 rounded-lg text-sm text-zinc-400 cursor-not-allowed"
                  placeholder="you@example.com"
                />
                <span className="text-[10px] text-zinc-400 mt-1 block pl-0.5">
                  Email address modifications are not supported.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 pl-0.5">
                  Short Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full px-3.5 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-none placeholder-zinc-400"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="border-t border-zinc-100 pt-6 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-full text-xs font-semibold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 duration-100"
              >
                <Check className="w-4 h-4" /> Save Settings
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};
