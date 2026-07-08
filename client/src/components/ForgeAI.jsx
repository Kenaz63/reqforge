import { useState } from "react";

function AIRequestBuilder({ onGenerate }) {
  const [prompt, setPrompt] = useState("");
  const [loading,setLoading]=useState(false);

  async function handleGenerate() {
  if (!prompt.trim()) return;

  setLoading(true);

  try {
    await onGenerate(prompt);
    setPrompt("");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">
      <div className="flex items-center gap-3 mb-5">
  <span className="text-3xl">🤖</span>

  <div>
    <h2 className="text-xl font-bold text-white">
      ForgeAI
    </h2>

    <p className="text-sm text-slate-400">
      AI Request Builder
    </p>
  </div>
</div>

<div className="flex flex-wrap gap-2 mb-4">

  <button
    onClick={() => setPrompt("Get all users from JSONPlaceholder")}
    className="bg-slate-800 hover:bg-slate-700 text-sm px-3 py-2 rounded-lg"
  >
    👥 Get Users
  </button>

  <button
    onClick={() => setPrompt("Create a POST request to add a new user")}
    className="bg-slate-800 hover:bg-slate-700 text-sm px-3 py-2 rounded-lg"
  >
    ➕ Create POST
  </button>

  <button
    onClick={() => setPrompt("Delete user 5")}
    className="bg-slate-800 hover:bg-slate-700 text-sm px-3 py-2 rounded-lg"
  >
    🗑 Delete User
  </button>

  <button
    onClick={() => setPrompt("Get weather for London")}
    className="bg-slate-800 hover:bg-slate-700 text-sm px-3 py-2 rounded-lg"
  >
    🌦 Weather API
  </button>

</div>

      <textarea
        autoFocus
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the API you want in plain English...

        Examples:
        • Get all users from JSONPlaceholder
        • Create a POST request to add a user
        • Delete user 5
        • Get weather for London"
        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 h-32 resize-none outline-none"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? "🧠 Generating Request..."
          : "✨ Generate with ForgeAI"}
      </button>
    </div>
  );
}

export default AIRequestBuilder;