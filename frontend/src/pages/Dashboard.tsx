import { useState, useEffect } from "react";
import moment from "moment";
import { Appbar } from "../components/Appbar";
import { useUserPost } from "../hooks/useUserPost";
import { useUserProfile } from "../hooks/useUserProfile";
import DashboardLoading from "../Loadings/DashboardLoading";
import { Link } from "react-router-dom";
import { 
  Plus, Edit, Trash2, BookOpen, AlertTriangle, FileText, User 
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Dashboard = () => {
  const { userInfo } = useUserProfile();
  const { loading, posts } = useUserPost();

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  // Local draft state
  const [localDraft, setLocalDraft] = useState<any>(null);

  // Sync profile details
  const [localUser, setLocalUser] = useState(userInfo);

  useEffect(() => {
    if (userInfo) {
      setLocalUser(userInfo);
    }
  }, [userInfo]);

  // Load localStorage drafts
  useEffect(() => {
    const savedDraft = localStorage.getItem("blog_draft");
    if (savedDraft) {
      try {
        setLocalDraft(JSON.parse(savedDraft));
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-[#fafafa] min-h-screen">
        <Appbar />
        <div className="max-w-3xl mx-auto px-4 pt-20">
          <DashboardLoading />
        </div>
      </div>
    );
  }

  if (!localUser) {
    return (
      <div className="bg-[#fafafa] min-h-screen">
        <Appbar />
        <div className="text-center py-32 text-red-500 font-medium">
          Failed to load user information. Please log in again.
        </div>
      </div>
    );
  }

  // Deletion execution
  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPostToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;
    const loadtoast = toast.loading("Deleting your story...");
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/blog/deleteblog/${postToDelete}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      toast.dismiss(loadtoast);
      toast.success("Story deleted successfully!");
      window.location.reload();
    } catch (error) {
      toast.dismiss(loadtoast);
      toast.error("Failed to delete post. Please try again.");
    }
    setShowModal(false);
    setPostToDelete(null);
  };



  // Sort by date (newest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-h-screen bg-[#fafafa] pb-16">
      <Appbar />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-8 animate-fade-in">
        
        {/* Header Dashboard section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold font-serif text-zinc-950">Dashboard</h1>
            <p className="text-xs text-zinc-500 font-light mt-0.5">
              Welcome back, <span className="font-semibold text-zinc-800">{localUser.name}</span>.
            </p>
          </div>
          <Link to="/publish">
            <button className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white px-4.5 p-4 rounded-full text-xs font-semibold shadow-sm transition-all duration-100 active:scale-95">
              <Plus className="w-3.5 h-3.5" /> Write Story
            </button>
          </Link>
        </div>

        {/* Reordered Section: Your Stories Listed First */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="px-8 sm:px-10 py-6 border-b border-zinc-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900 font-serif">Your Stories</h2>
            <span className="text-[10px] bg-zinc-50 border border-zinc-200 text-zinc-500 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              {sortedPosts.length} Published
            </span>
          </div>

          {sortedPosts.length > 0 ? (
            <>
              {/* Desktop View - Spacious Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr className="bg-zinc-50/50 border-b border-zinc-100 text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                      <th className="w-[70%] px-8 sm:px-10 py-5">Title</th>
                      <th className="w-[15%] px-8 sm:px-10 py-5">Published Date</th>
                      <th className="w-[15%] px-8 sm:px-10 py-5 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-sm">
                    {sortedPosts.map((post: any) => (
                      <tr key={post.id} className="group hover:bg-zinc-50/50 transition-all duration-200">
                        <td className="px-8 sm:px-10 py-6 align-middle">
                          <div className="flex items-center gap-5">
                            {post.image ? (
                              <div className="w-24 h-16 rounded-xl overflow-hidden border border-zinc-200/80 shadow-sm shrink-0 bg-zinc-50">
                                <img
                                  src={post.image}
                                  alt={post.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                              </div>
                            ) : (
                              <div className="w-24 h-16 rounded-xl border border-zinc-200/80 shadow-sm shrink-0 bg-zinc-50 flex items-center justify-center text-zinc-300">
                                <BookOpen className="w-6 h-6 stroke-[1.5]" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <Link 
                                to={`/blog/${post.id}`} 
                                className="text-base md:text-lg lg:text-xl font-bold text-zinc-950 font-serif leading-snug group-hover:text-emerald-700 transition-colors duration-200 line-clamp-2"
                              >
                                {post.title}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 sm:px-10 py-6 text-zinc-550 text-base font-medium whitespace-nowrap align-middle">
                          {moment(post.createdAt).format("MMM D, YYYY")}
                        </td>
                        <td className="px-8 sm:px-10 py-6.5 text-right whitespace-nowrap align-middle">
                          <div className="flex items-center justify-end gap-2.5">
                            <Link to={`/publish?id=${post.id}`}>
                              <button 
                                className="w-11 h-11 flex items-center justify-center border border-zinc-200 rounded-xl hover:bg-zinc-50 hover:border-zinc-350 hover:scale-105 active:scale-95 text-zinc-600 hover:text-zinc-950 transition-all duration-150" 
                                title="Edit story"
                              >
                                <Edit className="w-4.5 h-4.5" />
                              </button>
                            </Link>
                            <button
                              onClick={(e) => handleDeleteClick(post.id, e)}
                              className="w-11 h-11 flex items-center justify-center border border-zinc-200 rounded-xl hover:bg-red-50 hover:border-red-250 hover:scale-105 active:scale-95 text-zinc-600 hover:text-red-650 transition-all duration-150"
                              title="Delete story"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile/Tablet View - Stacked Cards */}
              <div className="block md:hidden divide-y divide-zinc-100">
                {sortedPosts.map((post: any) => (
                  <div key={post.id} className="p-6 hover:bg-zinc-50/30 transition-colors duration-150 flex flex-col gap-4">
                    <div className="flex gap-4 items-start">
                      {post.image ? (
                        <div className="w-20 h-14 rounded-lg overflow-hidden border border-zinc-200 shadow-sm shrink-0 bg-zinc-50">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-14 rounded-lg border border-zinc-200 shrink-0 bg-zinc-50 flex items-center justify-center text-zinc-300">
                          <BookOpen className="w-5 h-5 stroke-[1.5]" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <Link 
                          to={`/blog/${post.id}`} 
                          className="text-base font-bold text-zinc-950 font-serif leading-snug hover:text-emerald-700 transition-colors line-clamp-2"
                        >
                          {post.title}
                        </Link>
                        <span className="block text-zinc-450 text-xs mt-1">
                          {moment(post.createdAt).format("MMM D, YYYY")}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-2 border-t border-zinc-50">
                      <Link to={`/publish?id=${post.id}`} className="flex-1 max-w-[120px]">
                        <button 
                          className="w-full py-2 flex items-center justify-center gap-1.5 border border-zinc-200 rounded-xl hover:bg-zinc-50 text-xs font-semibold text-zinc-700 transition-all"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                      </Link>
                      <button
                        onClick={(e) => handleDeleteClick(post.id, e)}
                        className="flex-1 max-w-[120px] py-2 flex items-center justify-center gap-1.5 border border-zinc-200 rounded-xl hover:bg-red-50 hover:text-red-650 hover:border-red-200 text-xs font-semibold text-zinc-700 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 px-6">
              <BookOpen className="w-8 h-8 text-zinc-250 mx-auto mb-3" />
              <p className="text-zinc-550 text-sm mb-4 font-light">You haven't written any stories yet.</p>
              <Link to="/publish">
                <button className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-full shadow-sm transition-colors active:scale-95 duration-100">
                  Create your first story
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Larger Stats Grid & Info Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-zinc-50 flex items-center justify-center border border-zinc-150 text-zinc-700 shrink-0">
              <BookOpen className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-zinc-950 font-serif leading-none">{posts.length}</span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mt-1">Stories</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-zinc-50 flex items-center justify-center border border-zinc-150 text-zinc-700 shrink-0">
              <FileText className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-zinc-950 font-serif leading-none">{localDraft ? 1 : 0}</span>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mt-1">Drafts</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-zinc-50 flex items-center justify-center border border-zinc-150 text-zinc-700 shrink-0">
              <User className="w-5.5 h-5.5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Bio Description</span>
              <p className="text-xs text-zinc-600 line-clamp-2 mt-0.5 leading-relaxed font-light">
                {localUser.description || "No biography details written yet."}
              </p>
            </div>
          </div>

        </div>

      </main>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 animate-fade-in p-4">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xl max-w-sm w-full animate-slide-down">
            <div className="flex gap-2 items-center text-red-650 mb-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h2 className="text-lg font-bold text-zinc-950 font-serif">Confirm Deletion</h2>
            </div>
            <p className="text-zinc-650 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete this story? This action is permanent and cannot be undone.
            </p>
            <div className="flex justify-end gap-3 text-sm">
              <button
                onClick={() => { setShowModal(false); setPostToDelete(null); }}
                className="px-4 py-2 border border-zinc-200 text-zinc-755 rounded-full hover:bg-zinc-50 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 font-semibold shadow-sm active:scale-95 duration-100"
              >
                Delete Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
