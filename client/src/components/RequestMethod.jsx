
function RequestMethod({ method, setMethod }) {
  function getMethodColor(method) {
  switch (method) {
    case "GET":
      return "text-green-400";

    case "POST":
      return "text-blue-400";

    case "PUT":
      return "text-orange-400";

    case "PATCH":
      return "text-purple-400";

    case "DELETE":
      return "text-red-400";

    default:
      return "text-white";
  }
}
  return (
    <select
      value={method}
      onChange={(e) => setMethod(e.target.value)}
      className={`bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 font-semibold cursor-pointer outline-none transition-all duration-200 hover:border-slate-500 focus:border-green-500 ${getMethodColor(method)}`}
    >
      <option>GET</option>
      <option>POST</option>
      <option>PUT</option>
      <option>PATCH</option>
      <option>DELETE</option>
    </select>
  );
}

export default RequestMethod;