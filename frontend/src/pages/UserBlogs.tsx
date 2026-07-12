import { BlogCard } from "../components/BlogCard";
import { useUserPost } from "../hooks/useUserPost";
import { BlogLoading } from "../Loadings/BlogLoading";
import { Appbar } from "../components/Appbar";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export const UserPost = () => {
  const { loading, posts } = useUserPost();

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Appbar />
        <div className="max-w-4xl mx-auto px-4 pt-20">
          <BlogLoading />
        </div>
      </div>
    );
  }

  const sortedPosts = posts
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="bg-white min-h-screen">
      <Appbar />
      
      <main className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        {/* Page Header */}
        <div className="border-b border-zinc-100 pb-6 mb-8">
          <h1 className="text-3xl font-bold font-serif text-zinc-950">Your Stories</h1>
          <p className="text-sm text-zinc-500 font-light mt-1">
            Manage and view all the stories you've published.
          </p>
        </div>

        {/* Stories list */}
        <div className="divide-y divide-zinc-100">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                firstImgUrl={post.image}
                publishedDate={post.createdAt.toString()}
                authorName={post.author.name}
                authorId={post.author.id}
                description={post.author.description}
              />
            ))
          ) : (
            <div className="text-center py-20 bg-zinc-50/50 rounded-2xl border border-zinc-200 border-dashed">
              <BookOpen className="w-8 h-8 text-zinc-300 mx-auto mb-3" />
              <p className="text-zinc-500 text-sm mb-4">You haven't written any stories yet.</p>
              <Link to="/publish">
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-full shadow-sm transition-colors">
                  Write your first story
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <ScrollToTopButton />
    </div>
  );
};
export default UserPost;
