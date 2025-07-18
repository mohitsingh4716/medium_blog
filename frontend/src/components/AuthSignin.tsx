import { SigninType } from "@mohitsingh4716/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { toast } from "sonner";
import moto from "../assets/moto.png"; // Make sure to replace this with the actual path to your logo image

export const AuthSignin = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SigninType>({
    email: "",
    password: "",
  });

  const sendRequest = async () => {
    if (!postInputs.email || !postInputs.password) {
      toast.warning("Please fill all fields");
      return;
    }
    const loadingToast = toast.loading("Signing in...");
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      toast.dismiss(loadingToast);
      toast.success("Signed in successfully");
      navigate("/blogs");
    } catch (e) {
      toast.dismiss(loadingToast);
      if (axios.isAxiosError(e) && e.response?.data?.error) {
        toast.warning(e.response.data.error);
      } else {
        console.error("An error occurred:", e);
        toast.error("Incorrect email or password. Please try again.");
      }
    }
  };

  return (
    <div className=" bg-gray-50 flex items-center justify-center ">
      <div className="w-full max-w-lg">
        <div className="bg-white shadow-lg rounded-lg p-8 h-[480px]">
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-1">
              <img src={moto} alt="Medium Logo" />
            </div>
            <div className="text-3xl font-bold font-serif text-black pt-2">
              edium
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-700 hover:text-blue-500 underline"
              >
                Sign up
              </Link>
            </p>
          </div>
          <div className="mt-6">
            <LabelledInput
              label="Email"
              placeholder="xyz@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="Minimum 6 characters"
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
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
            >
              Sign in
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

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4 px-2">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
