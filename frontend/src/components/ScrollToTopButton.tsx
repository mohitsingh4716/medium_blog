import { ArrowUpFromDot } from "lucide-react";
import { useEffect, useState } from "react";

export const ScrollToTopButton = () => {
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
  
  