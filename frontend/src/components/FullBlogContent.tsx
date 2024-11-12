import { Appbar } from "./Appbar";
import { Blog } from "../hooks/useBlogs";
import { Avatar } from "./BlogCard";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Trash2 } from 'lucide-react';
import { toast } from "sonner";

export const FullBlogContent = ({ blog }: { blog: Blog }) => {
  const nevigate= useNavigate();

  const { id } = useParams();
  const handleDelete = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault(); 
      e.stopPropagation();
      // console.log("Delete button clicked");
      const loadtoast= toast.loading("Deleting your blog...");
    
       
     try{await axios.delete(`${BACKEND_URL}/api/v1/blog/deleteblog/${id}`,{
          headers:{
              Authorization:localStorage.getItem("token")
          }
      })
      toast.dismiss(loadtoast);
      toast.success("Blog deleted successfully!");
      // console.log(response);
      nevigate(-1);
    }catch(error){
      console.error("Failed to delete post", error);
      toast.dismiss(loadtoast);
      toast.error("Failed to delete post");
    }

  }
    
  return (
    <div>
      <Appbar />
      <div className="flex justify-ceter pt-20 ">
        <div className="lg:grid lg:grid-cols-12  px-10 w-full   max-w-screen-2xl ">
          <div className="col-span-10 lg:col-span-8 lg:border-r">
                <div className=" text-5xl font-extrabold overflow-hidden">
                    {blog.title}
                </div>
               <div className="text-slate-500 pt-4 flex justify-between">{moment(blog.createdAt).format('dddd, Do MMMM, YYYY')}
                    <div className="pt-1 pr-5">
                          <button
                              onClick={handleDelete}
                              className="text-black px-5 "
                          >
                              <Trash2 size={24} />
                          </button>
                      </div>
               </div>
                <div className="pt-2 text-justify overflow-hidden mr-4 " dangerouslySetInnerHTML={{ __html: blog.content }}>
                
                </div>

               
            </div>

            <div className="hidden  lg:block lg:col-span-4 px-10">
               <div className="text-slate-500">
                  Author
               </div>
                <div className="flex w-full">
                    <div className="pr-2 flex flex-col justify-center">
                          <Avatar name={blog.author.name || "Anonymous"} size={"big"}/> 
                    </div>
                 
                    <div>
                        <div className="text-xl font-bold pb-2">
                        {blog.author.name || "Anonymous"}
                        </div>
                        <div className="text-slate-500">
                        {blog.author.description || "I have to study myself in actuality – as I am, not as I wish to be."}
                        </div>
                    </div>
                   
                </div>
              
            </div>
            <div>

            </div>
        </div>
      </div>
    </div>
  );
};
