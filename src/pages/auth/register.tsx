import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL


const Register = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("");


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {username, email, password});
      if (response.data) {
        toast.success("Account created successfully")
        router.push("login")
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const status = err.response.status
          if (status === 500) {
            toast.error("Internal server error: Please try again later.");
          } else {
            toast.error("This account already exist");
          }
        } else if (err.request) {
          toast.error("Service unavailable. Please try again later.")
        }
      }

    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute inset-0 bg-grid-gray-300 opacity-50"></div>
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative flex w-full max-w-5xl mx-auto gap-8 px-4">
        <div className="hidden md:flex md:w-1/2">
          <div className="relative w-full">
            <div className="absolute top-2 left-2 w-full h-[85%] bg-yellow-400 rounded-lg border border-black"></div>
            <div className="relative p-6 bg-white shadow-lg rounded-lg border border-black">
              <h2 className="text-xl font-bold mb-4">Why join our platform?</h2>
              <p className="text-gray-700 mb-4">
                Owning a rental property near Keimyung University? Let us help you reach students in need of housing! List your property on our platform and enjoy a stress-free way to find tenants while maximizing your rental opportunities.
              </p>
              <div className="mt-6">
                <div className="flex items-center mb-3">
                  <div className="mr-3 bg-yellow-400 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Visibility among international students</span>
                </div>
                <div className="flex items-center mb-3">
                  <div className="mr-3 bg-yellow-400 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Simplified rental process</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 bg-yellow-400 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Maximize your rental opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative w-full md:w-1/2">
          <div className="absolute top-2 left-2 w-full h-full bg-yellow-400 rounded-lg border border-black"></div>
          <div className="relative p-6 bg-white shadow-lg rounded-lg border border-black">
            <h2 className="text-xl font-bold text-center mb-2">Register in Haetae</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <p>Or
                <Link href="/auth/login">
                  <span className="underline hover:underline"> use an existing account</span>
                </Link>
              </p>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;