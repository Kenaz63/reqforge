function RequestHeaders({
  headers,
  setHeaders,
}) {
  function handleChange(index, field, value) {
  const updatedHeaders = headers.map((header, i) => {
    if (i === index) {
      return {
        ...header,
        [field]: value,
      };
    }

    return header;
  });

  setHeaders(updatedHeaders);
}
  function addHeader() {
  setHeaders([
    ...headers,
    {
      key: "",
      value: "",
    },
  ]);
}
  function removeHeader(index) {
  setHeaders(
    headers.filter((_, i) => i !== index)
  );
}
  return (
    <div>

      <div className="flex justify-between items-center mb-5">

        <h3 className="text-lg font-semibold">
          Headers
        </h3>

        <button
          onClick={addHeader}
          className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-lg"
        >
          + Add Header
        </button>

      </div>

      <div className="space-y-3">

        {headers.map((header, index) => (
  <div
    key={index}
    className="flex gap-3"
  >
    <input
      placeholder="Header Key"
      value={header.key}
      onChange={(e) =>
        handleChange(index, "key", e.target.value)
      }
      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none"
    />

    <input
      placeholder="Header Value"
      value={header.value}
      onChange={(e) =>
        handleChange(index, "value", e.target.value)
      }
      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-3 outline-none"
    />

    <button
      onClick={() => removeHeader(index)}
      className="bg-red-600 hover:bg-red-500 px-4 rounded-lg"
    >
      🗑
    </button>
  </div>
))}
      </div>

    </div>
  );
}

export default RequestHeaders;