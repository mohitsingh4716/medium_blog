import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../index.css';




import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export const Publish = () => {
    const [title, setTitle]= useState("");
    const [content, setContent]= useState("");
    const navigate= useNavigate();
  return (
    <div>
        <Appbar/>
   
        <div className="flex  justify-center w-full pt-24 ">
            <div className="max-w-screen-lg w-full">

                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }} type="text" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title"/>
                
               {/* { JSON.stringify(content)} */}

                <TextEditor onChange={(value)=>{
                    setContent(value)
                }}/>


                <button onClick={async()=>{
               const response=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,
                    content
                },{
                    headers:{
                        Authorization: localStorage.getItem("token")
                    }
                });
                navigate(`/blog/${response.data.id}`)

            }} type="submit" className="inline-flex items-center mt-16 py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Publish
            </button>
            </div>
        
        </div>
   
    </div>
  )
}





function TextEditor({onChange}:{onChange: (value: string) => void}) {
  

  return(
    <div className="mt-8 mx-auto " >
    <ReactQuill
      theme="snow"
      onChange={onChange}
      modules={TextEditor.modules}
      formats={TextEditor.formats}
      placeholder="Write an article..."
      className="h-96"
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
      ['bold', 'italic', 'underline', 'strike'], 
      [{ 'color': [] }, { 'background': [] }], 
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], 
      ['link', 'image'], 
      ['clean'] 
    ]
  };
  
  TextEditor.formats = [
    'header', 'font', 'size', 'align',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet',
    'link', 'image'
  ];
    
