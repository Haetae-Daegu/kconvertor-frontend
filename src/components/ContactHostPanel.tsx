import { FaDiscord, FaInstagram, FaPhone } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { User } from '@/types/user';
import { Accommodation } from '@/types/accommodation';

interface ContactHostPanelProps {
  hostInfo: User | null;
  accommodation: Accommodation;
  euroPrice?: number | null;
  euroDeposit?: number | null;
}

const ContactHostPanel: React.FC<ContactHostPanelProps> = ({ 
  hostInfo, 
  accommodation, 
  euroPrice, 
  euroDeposit 
}) => {

  if (!hostInfo) {
    return <div className="p-4 bg-gray-100 rounded-lg">Host information not available</div>;
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-grid-gray-300 opacity-50"></div>
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative">
        <div className="absolute top-2 left-2 w-full h-full bg-yellow-400 rounded-lg border border-black"></div>
        <div className="relative p-6 bg-white shadow-lg rounded-lg border border-black">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Summary</h3>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center">
              <span className="flex items-center text-sm font-medium text-gray-500 w-32">
                Name:
              </span>
              <span className="text-gray-900">{hostInfo.username || 'Not provided'}</span>
            </div>
            <div className="flex items-center">
              <span className="flex items-center text-sm font-medium text-gray-500 w-32">
                Address:
              </span>
              <span className="text-gray-900">{accommodation.location || 'Not provided'}</span>
            </div>
            <div className="flex items-center">
              <span className="flex items-center text-sm font-medium text-gray-500 w-32">
                Monthly Price:
              </span>
              {accommodation.price_per_month ? (
                euroPrice ? (
                  <span className="text-gray-900">
                    ₩{accommodation.price_per_month.toLocaleString()} ({euroPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })} €)
                  </span>
                ) : (
                  <span className="text-gray-900">
                    ₩{accommodation.price_per_month.toLocaleString()}
                  </span>
                )
              ) : (
                <span className="text-gray-900">Not provided</span>
              )}
            </div>
            <div className="flex items-center">
              <span className="flex items-center text-sm font-medium text-gray-500 w-32">
                Deposit Fee:
              </span>
              {accommodation.security_deposit ? (
                euroDeposit ? (
                  <span className="text-gray-900">
                    ₩{accommodation.security_deposit.toLocaleString()} ({euroDeposit.toLocaleString(undefined, { maximumFractionDigits: 2 })} €)
                  </span>
                ) : (
                  <span className="text-gray-900">
                    ₩{accommodation.security_deposit.toLocaleString()}
                  </span>
                )
              ) : (
                <span className="text-gray-900">Not provided</span>
              )}
            </div>
            <h1 className="text-lg font-semibold">Contact Host</h1>
            <div className="flex items-center">
              <span className="flex items-center text-sm font-medium text-gray-500 w-32">
                <FaDiscord className="mr-2 text-indigo-600" />
                Discord:
              </span>
              <span className="text-gray-900">{hostInfo.discord_username || 'Not provided'}</span>
            </div>
            <div className="flex items-center">
              <span className="flex items-center text-sm font-medium text-gray-500 w-32">
                <FaPhone className="mr-2 text-green-600" />
                Phone:
              </span>
              <span className="text-gray-900">{hostInfo.phone_number || 'Not provided'}</span>
            </div>
            <div className="flex items-center">
              <span className="flex items-center text-sm font-medium text-gray-500 w-32">
                <FaInstagram className="mr-2 text-pink-600" />
                Instagram:
              </span>
              <span className="text-gray-900">{hostInfo.instagram_username || 'Not provided'}</span>
            </div>
            <div className="flex items-center">
              <span className="flex items-center text-sm font-medium text-gray-500 w-32">
                <RiKakaoTalkFill className="mr-2 text-yellow-500" />
                KakaoTalk:
              </span>
              <span className="text-gray-900">{hostInfo.kakaotalk_id || 'Not provided'}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactHostPanel; 