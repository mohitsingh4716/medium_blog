import { Appbar } from "./Appbar";
import { Blog } from "../hooks/useBlogs";
import { Avatar } from "./BlogCard";
import { format } from "date-fns";

export const FullBlogContent = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-ceter pt-14 ">
        <div className="grid grid-cols-12  px-10 w-full pt-12  max-w-screen-2xl ">
          <div className="col-span-8 border-r">
                <div className=" text-5xl font-extrabold">
                    {blog.title}
                </div>
               <div className="text-slate-500 pt-4">{format(new Date(blog.createdAt), 'do MMM yyyy')}</div>
                <div className="pt-2 text-justify mr-4 " dangerouslySetInnerHTML={{ __html: blog.content }}>
                
                </div>
            </div>

            <div className=" col-span-4 px-10">
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
