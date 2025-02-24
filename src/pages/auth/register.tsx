import ErrorPanel from "@/components/ErrorPanel";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL


const Register = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("")


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError(null)
      const response = await axios.post(`${API_URL}/auth/register`, {username, email, password});
      router.push("login")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const status = err.response.status
          if (status === 500) {
            setError("Internal server error: Please try again later.");
          } else {
            setError(`Error ${err.response.status}: ${err.response.data.message}`);
          }
        } else if (err.request) {
          setError("Service unavailable. Please try again later.")
        } else {
          setError("This account already exist");
        }
      }

    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute inset-0 bg-grid-gray-300 opacity-50"></div>
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative w-96">
        <div className="absolute top-2 left-2 w-full h-full bg-yellow-400 rounded-lg border border-black"></div>
        <div className="relative p-6 bg-white shadow-lg rounded-lg border border-black">
          <h2 className="text-xl font-bold text-center mb-2">Register in KConvertor</h2>
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
                placeholder="pippo@gmail.com"
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
            {error && <ErrorPanel message={error}/>}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;