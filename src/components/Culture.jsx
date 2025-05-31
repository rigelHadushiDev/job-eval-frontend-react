import React from "react";

const Culture = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Culture Section */}
        <div className="bg-white rounded-3xl p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Culture
                </span>
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe in fostering an environment where creativity thrives,
                collaboration flourishes, and every team member has the
                opportunity to grow, learn, and make a meaningful impact.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    Remote First
                  </div>
                  <p className="text-gray-600 text-sm">
                    Work from anywhere in the world
                  </p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    Growth Focus
                  </div>
                  <p className="text-gray-600 text-sm">
                    Continuous learning opportunities
                  </p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    Work-Life Balance
                  </div>
                  <p className="text-gray-600 text-sm">
                    Flexible schedules and unlimited PTO
                  </p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    Innovation
                  </div>
                  <p className="text-gray-600 text-sm">
                    20% time for personal projects
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Culture;
