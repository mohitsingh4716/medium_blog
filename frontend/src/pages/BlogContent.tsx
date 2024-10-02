import { FullBlogContent } from "../components/FullBlogContent";
import { useBlogContent } from "../hooks/useBlogContent"
import { useParams } from "react-router-dom";
import { Loadings } from "../Loadings/Loadings";

export const BlogContent = () => {
    const {id}= useParams();
    const {loading ,blog}= useBlogContent({
        id: id || ""
    });

       if(loading || !blog){
        return <div >
           <Loadings/>
        </div>
       }
   return (
    <div>
        <FullBlogContent blog={blog}  />
    </div>
  )
}

