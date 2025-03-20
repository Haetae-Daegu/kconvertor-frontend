import { useAuth } from '@/contexts/AuthContext';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const router = useRouter();
  const { user: authUser, loading } = useAuth();
  const { user, updateUserProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    created_at: '',
    updated_at: ''
  });

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/auth/login');
      return;
    }
    
    if (user) {
      console.log(user);
      setUserData({
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
      });
    }
  }, [user, authUser, loading, router]);

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile({
        username: userData.name,
        email: userData.email
      });
      
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile');
    }
  };

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
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{userData.name}</h1>
                <p className="text-gray-500 dark:text-gray-400">{userData.email}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Account Information</h2>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">User ID:</span>
                      <span className="text-gray-900 dark:text-white">{userData.id}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-32">Username:</span>
                      <span className="text-gray-900 dark:text-white">{userData.name}</span>
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
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Security</h2>
                <div className="space-y-3">
                  <button 
                    className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-left"
                    onClick={() => router.push('/auth/change-password')}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
            
            {isEditing && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;