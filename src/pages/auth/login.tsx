import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Rediriger si déjà connecté
  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading('Connexion en cours...');
    try {
      
      await login(email, password);
      
      toast.dismiss(loadingToast);
      toast.success('Connexion réussie!');
      router.push('/');
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err.message || 'Une erreur inattendue est survenue');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute inset-0 bg-grid-gray-300 opacity-50"></div>
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative w-96">
        <div className="absolute top-2 left-2 w-full h-full bg-yellow-400 rounded-lg border border-black"></div>
        <div className="relative p-6 bg-white shadow-lg rounded-lg border border-black">
          <h2 className="text-xl font-bold text-center mb-2">Log in KConvertor</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="pippo@gmail.com"
                required
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Connection..." : "Log In"}
            </button>
          </form>

          <div className="mt-4">
            <Link href="/">
              <button
                className="w-full bg-yellow-500 border border-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                disabled={isLoading}
              >
                Visitor
              </button>
            </Link>
          </div>

          <p>No account ?
            <Link href="/auth/register">
              <span className="underline hover:underline"> Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;