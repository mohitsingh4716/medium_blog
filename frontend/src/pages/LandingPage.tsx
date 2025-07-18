
import { Edit3, BookOpen, Users, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

import moto from '../assets/moto.png';
import illus from '../assets/illus.jpg';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  // const [searchQuery, setSearchQuery] = useState('');

  const trendingBlogs = [
    {
      title: "The Future of Artificial Intelligence in Modern Business",
      excerpt: "Artificial intelligence (AI) is transforming the modern business landscape, offering immense opportunities for growth, efficiency, and innovation. According to PwC, AI is projected to contribute up to $15.7 trillion to the global economy by 2030.",
      author: "Somiya Gupta",
      readTime: "6 min read",
      date: "2 days ago",
      category: "Technology",
      image: "https://i.ibb.co/DP3L7J9Q/AI-Images.webp"
    },
      {
      title: "The Art of Remote Work: Productivity in the Digital Age",
      excerpt: "Master the skills needed to thrive in a remote work environment. Tips for staying productive, maintaining work-life balance, and building connections.",
      author: "Rishabh Mishra",
      readTime: "6 min read",
      date: "5 days ago",
      category: "Career",
      image: "https://media.self.com/photos/5e541ec86539d9000840ca30/4:3/w_2240,c_limit/work-from-home-office.jpg"
    },
      {
      title: "How to stop procrastination and get things done.",
      excerpt: "Overcoming procrastination and getting things done is a function of understanding why; it might be fear, overwhelm, or lack of motivation. Break tasks into smaller, manageable steps, then commit to working for only a few minutes, building momentum that way.",
      author: "Mohit Kumar",
      readTime: "4 min read",
      date: "3 week ago",
      category: "Lifestyle",
      image: "https://i.ibb.co/Z6rswbj/stop.jpg"
    },
    // {
    //   title: "Mental Health in the Modern World: Finding Balance",
    //   excerpt: "Understanding the importance of mental wellness and practical strategies for maintaining good mental health in our fast-paced digital society.",
    //   author: "Dr. Lisa Park",
    //   readTime: "10 min read",
    //   date: "1 week ago",
    //   category: "Health",
    //   image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&crop=faces"
    // },
  
    // {
    //   title: "Building a Successful Startup: Lessons from the Trenches",
    //   excerpt: "Real insights from entrepreneurs who've been there. Discover the mistakes to avoid and strategies that actually work in today's competitive landscape.",
    //   author: "Alex Rodriguez",
    //   readTime: "12 min read",
    //   date: "3 days ago",
    //   category: "Business",
    //   image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop&crop=faces"
    // },
  
    // {
    //   title: "Cryptocurrency and the Future of Finance",
    //   excerpt: "Demystifying digital currencies and blockchain technology. What you need to know about the evolving landscape of digital finance and investments.",
    //   author: "James Wilson",
    //   readTime: "7 min read",
    //   date: "4 days ago",
    //   category: "Finance",
    //   image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop&crop=faces"
    // },


  ];

  const features = [
    {
      icon: <Edit3 className="w-8 h-8" />,
      title: "Write Blogs",
      description: "Create and publish your stories with our intuitive editor. Share your thoughts with the world."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Discover Stories",
      description: "Explore thousands of stories from writers around the globe. Find content that inspires you."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Connect with Readers",
      description: "Build your audience and engage with readers who share your interests and passions."
    },
    // {
    //   icon: <Star className="w-8 h-8" />,
    //   title: "Premium Content",
    //   description: "Access exclusive content and support your favorite writers with our premium features."
    // }
  ];

  // const handleSearch = () => {
  //   console.log('Searching for:', searchQuery);
  // };

  return (
    <div className="flex flex-col min-h-screen bg-white">
     
      <Header />

   <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
  
  <div className="absolute inset-0 bg-gradient-to-r from-[#95b8d1]/20 to-[#95b8d1]/10"></div>
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#95b8d1]/15 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#95b8d1]/10 rounded-full blur-3xl"></div>
  <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#95b8d1]/8 rounded-full blur-2xl"></div>
  <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#95b8d1]/12 rounded-full blur-3xl"></div>
  
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
      {/* Left Side - Text Content */}
      <div className="lg:w-2/3 text-center lg:text-left">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-white mb-8 leading-[0.9] tracking-tight">
          Connect with the
          <span className="block text-[#95b8d1]">Modern World</span>
        </h1>
        <p className="text-xl md:text-2xl lg:text-2xl text-gray-200 mb-12 font-light leading-relaxed max-w-2xl">
          Insights, stories, and ideas for everyone.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
          <Link to="/blogs">
            <button className="bg-white text-black hover:text-white px-10 py-4 rounded-full hover:bg-green-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
              Start Writing
            </button>
          </Link>
          <Link to="/blogs">
            <button className="border-2 border-[#95b8d1] text-[#95b8d1] px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-semibold text-lg backdrop-blur-sm">
              Explore Stories
            </button>
          </Link>
        </div>
      </div>

      {/*  Enhanced Illustration */}
    <div className="lg:w-1/3 flex justify-center">
        <div className="relative">
          <div className=" md:w-[500px] md:h-[500px] bg-gradient-to-br from-[#95b8d1]/15 to-[#95b8d1]/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-[#95b8d1]/30 overflow-hidden">
         
            <img 
              src={illus} 
              alt="BlogSpace Illustration" 
              className=" md:w-[500px] md:h-[500px] opacity-90"
            />
          </div>
          
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#95b8d1]/25 backdrop-blur-sm rounded-full animate-pulse border border-[#95b8d1]/40"></div>
          <div className="absolute -bottom-8 -right-8 w-8 h-8 bg-[#95b8d1]/20 backdrop-blur-sm rounded-full animate-pulse delay-75 border border-[#95b8d1]/30"></div>
          <div className="absolute top-1/2 -right-12 w-6 h-6 bg-[#95b8d1]/30 backdrop-blur-sm rounded-full animate-pulse delay-150 border border-[#95b8d1]/50"></div>
          <div className="absolute top-1/4 -left-8 w-4 h-4 bg-[#95b8d1]/35 backdrop-blur-sm rounded-full animate-pulse delay-300 border border-[#95b8d1]/60"></div>
        </div>
      </div>
    </div>
  </div>
</section>

     

      {/* Trending Blogs Section */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Trending Blogs
            </h2>
            <p className="text-xl text-gray-600">
              Discover the most popular stories from our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingBlogs.map((blog, index) => (
                <Link to="/blogs" key={index}>
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 p-4"
              >
         
                <div className="h-56 bg-gray-200 overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
              
                <div className="p-4">
                  {/* Heading - 10% of total card */}
                  <h3 className="text-2xl font-semibold text-black mb-2 line-clamp-2 hover:text-gray-700 transition-colors">
                    {blog.title}
                  </h3>
                  
              
                  <div className="space-y-3">
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-700">
                          {blog.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-gray-700 font-medium">{blog.author}</span>
                    </div>
                    <span className="text-gray-500">{blog.readTime}</span>
                  </div>
                    
                    {/* <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{blog.date}</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {blog.category}
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
             </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Why Choose Our Platform?
            </h2>
            {/* <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to share your stories and connect with readers worldwide
            </p> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
               <Link to="/blogs" key={index}>
              <div
                key={index}
                className="group p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-gray-200"
                // onClick={() => window.location.href = '/blogs'}
                tabIndex={0}
                role="button"
              >
                <div className="mb-4 text-black group-hover:text-gray-600 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-black group-hover:text-gray-600 transition-colors">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            ))}
          </div>
        </div>
      </section>

  
      <footer className=" border-t border-gray-200 py-8 px-4 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
      
            <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-1">
                  {/* <Edit3 className="w-5 h-5 text-white" /> */}
                  <img src={moto} alt="Medium" />
                </div>
                <div className="text-3xl font-bold font-serif text-black pt-2">edium</div>
              </div>
              <p className="text-gray-600 text-center md:text-left max-w-md text-lg">
                A modern platform for sharing stories, ideas, and connecting with readers worldwide.
                 {/* Insights, stories, and ideas for everyone. */}
              </p>
            </div>

       
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex flex-wrap justify-center gap-6">
                <a href="#" className="text-gray-600 hover:text-black transition-colors">About</a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">Contact</a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">Terms</a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">Privacy</a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">Help</a>
              </div>
              
              <div className="flex gap-4">
    
                <a href="https://github.com/mohitsingh4716/medium_blog" className="text-gray-600 hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/mohitsingh4716/" className="text-gray-600 hover:text-black transition-colors" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-400 mt-8 pt-8 text-center">
            <p className="text-gray-600">
              © {new Date().getFullYear()} Medium Blog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Header = () => {
  return (
    <div className="fixed z-50 bg-white border-b border-gray-200 flex justify-between px-8 py-4 h-auto w-full">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-1">
          {/* <Edit3 className="w-5 h-5 text-white" /> */}
          <img src={moto} alt="Medium" />
        </div>
        <div className="text-3xl font-bold font-serif text-black pt-2">edium</div>
      </div>

  
    
      <div className="flex items-center gap-4">   
        <Link to="/signin">
          <button className="text-black border border-gray-300 font-medium focus:outline-none hover:bg-gray-100 focus:ring-4 rounded-full text-sm px-6 py-3">
            Sign In
          </button>
         </Link>
      <Link to="/signup">
        <button className="hidden lg:flex bg-green-700 text-white hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-6 py-3">
          Get Started
        </button>
      </Link>
      </div>
    </div>
  );
};
