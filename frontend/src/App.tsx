import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute'

// Centralized dynamic page lazy loading (named components mapped to defaults)
const LandingPage = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })));
const Signup = lazy(() => import('./pages/Signup').then(m => ({ default: m.Signup })));
const Signin = lazy(() => import('./pages/Signin').then(m => ({ default: m.Signin })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogContent = lazy(() => import('./pages/BlogContent').then(m => ({ default: m.BlogContent })));
const Publish = lazy(() => import('./pages/Publish').then(m => ({ default: m.Publish })));
const UserPost = lazy(() => import('./pages/UserBlogs').then(m => ({ default: m.UserPost })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));
const Profile = lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })));

// Centralized, lightweight global fallback loading indicator
const GlobalLoading = () => (
  <div className="flex items-center justify-center min-h-screen bg-zinc-50/50">
    <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster richColors />
        <Suspense fallback={<GlobalLoading />}>
          <Routes>
            <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path="/signin" element={<PublicRoute><Signin /></PublicRoute>} />
            <Route path="/blog/:id" element={<BlogContent />} />

            <Route path="/blogs" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
            <Route path="/publish" element={<ProtectedRoute><Publish /></ProtectedRoute>} />
            <Route path='/userblogs' element={<ProtectedRoute><UserPost /></ProtectedRoute>} />
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path='/profile/:id' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App