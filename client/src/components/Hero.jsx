import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Hero() {
  const heading = "Build, Test & Debug APIs Faster";
  const navigate = useNavigate();

  function handleGetStarted() {
  navigate("/dashboard");
}
  function handleViewSource() {
  window.open(
    "https://github.com/Kenaz63/reqforge",
    "_blank"
  );
}
  return (
    <main className="flex-1 flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold">
          {heading}
        </h1>

        <p className="mt-6 text-xl text-slate-400">
          AI-powered API client for testing, debugging, and generating API requests in seconds.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={handleGetStarted}
            className="bg-green-500 hover:bg-green-400 text-slate-900 font-semibold px-7 py-3 rounded-xl shadow-lg shadow-green-500/20 hover:scale-105 transition duration-200"
          >
            Get Started
          </button>

          <button
            onClick={handleViewSource}
            className="border border-slate-600 text-slate-200 hover:bg-slate-800 hover:border-slate-400 px-7 py-3 rounded-xl transition duration-200"
          >
            View Source
          </button>
        </div>
      </div>
    </main>
  );
}

export default Hero;