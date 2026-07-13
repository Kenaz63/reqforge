function RequestBody({
  body,
  setBody,
  method,
}) {
  return (
    <div className="mt-6">
   
      <textarea
        value={body}
        disabled={method === "GET"}
        onChange={(e) => setBody(e.target.value)}
        placeholder={
          method === "GET"
            ? "GET requests do not support a request body.\nUse Query Parameters instead."
            : `{
  "title": "ReqForge",
  "body": "Built by Kenaz",
  "userId": 1
      }`
        }
        rows={6}
        className={`w-full border rounded-lg p-4 text-white font-mono outline-none resize-y ${
          method === "GET"
            ? "bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed"
            : "bg-slate-800 border-slate-700"
        }`}
      />
    </div>
  );
}

export default RequestBody;