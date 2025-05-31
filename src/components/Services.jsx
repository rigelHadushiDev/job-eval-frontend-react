import React, { forwardRef } from "react";
import services from "../data/servicesData.json";

const Services = forwardRef((props, ref) => {
  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver innovative solutions across the full spectrum of software
            development, helping businesses transform their ideas into powerful
            digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Gradient Border Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>

              <div className="relative z-10">
                <div
                  className={`text-4xl mb-6 w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center text-2xl shadow-lg`}
                >
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                <div
                  className={`mt-6 w-full h-1 bg-gradient-to-r ${service.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Services;
