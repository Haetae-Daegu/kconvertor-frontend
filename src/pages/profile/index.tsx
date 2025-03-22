import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import Loading from '@/components/Loading';
import { toast } from 'react-hot-toast';
import { FaDiscord, FaInstagram, FaPhone } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { User, UserUpdate } from '@/types/user';
import { useUser } from '@/hooks/useUser';

const ProfilePage = () => {
  const router = useRouter();
  const { user: authUser, loading: authLoading } = useAuth();
  const { getUserProfile, updateUserProfile } = useUser();
  const [userData, setUserData] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UserUpdate>({
    username: '',
    email: '',
    discord_username: '',
    phone_number: '',
    instagram_username: '',
    kakaotalk_id: '',
  });
  
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push('/auth/login');
      return;
    }
    
    if (authUser && !fetchedRef.current) {
      fetchedRef.current = true;
      setUserLoading(true);
      
      getUserProfile()
        .then(data => {
          if (data) {
            setUserData(data);
            setEditData({
              username: data.username,
              email: data.email,
              discord_username: data.discord_username || '',
              phone_number: data.phone_number || '',
              instagram_username: data.instagram_username || '',
              kakaotalk_id: data.kakaotalk_id || '',
            });
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          toast.error('Failed to load profile data');
        })
        .finally(() => {
          setUserLoading(false);
        });
    }
  }, [authUser, authLoading, router, getUserProfile]);
    

  const formatDate = (dateString: string | number | Date) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      setUserLoading(true);
      const updatedData = await updateUserProfile(editData, Number(authUser?.id));
      
      if (updatedData) {
        setUserData(updatedData);
        setIsEditing(false);
        router.reload();
        toast.success('Contact information updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update contact information');
    } finally {
      setUserLoading(false);
    }
  };

  if (authLoading || userLoading) {
    return <Loading />;
  }

  if (!userData) {
    toast.error('Failed to load profile data');
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 text-white">
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
          
          <div className="p-8">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{userData.username}</h1>
                <p className="text-gray-500 dark:text-gray-400">{userData.email}</p>
              </div>
              
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                {isEditing ? 'Cancel' : 'Edit Contact Info'}
              </button>
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
              
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h2>
                {isEditing ? (
                  <div className="space-y-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <div>
                      <label className="flex items-center mb-2">
                        <FaDiscord className="mr-2 text-indigo-600" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Discord Username:</span>
                      </label>
                      <input
                        type="text"
                        name="discord_username"
                        value={editData.discord_username}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Discord Username"
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center mb-2">
                        <FaPhone className="mr-2 text-green-600" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number:</span>
                      </label>
                      <input
                        type="text"
                        name="phone_number"
                        value={editData.phone_number}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Phone Number"
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center mb-2">
                        <FaInstagram className="mr-2 text-pink-600" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Instagram Username:</span>
                      </label>
                      <input
                        type="text"
                        name="instagram_username"
                        value={editData.instagram_username}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Instagram Username"
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center mb-2">
                        <RiKakaoTalkFill className="mr-2 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">KakaoTalk ID:</span>
                      </label>
                      <input
                        type="text"
                        name="kakaotalk_id"
                        value={editData.kakaotalk_id}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="KakaoTalk ID"
                      />
                    </div>
                    
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => saveChanges()}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 w-32">
                        <FaDiscord className="mr-2 text-indigo-600" />
                        Discord:
                      </span>
                      <span className="text-gray-900 dark:text-white">{userData.discord_username || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 w-32">
                        <FaPhone className="mr-2 text-green-600" />
                        Phone:
                      </span>
                      <span className="text-gray-900 dark:text-white">{userData.phone_number || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 w-32">
                        <FaInstagram className="mr-2 text-pink-600" />
                        Instagram:
                      </span>
                      <span className="text-gray-900 dark:text-white">{userData.instagram_username || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 w-32">
                        <RiKakaoTalkFill className="mr-2 text-yellow-500" />
                        KakaoTalk:
                      </span>
                      <span className="text-gray-900 dark:text-white">{userData.kakaotalk_id || 'Not provided'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;