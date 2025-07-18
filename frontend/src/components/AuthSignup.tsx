import { SignupType } from "@mohitsingh4716/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { toast } from "sonner";
import moto from "../assets/moto.png"; // Make sure to replace this with the actual path to your logo image

export const AuthSignup = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
    description: "",
  });

  const sendRequest = async () => {
    if (
      !postInputs.email ||
      !postInputs.password ||
      !postInputs.name ||
      !postInputs.description
    ) {
      toast.warning("Please fill all fields");
      return;
    }
    const loadingToast = toast.loading("Signing up...");
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      toast.dismiss(loadingToast);
      toast.success("Signed up successfully");
      navigate("/blogs");
    } catch (e) {
      toast.dismiss(loadingToast);
      if (axios.isAxiosError(e) && e.response?.data?.error) {
        toast.warning(e.response.data.error);
      } else {
        console.error("An error occurred:", e);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full">
      <div className="text-center">
         <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-1">
              <img src={moto} alt="Medium Logo" />
            </div>
            <div className="text-3xl font-bold font-serif text-black pt-2">
              edium
            </div>
          </div>
        <h1 className="text-3xl font-extrabold text-gray-900">Create an account</h1>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="font-medium text-blue-700 hover:text-blue-500 underline">
            Sign in
          </Link>
        </p>
      </div>
      <div className="mt-6">
        <LabelledInput
          label="Name"
          placeholder="Your name"
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              name: e.target.value,
            }));
          }}
        />
        <LabelledInput
          label="Email"
          placeholder="xyz@gmail.com"
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              email: e.target.value,
            }));
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
        <DescriptionInput
          label="Description"
          placeholder="Briefly describe yourself..."
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              description: e.target.value,
            }));
          }}
        />
        <button
          type="button"
          onClick={sendRequest}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300  mt-6"
        >
          Sign up
        </button>
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

interface DescriptionInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function DescriptionInput({ label, placeholder, onChange }: DescriptionInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4 px-2">
        {label}
      </label>
      <textarea
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-24"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
