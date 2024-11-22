
import moment from "moment";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/useBlogs"
import { BlogLoading } from "../Loadings/BlogLoading";
import { useEffect, useState } from "react";
import { ArrowUpFromDot } from "lucide-react";



export const Blog = () => {
    // store it in state
    // store it directly here
    // store it in a context variables
    // create our own custom hook called useBlogs


    const {loading, blogs}= useBlogs();
        if(loading){
          return <div>
            
           <BlogLoading/>
          </div>
        }

  return (
    <div>
      <Appbar/>
    <div className="flex justify-center">
        <div className="max-w-xl mt-16">
        {blogs
          .slice() 
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) 
          .map((blog)=> <BlogCard
            key={blog.id}
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={getTimeDifference(blog.createdAt)}
            firstImgUrl={blog.image}
            description={blog.author.description}   
                     />)}
            
        </div>
        
    </div>
    <ScrollToTopButton/>
  </div>
  )
}


const getTimeDifference = (createdAt: moment.MomentInput) => {
  const currentTime = new Date();
  const uploadTime = moment(createdAt).toDate();
  const diffInMs = currentTime.getTime() - uploadTime.getTime(); 
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInMinutes < 1) {
    return `${diffInSeconds} sec ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hr ago`;
  } else {
    return moment(createdAt).format('dddd, Do MMM, YYYY'); 
  }
};


const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed font-semibold   bottom-4 left-2/4 transform -translate-x-1/2 bg-gray-700 opacity-60 hover:bg-gray-900 text-white py-1 px-3 m-1 rounded-full shadow-l  flex items-center space-x-1 focus:outline-none"
          aria-label="Scroll to top"
        >
            <span>Move to top</span> <ArrowUpFromDot />
        </button>
      )}
    </div>
  );
};

