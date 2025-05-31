import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white py-12 min-h-[250px] flex items-center justify-center">
      <div className="w-full max-w-7xl px-6 flex flex-col items-center justify-center text-center">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          CodePioneers
        </h3>
        <p className="text-gray-600 mb-8">
          Building the future, one line of code at a time.
        </p>
        <div className="flex flex-wrap justify-center space-x-8 text-sm text-gray-500 mb-8">
          <a
            href="#"
            className="hover:text-blue-600 transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-blue-600 transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-blue-600 transition-colors duration-300"
          >
            Careers
          </a>
          <a
            href="#"
            className="hover:text-blue-600 transition-colors duration-300"
          >
            Contact
          </a>
        </div>
        <p className="text-gray-400 text-sm">
          © 2024 CodePioneers. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
