import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";



export interface Blog{
    id:string,
    content:string,
    title:string,
    author:{
        name:string
    }

}

export const useBlogContent = ({id}:{id:string}) => {

   
    const [loading, setLoading] = useState(true);
    const [blog, setBlog]= useState<Blog>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
            .then(response =>{
                setBlog(response.data);
                setLoading(false);
            })
    }, [id])

  return {
    loading,
    blog

  }

  
}

