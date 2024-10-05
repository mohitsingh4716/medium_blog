import { format } from "date-fns";
import { BlogCard } from "../components/BlogCard";
import { useUserPost } from "../hooks/useUserPost";
import { BlogLoading } from "../Loadings/BlogLoading";
import { Appbar } from "../components/Appbar";


export const UserPost= ()=>{

    const {loading, posts}= useUserPost();

    if(loading){
        return <div>
            <BlogLoading/>
        </div>
    }

    return <div>
         <Appbar/>
        <div className="flex justify-center">
            <div className=" max-w-xl mt-16">
               
             {/* {JSON.stringify(posts[0])} */}

                { posts.map(post=> <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    publishedDate={format(new Date(post.createdAt), 'do MMM yyyy')} 
                    authorName={post.author.name}
                     description={post.author.description}        />)}
            </div>
        </div>
    </div>
}

