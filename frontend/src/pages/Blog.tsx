
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/useBlogs"


export const Blog = () => {
    // store it in state
    // store it directly here
    // store it in a context variables
    // create our own custom hook called useBlogs

    const {loading, blogs}= useBlogs();
        if(loading){
          return <div>
            {/* skeleton */}
            Loading.. 
          </div>
        }

  return (
    <div>
      <Appbar/>
    <div className="flex justify-center">
        <div className=" max-w-xl">
          { blogs.map(blog=> <BlogCard
            key={blog.id}
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"2nd Feb 2024"}
            />)}
            
        </div>

       

        
    </div>
  </div>
  )
}
