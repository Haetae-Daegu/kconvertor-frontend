import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const router = useRouter();
  const { user: authUser, loading } = useAuth();
  const [userData, setUserData] = useState({
    id: '',
    username: '',
    email: '',
    created_at: '',
    updated_at: ''
  });

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/auth/login');
      return;
    }
    
    if (authUser) {
      setUserData({
        id: authUser.id.toString(),
        username: authUser.username,
        email: authUser.email,
        created_at: authUser.created_at,
        updated_at: authUser.updated_at
      });
    }
  }, [authUser, loading, router]);

  const formatDate = (dateString: string | number | Date) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 text-white">
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{userData.username}</h1>
              <p className="text-gray-500 dark:text-gray-400">{userData.email}</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Account Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">User ID:</span>
                    <span className="text-gray-900 dark:text-white">{userData.id}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">Username:</span>
                    <span className="text-gray-900 dark:text-white">{userData.username}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">Email:</span>
                    <span className="text-gray-900 dark:text-white">{userData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">Account Created:</span>
                    <span className="text-gray-900 dark:text-white">{formatDate(userData.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">Last Updated:</span>
                    <span className="text-gray-900 dark:text-white">{formatDate(userData.updated_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;