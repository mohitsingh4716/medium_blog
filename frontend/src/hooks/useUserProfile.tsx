import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";


interface userProfile{
    name:string,
    email:string,
    description:string,
    id:string
}

export const useUserProfile = () => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo]= useState<userProfile>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/userInfo`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
            .then(response =>{
                setUserInfo(response.data.user);
                setLoading(false);
            })
    }, [])

  return {
    loading,
    userInfo

  }
    
  
}