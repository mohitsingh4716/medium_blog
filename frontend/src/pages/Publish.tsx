import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../index.css';
import { toast } from "sonner";


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export const Publish = () => {
    const [title, setTitle]= useState("");
    const [content, setContent]= useState("");
    
  return (
    <div>
        <Appbar/>
   
        <div className="flex  justify-center  pt-20 ">
            <div className="max-w-screen-lg w-96  lg:w-full">

                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }} type="text" className=" bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-16 p-2.5 " placeholder="Title"/>
                
               {/* { JSON.stringify(content)} */}

                <TextEditor onChange={(value)=>{
                    setContent(value)
                }}/>

                <div className="mt-20 lg:mt-16">
                <PublishButton title={title} content={content} />
                </div>
                
            </div>
        
        </div>
   
    </div>
  )
}


interface PublishButtonProps {
  title: string;
  content: string;
}

export const PublishButton = ({ title, content }: PublishButtonProps) => {
  const navigate = useNavigate();

  const handlePublish = async () => {
    const loadtoast= toast.loading("Publishing your blog...");

      try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
          title,
          content
      }, {
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


function TextEditor({onChange}:{onChange: (value: string) => void}) {
  

  return(
    <div className="mt-4 lg:mt-8 w-96 lg:w-full " >
    <ReactQuill
      theme="snow"
      onChange={onChange}
      modules={TextEditor.modules}
      formats={TextEditor.formats}
      placeholder="Write an article..."
      className="h-[500px] rounded-md"
    />
  </div>
  )
  
}

TextEditor.modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }], 
      [{ 'font': [] }], // Font options
      [{ 'size': ['small', false, 'large', 'huge'] }], 
      [{ 'align': [] }],
      ['bold', 'italic', 'underline'], 
      [{ 'color': [] }, { 'background': [] }], 
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], 
      ['link', 'image'], 
      ['clean'] 
    ]
  };
  
  TextEditor.formats = [
    'header', 'font', 'size', 'align',
    'bold', 'italic', 'underline', 
    'color', 'background', 'list', 'bullet',
    'link', 'image'
  ];
    
