import { FullBlogContent } from "../components/FullBlogContent";
import { useBlogContent } from "../hooks/useBlogContent"
import { useParams } from "react-router-dom";

export const BlogContent = () => {
    const {id}= useParams();
    const {loading ,blog}= useBlogContent({
        id: id || ""
    });

       if(loading || !blog){
        return <div>
            Loading.
        </div>
       }
   return (
    <div>
        <FullBlogContent blog={blog}  />
    </div>
  )
}

