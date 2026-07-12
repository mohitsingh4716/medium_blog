import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';
import { toast } from "sonner";

const TextEditor = lazy(() => import("../components/TextEditor").then(m => ({ default: m.TextEditor })));
import 'react-quill/dist/quill.snow.css';
import { Check, Edit3 } from "lucide-react";

export const Publish = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    firstImgUrl: "",
  });

  const handleContentChange = (content: string) => {
    setBlog((prev) => ({ ...prev, content }));

    // Auto-extract first image inside editor content if any
    const imgTagMatch = content.match(/<img[^>]+src="([^">]+)"/);
    const firstImageUrl = imgTagMatch ? imgTagMatch[1] : "";

    if (firstImageUrl) {
      setBlog((prev) => ({ ...prev, firstImgUrl: firstImageUrl }));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-16">
      <Appbar />

      <main className="md:max-w-4xl max-w-3xl mx-auto px-4 pt-10">
        
        {/* Centered Write Card */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-md space-y-5 animate-fade-in">
          
          {/* Header bar */}
          <div className="border-b border-zinc-100 pb-4 flex items-center gap-2 text-zinc-800">
            <Edit3 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold font-serif">Compose New Story</h2>
          </div>

          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-zinc-450 uppercase tracking-widest pl-0.5">
              Story Title
            </label>
            <input
              value={blog.title}
              onChange={(e) => {
                setBlog((prev) => ({ ...prev, title: e.target.value }));
              }}
              type="text"
              className="w-full px-4 py-3 bg-zinc-50/50 border border-zinc-200 rounded-xl text-base font-bold font-serif focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder-zinc-300"
              placeholder="Give your story a title..."
              required
            />
          </div>

          {/* Editor block */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-[10px] font-bold text-zinc-450 uppercase tracking-widest pl-0.5 mb-1.5">
              Body Content
            </label>
            <Suspense fallback={
              <div className="h-40 border border-zinc-200 rounded-xl bg-zinc-50/50 flex items-center justify-center text-xs text-zinc-400 animate-pulse">
                Loading editor modules...
              </div>
            }>
              <TextEditor value={blog.content} onChange={handleContentChange} />
            </Suspense>
          </div>

          {/* Actions Footer Panel */}
          <div className="border-t border-zinc-150 mt-8 pt-12 flex justify-end">
            <PublishButton blog={blog} />
          </div>

        </div>

      </main>
    </div>
  );
};

export const PublishButton = ({ blog }: any) => {
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!blog.title.trim() || !blog.content.trim()) {
      toast.warning("Title and content cannot be empty!");
      return;
    }
    
    const loadtoast = toast.loading("Publishing your blog...");

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`, 
        blog, 
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
   
      toast.dismiss(loadtoast);
      toast.success("Blog published successfully!");
      navigate(`/blog/${response.data.id}`);
    } catch (e: any) {
      toast.dismiss(loadtoast);
      if (e.response?.data?.error) {
        toast.warning(e.response.data.error);
      } else {
        console.error("An error occurred:", e);
        toast.error("An error occurred. Please try again later");
      }
    }
  };

  return (
    <button 
      onClick={handlePublish} 
      type="submit" 
      className="inline-flex items-center gap-1.5 py-2.5 px-6 text-xs font-semibold text-center text-white bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 duration-100"
    >
      <Check className="w-3.5 h-3.5" /> Publish Story
    </button>
  );
};
