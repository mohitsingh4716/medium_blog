import { Appbar } from "./Appbar";
import { Blog } from "../hooks/useBlogs";
import { Avatar } from "./BlogCard";
import moment from "moment";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import { 
  Link2, Twitter, Linkedin, Trash2, Edit 
} from "lucide-react";

export const FullBlogContent = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { userInfo } = useUserProfile();

  // Dialog state
  const [showModal, setShowModal] = useState(false);

  // Reading progress state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Check if current user is author
  const isAuthor = userInfo?.id === blog.author.id || userInfo?.name === blog.author.name;

  // Reading progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    const loadtoast = toast.loading("Deleting your story...");

    try {
      await axios.delete(`${BACKEND_URL}/api/v1/blog/deleteblog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      toast.dismiss(loadtoast);
      toast.success("Story deleted successfully!");
      navigate("/blogs");
    } catch (error: any) {
      toast.dismiss(loadtoast);
      toast.error("Failed to delete post. Please try again later.");
    }
    setShowModal(false);
  };

  const plainTextContent = stripHtmlTags(blog.content);
  const wordCount = plainTextContent.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 225));

  // Regex filter: strip duplicate cover image from the HTML content body to prevent double rendering
  let sanitizedContent = blog.content;
  if (blog.image) {
    try {
      const urlObj = new URL(blog.image);
      const uniquePath = urlObj.pathname;
      if (uniquePath && uniquePath.length > 3) {
        const escapedPath = uniquePath.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const imgRegex = new RegExp(`(<p[^>]*>\\s*)?<img[^>]+src=["'][^"']*${escapedPath}[^"']*["'][^>]*>(\\s*<\/p>)?`, 'i');
        sanitizedContent = blog.content.replace(imgRegex, '');
      }
    } catch (e) {
      const escapedUrl = blog.image.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const imgRegex = new RegExp(`(<p[^>]*>\\s*)?<img[^>]+src=["']${escapedUrl}["'][^>]*>(\\s*<\/p>)?`, 'i');
      sanitizedContent = blog.content.replace(imgRegex, '');
    }
  }

  return (
    <div className="min-h-screen bg-white pb-12">
      <Appbar />

      {/* Reading Progress Indicator */}
      <div 
        className="fixed top-16 left-0 h-1 bg-emerald-600 z-50 transition-all duration-75" 
        style={{ width: `${scrollProgress}%` }}
      />

      <article className="max-w-2xl mx-auto px-4 pt-16">
        
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-zinc-900 tracking-tight leading-tight mb-3">
          {blog.title}
        </h1>

        {/* Author / Share row */}
        <div className="flex items-center justify-between border-y border-zinc-100 py-2.5 mb-4.5">
          <div className="flex items-center gap-3">
            <Link to={blog.author.id ? `/profile/${blog.author.id}` : "#"}>
              <Avatar name={blog.author.name || "Anonymous"} size="big" />
            </Link>
            <div>
              <div className="flex items-center gap-1.5">
                <Link 
                  to={blog.author.id ? `/profile/${blog.author.id}` : "#"} 
                  className="font-semibold text-sm text-zinc-900 hover:text-emerald-700 hover:underline transition-all"
                >
                  {blog.author.name || "Anonymous"}
                </Link>
              </div>
              <p className="text-xs text-zinc-400 font-light mt-0.5">
                Published {moment(blog.createdAt).format("MMMM D, YYYY")} · {readingTime} min read
              </p>
            </div>
          </div>

          {/* Sharing widgets */}
          <div className="flex items-center gap-2.5 text-zinc-400">
            <button 
              onClick={handleCopyLink}
              className="hover:text-zinc-950 transition-colors p-1.5 hover:bg-zinc-50 rounded-lg"
              title="Copy link"
            >
              <Link2 className="w-4.5 h-4.5" />
            </button>
            <a 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
              target="_blank" 
              rel="noreferrer"
              className="hover:text-zinc-950 transition-colors p-1.5 hover:bg-zinc-50 rounded-lg"
              title="Share on Twitter"
            >
              <Twitter className="w-4.5 h-4.5" />
            </a>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank" 
              rel="noreferrer"
              className="hover:text-zinc-950 transition-colors p-1.5 hover:bg-zinc-50 rounded-lg"
              title="Share on LinkedIn"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>

            {/* Author edits */}
            {isAuthor && (
              <div className="flex gap-2 ml-1.5 border-l border-zinc-200 pl-3">
                <Link 
                  to={`/publish?id=${blog.id}`} 
                  className="hover:text-emerald-700 transition-colors p-1.5 hover:bg-zinc-50 rounded-lg"
                  title="Edit story"
                >
                  <Edit className="w-4.5 h-4.5" />
                </Link>
                <button 
                  onClick={() => setShowModal(true)} 
                  className="hover:text-red-650 transition-colors p-1.5 hover:bg-zinc-50 rounded-lg"
                  title="Delete story"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cover Image (Rendered only once here) */}
        {blog.image && (
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 mb-5 shadow-sm">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover" 
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        {/* Content Body (Sanitized to strip duplicate cover image) */}
        <div className="prose-custom leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

        {/* Author Bio Card */}
        <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-5 mt-6">
          <div className="flex gap-4 items-start">
            <Link to={blog.author.id ? `/profile/${blog.author.id}` : "#"}>
              <Avatar name={blog.author.name || "Anonymous"} size="big" />
            </Link>
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Written by</p>
              <Link 
                to={blog.author.id ? `/profile/${blog.author.id}` : "#"} 
                className="text-base font-bold text-zinc-950 hover:text-emerald-700 transition-colors"
              >
                {blog.author.name || "Anonymous"}
              </Link>
              <p className="text-sm text-zinc-650 font-light mt-1 leading-relaxed">
                {blog.author.description || "Writer on this platform."}
              </p>
            </div>
          </div>
        </div>

      </article>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 animate-fade-in p-4">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xl max-w-sm w-full animate-slide-down">
            <h2 className="text-lg font-bold text-zinc-950 font-serif mb-2">Delete Story</h2>
            <p className="text-zinc-650 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete this story? This action is permanent and cannot be undone.
            </p>
            <div className="flex justify-end gap-3 text-sm">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-zinc-200 text-zinc-700 rounded-full hover:bg-zinc-50 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-650 border-zinc-300 hover:text-white rounded-full text-zinc-900 bg-red-600 hover:bg-red-800 font-semibold shadow-sm active:scale-95 duration-100"
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

const stripHtmlTags = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};
