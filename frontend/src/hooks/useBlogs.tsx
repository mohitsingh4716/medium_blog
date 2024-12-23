import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
    createdAt: string | number | Date;
    id:string,
    content:string,
    title:string,
    image:string,
    author:{
        name:string,
        description:string,
    }

}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs]= useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(response =>{
            setBlogs(response.data.posts);
            setLoading(false);
        })
    }, [])

  return {
    loading,
    blogs

  }
    
  
}

