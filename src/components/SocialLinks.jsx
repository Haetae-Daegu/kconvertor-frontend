import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaYoutube, FaChevronUp, FaChevronDown } from "react-icons/fa";

const SocialLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/nicolasyapobi/", icon: <FaLinkedin className="text-blue-700 text-3xl" /> },
    { name: "GitHub", url: "https://github.com/NicolasYapobi", icon: <FaGithub className="text-gray-800 text-3xl" /> },
    { name: "YouTube", url: "https://www.youtube.com/@franckorea2933", icon: <FaYoutube className="text-red-600 text-3xl" /> },
  ];

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-center">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
      >
        {isOpen ? <FaChevronDown size={20} /> : <FaChevronUp size={20} />}
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8, y: isOpen ? 0 : 10 }}
        transition={{ duration: 0.3 }}
        className={`bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4 mt-3 ${isOpen ? "block" : "hidden"}`}
      >
        {links.map((link) => (
          <a 
            key={link.name}
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:opacity-75 flex items-center gap-2"
          >
            {link.icon}
          </a>
        ))}
      </motion.div>
    </div>
  );
};

export default SocialLinks;
