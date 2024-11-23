import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { BlogContent } from './pages/BlogContent'
import { LandingPage } from './pages/LandingPage'
import { Publish } from './pages/Publish'
import { UserPost } from './pages/UserBlogs'
import { Toaster } from 'sonner'
import {Dashboard} from './pages/Dashboard'
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute'


function App() {

  return (
    <>
      <BrowserRouter>
      <Toaster richColors  />
        <Routes>
        <Route path="/" element={<PublicRoute><LandingPage/></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/signin" element={<PublicRoute><Signin /></PublicRoute>} />
          <Route path="/blog/:id" element={<BlogContent />} />

          <Route path="/blogs" element={ <ProtectedRoute><Blog /></ProtectedRoute>} />
          <Route path="/publish" element={<ProtectedRoute><Publish /></ProtectedRoute>} />
          <Route path='/userblogs' element={<ProtectedRoute><UserPost/></ProtectedRoute>}/>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App