import { FullBlogContent } from "../components/FullBlogContent";
import { useBlogContent } from "../hooks/useBlogContent"
import { useParams } from "react-router-dom";
import { Loadings } from "../Loadings/Loadings";
import { Appbar } from "../components/Appbar";

export const BlogContent = () => {
    const {id}= useParams();
    const {loading ,blog}= useBlogContent({
        id: id || ""
    });

       if(loading || !blog){
        return <div className="bg-white min-h-screen">
           <Appbar />
           <div className="pt-4">
             <Loadings/>
           </div>
        </div>
       }
   return (
     <div>
         <FullBlogContent blog={blog}  />
     </div>
   )
}

