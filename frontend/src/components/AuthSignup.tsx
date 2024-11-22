import { SignupType } from "@mohitsingh4716/medium-common";
import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { toast } from "sonner";

export const AuthSignup = () => {
  const navigate= useNavigate();
  const [modelCard, setModelCard]= useState(false);

  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
    description: "",
  });

  const handleFirstSubmit= ()=>{
    if(postInputs.email && postInputs.password){
        setModelCard(true);
    }else{
      toast.warning("Please fill all fields");
    }
  }

  const closeModel= ()=>{
    setModelCard(false);
  }

  const sendRequest= async()=>{
    if(!postInputs.email || !postInputs.password || !postInputs.name || !postInputs.description){
      toast.warning("Please fill all fields");
      return;
    }
    const loadingToast = toast.loading("Signing in...");
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
      const jwt= response.data.jwt;
      // console.log(jwt);
      
      localStorage.setItem("token",jwt);
      
      toast.dismiss(loadingToast);
      toast.success("Signed in successfully");
      navigate("/blogs");
    }catch(e:any){
      toast.dismiss(loadingToast);
      if (e.response.data.error) {
        toast.warning(e.response.data.error);
      } else {
        console.error("An error occurred:", e);
        toast.error("An error occurred. Please try again later");
      }
    }
     
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      {/* {JSON.stringify(postInputs)} */}

      <div className="flex justify-center">
        <div>
          <div className="px-6">
            <div className="text-4xl font-extrabold">
              <div>Create an account</div>
            </div>
            <div className="text-slate-400 ml-6">
             Already have account?
              <Link className="pl-2 underline" to={ "/signin"}>
                Sign in
              </Link>
            </div>
          </div>

          <div className="pt-6">

            <LabelledInput
              label="email"
              placeholder="mohitsingh@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />

            <LabelledInput
              label="password"
              type={"password"}
              placeholder="123123"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
            />


            


            <button
              type="button"
              onClick={handleFirstSubmit}
              className="mt-8 w-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

       {modelCard && <ModelCard 
          setPostInputs={setPostInputs}
          sendRequest={sendRequest}
          closeModel={closeModel}
      />}

    </div>
  );
};



interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}


 function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm  text-black font-semibold pt-4 px-2">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}


interface ModelCardProps {
  setPostInputs: React.Dispatch<React.SetStateAction<SignupType>>;
  sendRequest: () => void;
  closeModel: () => void;
}

const ModelCard = ({ setPostInputs, sendRequest,closeModel }: ModelCardProps) => {

  const modelRef = useRef<HTMLDivElement | null>(null);

  const hideModel=(e: React.MouseEvent<HTMLDivElement>)=>{
    if(modelRef.current === e.target){
      closeModel();
    }
   }
  return (
    <div ref={modelRef} onClick={hideModel} className="fixed inset-0 backdrop-blur-sm  flex justify-center items-center">
          <div className="bg-white p-8 w-[380px] h-[440px] rounded-lg shadow-2xl">

         <div>
         <LabelledInput
              label="Name"
              placeholder="Mohit Kumar.."
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }));
              }}
            />
           

           <div>
            <label className="block mb-2 text-sm text-black font-semibold pt-4 px-2">
              Description
            </label>
            <textarea
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  description: e.target.value,
                }));
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-40" 
               placeholder="I am a software engineer..."
              required
            />
          </div>

            </div>
             <button
              type="button"
              onClick={sendRequest}
              className="mt-8 w-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Sign up
            </button>

            </div>
    </div>
  )
}
