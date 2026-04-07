import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Job<span className="text-[#f93002]">Hunt</span>
          </h1>
          <p className="text-sm mt-2 text-gray-400">
            © 2025 Your Company. All rights reserved.
          </p>
        </div>

        {/* MIDDLE SECTION */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">
            Contact
          </h2>
          <p className="text-sm">Name: Karan Verma</p>
          <p className="text-sm">Email: kv4020057@gmail.com</p>
          <p className="text-sm">Phone: 8869024798</p>
        </div>

        {/* RIGHT SECTION */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">
            Connect With Me
          </h2>
          <div className="flex gap-4 items-center">
            
            <a
              href="https://www.instagram.com/innocentboy.2525/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-pink-500 transition"
            >
              <FaInstagram className="text-xl hover:text-[#E1306C]" />
              <span>Instagram</span>
            </a>

            <a
              href="https://www.linkedin.com/in/karan-verma-680b63290/?skipRedirect=true"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-500 transition"
            >
              <FaLinkedin className="text-xl hover:text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/Karan420057"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <FaGithub className="text-xl hover:text-[#ffffff]" />
              <span>GitHub</span>
            </a>

          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="text-center text-xs text-gray-400 border-t border-gray-700 py-4">
        Built with ❤️ for career growth
      </div>
    </footer>
  );
};

export default Footer;
