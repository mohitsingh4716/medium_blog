
import { AuthSignup } from '../components/AuthSignup'
// import { Quota } from '../components/Quote'

export const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#95b8d1]/20 to-[#95b8d1]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <AuthSignup />
      </div>
    </div>
  );
};

