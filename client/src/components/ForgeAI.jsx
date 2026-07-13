import { useState } from "react";

function ForgeAI({ onGenerate }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const success = await onGenerate(prompt);

if (success) {
  setPrompt("");
}
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">

      <div className="flex items-center gap-3 mb-4">

        <span className="text-3xl">🤖</span>

        <div>
          <h2 className="text-xl font-bold">
            ForgeAI
          </h2>

          <p className="text-sm text-slate-400">
            Generate API requests instantly using supported demo APIs.
          </p>
        </div>

      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        
        placeholder={`Examples:

        • GitHub user torvalds
        • Weather in Chennai
        • Get all users
        • Delete user 5
        • Atomic Habits
        • Universities in Germany`}
        className="w-full h-36 rounded-xl bg-slate-800 border border-slate-700 p-4 resize-none outline-none focus:border-green-500 transition"
      />

      <div className="flex justify-between items-center mt-4">

        <span className="text-xs text-slate-500">
          Supported APIs: GitHub • Weather • Books • Universities • JSONPlaceholder
        </span>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading
            ? "🧠 Understanding Request..."
            : "✨ Generate API Request"}
        </button>

      </div>

    </div>
  );
}

export default ForgeAI;