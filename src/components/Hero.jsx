import React from "react";
import { Link } from "react-router-dom";

const Hero = ({ onLearnMore }) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Code<span className="text-white">Pioneers</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
        </div>

        <h2
          className="text-2xl md:text-4xl font-light mb-6 opacity-90 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Where Innovation Meets Excellence
        </h2>

        <p
          className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-80 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Join a team of passionate developers, designers, and innovators
          building the future of technology. Shape tomorrow's digital landscape
          with cutting-edge solutions.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <Link
            to="/jobs"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
          >
            View Open Positions
          </Link>
          <button
            className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
            onClick={onLearnMore}
          >
            Learn About Us
          </button>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">150+</div>
            <div className="text-sm opacity-70">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">500+</div>
            <div className="text-sm opacity-70">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
            <div className="text-sm opacity-70">Global Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">8+</div>
            <div className="text-sm opacity-70">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
