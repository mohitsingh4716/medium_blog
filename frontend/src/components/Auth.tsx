import { SignupType } from "@mohitsingh4716/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate= useNavigate();
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  const sendRequest= async()=>{
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"?"signup" :"signin"}`, postInputs);
      const jwt= response.data.jwt;
      // console.log(jwt);
      

      localStorage.setItem("token",jwt);
      navigate("/blog");
    }catch(e){
      alert("Error while signing up")
      // alert the user here that the request failed
    }
     
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      {/* {JSON.stringify(postInputs)} */}

      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">
              <div>Create an account</div>
            </div>
            <div className="text-slate-400">
             { type==="signin" ? "Don't have an account" :"Already have account?"}
              <Link className="pl-2 underline" to={ type=== "signin"? "/signup" : "/signin"}>
                {type=== "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>

          <div className="pt-6">


           { type==="signup" && <LabelledInput
              label="Name"
              placeholder="Mohit Kumar.."
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }));
              }}
            />
           }

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
              onClick={sendRequest}
              className="mt-8 w-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
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
        <label className="block mb-2 text-sm  text-black font-semibold">
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
