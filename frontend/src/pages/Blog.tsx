import { useMemo, useState } from "react";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/useBlogs";
import { BlogLoading } from "../Loadings/BlogLoading";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { BookOpen, Search } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";

export const Blog = () => {
  const { loading, blogs } = useBlogs();
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useDebounce(searchQuery, 400);

  // Sort by date (newest first) and filter by search query (real database entries)
  // const filteredBlogs = blogs
  //   .filter((blog) => {
  //     const query = searchQuery.toLowerCase();
  //     const titleMatch = blog.title.toLowerCase().includes(query);
  //     const authorMatch = blog.author.name.toLowerCase().includes(query);
  //     return titleMatch || authorMatch;
  //   })
  //   .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

   const filteredBlogs = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return blogs
      .filter((blog) => {
        if (!query) return true;

        return (
          blog.title.toLowerCase().includes(query) ||
          blog.author.name.toLowerCase().includes(query)
        );
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
  }, [blogs, debouncedSearch]);


   if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Appbar />
        <div className="max-w-2xl mx-auto px-4 pt-24">
          <BlogLoading />
        </div>
      </div>
    );
  }



  return (
    <div className="bg-white min-h-screen">
      <Appbar />
      
      <main className="max-w-2xl mx-auto px-4 pt-12 pb-16">
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-zinc-50/50"
            placeholder="Search stories by title or author..."
          />
        </div>

        {/* Blogs Feed */}
        <div className="divide-y divide-zinc-100">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                authorId={blog.author.id}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.createdAt.toString()}
                firstImgUrl={blog.image}
                description={blog.author.description}
              />
            ))
          ) : (
            <div className="text-center py-20 bg-zinc-50/50 rounded-2xl border border-zinc-200 border-dashed">
              <BookOpen className="w-8 h-8 text-zinc-300 mx-auto mb-3" />
              <p className="text-zinc-500 text-sm font-medium">No stories found.</p>
            </div>
          )}
        </div>
      </main>
      
      <ScrollToTopButton />
    </div>
  );
};
export default Blog;
