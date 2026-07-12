import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks/useBlogs";
import { useUserProfile } from "../hooks/useUserProfile";
import { BlogCard } from "../components/BlogCard";
import { Avatar } from "../components/BlogCard";
import { Mail, UserCheck, Calendar, Settings as SettingsIcon } from "lucide-react";
import { BlogLoading } from "../Loadings/BlogLoading";

interface AuthorProfile {
  name: string;
  description: string;
  email?: string;
}

export const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { loading: blogsLoading, blogs } = useBlogs();
  const { userInfo } = useUserProfile();

  const [authorInfo, setAuthorInfo] = useState<AuthorProfile | null>(null);

  // Determine if it's the logged-in user's profile
  const isCurrentUser = userInfo?.id === id;

  // Filter posts belonging to this author
  const authorPosts = blogs.filter((blog: any) => blog.author?.id === id);

  useEffect(() => {
    if (isCurrentUser && userInfo) {
      setAuthorInfo({
        name: userInfo.name,
        description: userInfo.description || "No biography provided yet.",
        email: userInfo.email,
      });
    } else if (authorPosts.length > 0) {
      const firstPost = authorPosts[0];
      setAuthorInfo({
        name: firstPost.author.name || "Anonymous",
        description: firstPost.author.description || "Writer on this platform.",
      });
    } else {
      setAuthorInfo({
        name: "Writer Profile",
        description: "Blogger on this platform.",
      });
    }
  }, [id, blogs, isCurrentUser, userInfo, authorPosts]);

  if (blogsLoading) {
    return (
      <div className="bg-white min-h-screen">
        <Appbar />
        <div className="max-w-2xl mx-auto px-4 pt-20">
          <BlogLoading />
        </div>
      </div>
    );
  }

  // Sort by date (newest first)
  const recentPosts = [...authorPosts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Appbar />
      <div className="max-w-2xl mx-auto px-4 pt-20 pb-16">
        
        {/* Redesigned Profile Cover Card */}
        {authorInfo && (
          <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-md mb-8 overflow-hidden animate-fade-in">
            {/* Minimal Background Cover Banner */}
            <div className="h-28 bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-zinc-100 relative">
              {isCurrentUser && (
                <Link to="/settings" className="absolute top-4 right-4 bg-white/80 hover:bg-white text-zinc-700 hover:text-zinc-950 p-2 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 duration-100 flex items-center gap-1.5 text-xs font-semibold">
                  <SettingsIcon className="w-3.5 h-3.5" /> Edit Profile
                </Link>
              )}
            </div>

            {/* Profile Content Body */}
            <div className="px-6 pb-6 pt-0 relative">
              
              {/* Avatar position overlapping banner */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-10 mb-5 gap-4">
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
                    <Avatar name={authorInfo.name} size="big" />
                  </div>
                </div>

                {/* Badge info */}
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <UserCheck className="w-3 h-3" /> {isCurrentUser ? "Author (You)" : "Verified Writer"}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-700 bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Active
                  </span>
                </div>
              </div>

              {/* Text details */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold font-serif text-zinc-900 leading-tight">
                    {authorInfo.name}
                  </h1>
                  {authorInfo.email ? (
                    <div className="flex items-center gap-1.5 text-zinc-500 text-sm font-light">
                      <Mail className="w-4 h-4 text-zinc-400" />
                      <a href={`mailto:${authorInfo.email}`} className="hover:text-emerald-700 transition-colors">
                        {authorInfo.email}
                      </a>
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-450 font-light italic">Member of Blogging Platform</p>
                  )}
                </div>

                <div className="border-t border-zinc-100 pt-4">
                  <h4 className="text-[10px] font-bold text-zinc-450 uppercase tracking-widest mb-1.5">Biography</h4>
                  <p className="text-zinc-650 text-sm leading-relaxed font-light break-words">
                    {authorInfo.description}
                  </p>
                </div>

                {/* Stat Badge Block */}
                <div className="border-t border-zinc-100 pt-4 flex gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-150 flex items-center justify-center text-zinc-700 font-serif font-bold text-lg">
                      {authorPosts.length}
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Stories</span>
                      <span className="text-xs text-zinc-600 font-light">Published in total</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Stories list */}
        <div className="space-y-4">
          <h2 className="text-base font-bold font-serif text-zinc-900 pl-1">
            Story Articles ({recentPosts.length})
          </h2>

          <div className="space-y-3">
            {recentPosts.length > 0 ? (
              recentPosts.map((blog) => (
                <div key={blog.id} className="bg-white rounded-2xl border border-zinc-200 px-6 py-1 shadow-sm hover:shadow-md transition-shadow">
                  <BlogCard
                    id={blog.id}
                    title={blog.title}
                    content={blog.content}
                    firstImgUrl={blog.image}
                    publishedDate={blog.createdAt.toString()}
                    authorName={blog.author.name || "Anonymous"}
                    authorId={blog.author.id}
                    description={blog.author.description}
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm">
                <p className="text-zinc-400 text-sm font-light">This user hasn't published any stories yet.</p>
                {isCurrentUser && (
                  <Link to="/publish">
                    <button className="mt-4 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full text-xs transition-colors active:scale-95 duration-100 shadow-sm">
                      Write your first story
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
export default Profile;
