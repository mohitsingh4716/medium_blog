import { Appbar } from "./Appbar";
import { Blog } from "../hooks/useBlogs";
import { Avatar } from "./BlogCard";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

import { toast } from "sonner";
import { useState } from "react";


export const FullBlogContent = ({ blog }: { blog: Blog }) => {
  const nevigate = useNavigate();

  const { id } = useParams();
   const [showDelete, setShowDelete] = useState(false);
   const [showModal, setShowModal] = useState(false);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("Delete button clicked");
    const loadtoast = toast.loading("Deleting your blog...");


    try {
      await axios.delete(`${BACKEND_URL}/api/v1/blog/deleteblog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      toast.dismiss(loadtoast);
      toast.success("Blog deleted successfully!");
      // console.log(response);
      nevigate(-1);
    } catch (error: any) {
      console.error("Failed to delete post", error);
      toast.dismiss(loadtoast);

      if (error.response && error.response.status === 400) {
        toast.error("You cannot delete this post. Only the original poster can perform this action.");
      } else {
        toast.error("Failed to delete post. Please try again later.");
      }
    }
    setShowModal(false);
    setShowDelete(false);

  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-ceter pt-20 ">
        <div className="lg:grid lg:grid-cols-12  px-10 w-full   max-w-screen-2xl ">
          <div className="col-span-10 lg:col-span-8 lg:border-r">
            <div className=" text-5xl font-extrabold overflow-hidden">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-4 flex justify-between">{moment(blog.createdAt).format('dddd, Do MMMM, YYYY')}
              <div className="pt-1 pr-5">
              {showDelete ? (
        <div className="relative">
          
          <button
             onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-gray-400 text-black font-semibold rounded shadow-lg hover:bg-red-600 hover:text-white"
          >
            Delete Blog
          </button>
          <button
            onClick={() => setShowDelete(false)}
            className="ml-2 px-2 py-1 text-black bg-gray-200 rounded hover:bg-gray-300"
          >
            ✕
          </button>
        </div>
      ) : (
        /* Dots Button */
        <button
          onClick={() => setShowDelete(true)}
          className="text-black px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          ...
        </button>
      )}
              </div>
            </div>
            <div className="pt-2 text-justify overflow-hidden mr-4 " dangerouslySetInnerHTML={{ __html: blog.content }}>

            </div>


          </div>

          <div className="hidden  lg:block lg:col-span-4 px-10">
            <div className="text-slate-500">
              Author
            </div>
            <div className="flex w-full">
              <div className="pr-2 flex flex-col justify-center">
                <Avatar name={blog.author.name || "Anonymous"} size={"big"} />
              </div>

              <div>
                <div className="text-xl font-bold pb-2">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="text-slate-500">
                  {blog.author.description || "I have to study myself in actuality – as I am, not as I wish to be."}
                </div>
              </div>

            </div>

          </div>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-bold">Confirm Delete</h2>
                <p>Are you sure you want to delete this blog?</p>
                <div className="flex justify-around space-x-4 mt-4">
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => { setShowModal(false);   setShowDelete(false);}}
                    
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                 
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>

  );
};
