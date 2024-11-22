import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../index.css';
import { toast } from "sonner";
import { TextEditor } from "../components/TextEditor";
import 'react-quill/dist/quill.snow.css';


export const Publish = () => {

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    firstImgUrl: "",
  });

  const handleContentChange = (content: string) => {
    setBlog((prev) => ({ ...prev, content }));

    const imgTagMatch = content.match(/<img[^>]+src="([^">]+)"/);
    const firstImageUrl = imgTagMatch ? imgTagMatch[1] : "";

    if (firstImageUrl) {
      // console.log("First Image URL:", firstImageUrl);
      setBlog((prev) => ({ ...prev, firstImgUrl: firstImageUrl }));
    }
  };

    
  return (
    <div>
        <Appbar/>
   
        <div className="flex  justify-center  pt-20 ">
            <div className="max-w-screen-lg w-96  lg:w-full">

                <input value={blog.title} onChange={(e)=>{
                    setBlog((prev)=>({...prev, title: e.target.value}))
                }} type="text" className=" bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-16 p-2.5 " placeholder="Title"/>
                
               {/* { JSON.stringify(blog)} */}

                <TextEditor value={blog.content} onChange={handleContentChange} />

                <div className="mt-20 lg:mt-16">
                <PublishButton blog={blog} />
                </div>
                
            </div>
        
        </div>
   
    </div>
  )
}





export const PublishButton = ( {blog}: any) => {
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!blog.title.trim() || !blog.content.trim()) {
      toast.warning("Title and content cannot be empty!");
      return;
    }
    
    const loadtoast= toast.loading("Publishing your blog...");

      try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, 
          blog
      , {
          headers: {
              Authorization: localStorage.getItem("token")
          }
      });
   
      toast.dismiss(loadtoast);
      toast.success("Blog published successfully!");
      navigate(`/blog/${response.data.id}`);
      }catch(e:any){
        toast.dismiss(loadtoast);
        if (e.response.data.error) {
          toast.warning(e.response.data.error);
        } else {
          console.error("An error occurred:", e);
          toast.error("An error occurred. Please try again later");
      }
    }
      
  };

  return (
      <button 
          onClick={handlePublish} 
          type="submit" 
          className="inline-flex items-center  py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
          Publish
      </button>
  );
};



    
