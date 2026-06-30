function RequestBody({ body, setBody }) {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium mb-2">
        Request Body (JSON)
      </label>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder='{
  "title": "ReqForge",
  "body": "Built by Kenaz",
  "userId": 1
}'
        rows={6}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-white font-mono outline-none resize-y"
      />
    </div>
  );
}

export default RequestBody;