import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"




import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export const NewPublish = () => {
    const [title, setTitle]= useState("");
    const [content, setContent]= useState("");
    const navigate= useNavigate();
  return (
    <div>
        <Appbar/>
   
        <div className="flex  justify-center w-full pt-8 ">
            <div className="max-w-screen-lg w-full">

                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }} type="text" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title"/>

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

            }} type="submit" className="inline-flex items-center mt-10 py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Publish
            </button>
            </div>
        
        </div>
   
    </div>
  )
}








function TextEditor({onChange}:{onChange: (value: string) => void}) {
  

  return <ReactQuill theme={"snow"} onChange={onChange} />;
}
    
