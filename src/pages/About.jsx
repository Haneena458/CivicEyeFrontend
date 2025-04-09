import React from "react";

function About() {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
        <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-3xl mb-12">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-600">
            About CivicEye
          </h1>
          <p className="text-gray-600 text-lg text-center mb-4">
            CivicEye is dedicated to empowering citizens and improving
            communities through technology-driven solutions. Our platform
            provides seamless communication between citizens and local
            authorities, ensuring a safer and more connected society.
          </p>
          <p className="text-gray-600 text-lg text-center mb-8">
            Founded on the principles of transparency and efficiency, we strive
            to enhance public service accessibility and foster civic engagement.
            Join us in making a difference!
          </p>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-5">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-blue-600">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600 mt-4">
                At CivicEye, we believe that informed citizens are empowered
                citizens. Our goal is to foster transparency and collaboration
                between local governments and the communities they serve.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-blue-600">
                Our Vision
              </h3>
              <p className="text-lg text-gray-600 mt-4">
                To be the go-to platform for citizens to engage with their local
                authorities, make informed decisions, and contribute to building
                better communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
