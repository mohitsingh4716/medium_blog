
import parse from 'html-react-parser';
import { Sparkle } from 'lucide-react';
import { Link} from "react-router-dom";


 export interface BlogCardProps{
    id:string;
    authorName: string;
    description:string;
    title:string;
    content: string;
    publishedDate:string
 }

 export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
 }:BlogCardProps) => {

    const plainTextContent = stripHtmlTags(content);
    // console.log(plainTextContent);
    const readingTime = Math.ceil(plainTextContent.length / 100);
    const shortTitle = title.length > 70 ? title.slice(0, 70) + "..." : title;

    return (
        <Link to={`/blog/${id}`}>
          <div className="p-4 border-b border-slate-200 pb-4 w-80 lg:w-full">
                <div className="flex">
                    <div className="flex justify-center flex-col">
                        <Avatar name={authorName} size={"small"} />
                    </div>

                    <div className="pt-1 font-medium text-slate-700 hover:text-slate-900 pl-2 text-sm">{authorName}</div>

                    <div className="pt-1 pl-2 font-extralight text-slate-500 hover:text-slate-800 text-sm">
                        {publishedDate}
                    </div>
                
                </div>
        
                <div className="text-xl font-semibold mt-1">{shortTitle}</div>

                <div className="text-md font-thin overflow-hidden">
                {parse(plainTextContent.slice(0, 200) + "....")}
                </div>
                
                <div className="text-slate-500 text-sm font-thin flex">
                  <div className='mr-2 pt-0.5 hover:text-gray-700'>
                    <Sparkle size={16} />
                  </div>
                   {`${readingTime} min read`}
                   
                </div>
          </div>
        </Link>
      );
    };


   const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  

 export function Avatar({name, size}:{name: string, size:"small" | "big"}){
    return <div className={`relative inline-flex items-center justify-center ${size === 'small' ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full border dark:bg-gray-600`}>
    <span className="font-medium text-gray-600 dark:text-gray-300">
        {name[0]}
    </span>
</div>

 }
 
