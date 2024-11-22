import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";


interface UserPostType{
    author: any;
    id:string,
    title:string,
    content:string,
    image:string,
    createdAt: string | number | Date,
}

export const useUserPost = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts]= useState<UserPostType[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/userInfo/post`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(response =>{
            setPosts(response.data.posts);
            setLoading(false);
        })
    }, [])

  return {
    loading,
    posts

  }
    
  
}