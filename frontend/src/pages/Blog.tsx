
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/useBlogs"
import { BlogLoading } from "../Loadings/BlogLoading";
import { format } from 'date-fns';



export const Blog = () => {
    // store it in state
    // store it directly here
    // store it in a context variables
    // create our own custom hook called useBlogs

    const {loading, blogs}= useBlogs();
        if(loading){
          return <div>
            {/* skeleton */}
           <BlogLoading/>
          </div>
        }

  return (
    <div>
      <Appbar/>
    <div className="flex justify-center">
        <div className=" max-w-xl mt-16">
          { blogs.map(blog=> <BlogCard
            key={blog.id}
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={format(new Date(blog.createdAt), 'do MMM yyyy')} 
            description={blog.author.description}   
                     />)}
            
        </div>

       

        
    </div>
  </div>
  )
}
