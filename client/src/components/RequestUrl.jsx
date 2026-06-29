import { useState } from "react";

function RequestUrl({ url, setUrl }) {
  return (
    <input
      type="text"
      placeholder="https://api.example.com/users"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none"
    />
  );
}

export default RequestUrl;