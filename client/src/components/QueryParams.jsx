function QueryParams({
  queryParams,
  setQueryParams,
}) 
{
    function addParameter() {
  setQueryParams([
    ...queryParams,
    {
      key: "",
      value: "",
    },
  ]);
}
function handleChange(index, field, value) {
  const updatedParams = queryParams.map((param, i) => {
    if (i === index) {
      return {
        ...param,
        [field]: value,
      };
    }

    return param;
  });

  setQueryParams(updatedParams);
}
function removeParameter(index) {
  const updatedParams = queryParams.filter(
    (_, i) => i !== index
  );

  setQueryParams(updatedParams);
}
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">
      <h2 className="text-xl font-semibold mb-5">
        Query Parameters
      </h2>

      {queryParams.map((param, index) => (
  <div
    key={index}
    className="flex gap-3 mb-4"
  >
    <input
  type="text"
  placeholder="Key"
  value={param.key}
  onChange={(e) =>
    handleChange(index, "key", e.target.value)
  }
  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none"
/>

    <input
  type="text"
  placeholder="Value"
  value={param.value}
  onChange={(e) =>
    handleChange(index, "value", e.target.value)
  }
  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none"
/>

<button
  onClick={() => removeParameter(index)}
  className="bg-red-600 hover:bg-red-700 px-4 rounded-lg"
>
  ✕
</button>

  </div>
))}
<button
  onClick={addParameter}
  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold"
>
  + Add Parameter
</button>
    </div>
  );
}

export default QueryParams;