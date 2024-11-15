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
        const localUserData= async()=>{
            const localData =localStorage.getItem("userProfile");
            if(localData){
                setUserInfo(JSON.parse(localData));
                setLoading(false);
            }else{
                try{
                    const response = await axios.get(`${BACKEND_URL}/api/v1/userInfo`,{
                        headers:{
                            Authorization:localStorage.getItem("token")
                        }
                    })
                    setUserInfo(response.data.user);
                   
                    localStorage.setItem("userProfile",JSON.stringify(response.data.user));
                    setLoading(false);
                }
                catch(error){
                    console.log(error);
                    setLoading(false);
                }
            }
        }
        

        localUserData();
    }, [])

  return {
    loading,
    userInfo

  }
    
  
}