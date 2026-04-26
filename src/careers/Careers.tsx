import React, { useEffect, useState } from 'react';

// Reusable Job Card
const JobCard = ({ job }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
      <p className="text-gray-400 text-sm mb-2">{job.location} • {job.type}</p>
      <p className="text-gray-300 mb-4 line-clamp-3">{job.description}</p>

      <a
        href={job.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-black px-4 py-2 rounded-full font-medium hover:scale-105 transition"
      >
        Apply Now
      </a>
    </div>
  );
};

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulated fetch (replace with real API later)
    const fetchJobs = async () => {
      try {
        setLoading(true);

        // TODO: Replace with your real API call
        // const res = await fetch('/api/jobs');
        // const data = await res.json();

        // TEMP: No jobs (fallback scenario)
        const data = [];

        setJobs(data);
      } catch (err) {
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Careers at WebCodeFuels</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join our team and help build innovative digital solutions. We're always looking for passionate developers and creators.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-400">Loading opportunities...</div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-400">{error}</div>
        )}

        {/* Jobs Grid */}
        {!loading && !error && jobs.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        )}

        {/* Fallback - No Jobs */}
        {!loading && !error && jobs.length === 0 && (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-semibold mb-4">No Open Positions Right Now</h2>
            <p className="text-gray-400 mb-6">
              We don’t have any openings at the moment, but we’re always excited to connect with talented people.
            </p>

            <a
              href="mailto:your@email.com"
              className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Send Your Resume
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Careers;