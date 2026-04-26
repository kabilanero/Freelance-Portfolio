import React from 'react';

const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        {/* Premium Header */}
<div className="text-center mb-16 relative">
  
  {/* Glow Background */}
  <div className="absolute inset-0 flex justify-center">
    <div className="w-72 h-72 bg-purple-600 opacity-20 blur-3xl rounded-full"></div>
  </div>

  {/* Main Title */}
  <h1 className="
    relative z-10
    text-4xl md:text-6xl font-extrabold tracking-tight
    bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400
    bg-clip-text text-transparent
  ">
    WebCodeFuels
  </h1>

  {/* Subtitle */}
  <p className="
    mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto
  ">
    Building powerful digital experiences that scale with your vision
  </p>

  {/* Divider */}
  <div className="mt-6 flex justify-center">
    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-white-500 rounded-full"></div>
  </div>

</div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Fueling digital innovation with cutting-edge web, app, and cloud solutions. 
          We turn ideas into powerful, scalable products.
        </p>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              WebCodeFuels is a modern technology company focused on building high-performance 
              digital experiences. We specialize in web development, mobile applications, 
              cloud solutions, and SEO optimization.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              Our mission is to empower businesses and startups by delivering innovative, 
              scalable, and efficient digital solutions that drive growth and success.
            </p>
          </div>

          {/* Right Content */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">What We Do</h2>

            <ul className="space-y-4 text-gray-300">
              <li>🚀 Web Development (React, Next.js, Full Stack)</li>
              <li>📱 Mobile App Development</li>
              <li>☁️ Cloud Services (AWS, Deployment, Scaling)</li>
              <li>🔍 SEO Optimization</li>
              <li>⚡ Performance & UI/UX Enhancements</li>
            </ul>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-10">Our Core Values</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-400">We embrace new technologies to deliver modern solutions.</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-400">We focus on clean, scalable, and maintainable code.</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-3">Reliability</h3>
              <p className="text-gray-400">We deliver projects on time with consistent performance.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Let’s Build Something Great</h2>
          <p className="text-gray-400 mb-6">
            Have an idea or project in mind? Let WebCodeFuels bring it to life.
          </p>

          <a
            href="mailto:your@email.com"
            className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
