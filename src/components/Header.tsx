import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext';

    
const Header: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error("Error", error);
      router.push('/');
    }
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
              <Image 
                width={100}
                height={100}
                src="/Haetae.png"
                alt="Logo"
                className="h-10 w-10 mr-2" 
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Haetae</span>
            </a>
            <div className="flex items-center lg:order-2">
              {user ? (
                <button 
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none" 
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <button className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" onClick={() => router.push('/auth/login')}>Log in</button>
                  <button className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800" onClick={() => router.push('/auth/register')}>Sign up</button>
                </>
              )}
            </div>
          </div>
      </nav>
    </header>
  );
};

export default Header; 