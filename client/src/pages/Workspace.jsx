import RequestMethod from "../components/RequestMethod";
import RequestUrl from "../components/RequestUrl";
import SendButton from "../components/SendButton";
import QueryParams from "../components/QueryParams";
import { useState } from "react";
import RequestBody from "../components/RequestBody";
import RequestHeaders from "../components/RequestHeaders";
import ForgeAI from "../components/ForgeAI";
function Workspace() {
    const [response, setResponse] = useState(null);
    const [method, setMethod] = useState("GET");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [body, setBody] = useState("");
    const [responseTime, setResponseTime] = useState(null);
    const [error, setError] = useState("");
    const [queryParams, setQueryParams] = useState([
  { key: "", value: "" },
]);
    const [headers, setHeaders] = useState([
  {
    key: "",
    value: "",
  },
]);

function buildQueryString() {
  const validParams = queryParams.filter(
    (param) =>
      param.key.trim() !== "" &&
      param.value.trim() !== ""
  );

  if (validParams.length === 0) {
    return "";
  }

  return (
    "?" +
    validParams
      .map(
        (param) =>
          `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`
      )
      .join("&")
  );
}
async function generateWithAI(prompt) {
  try {
    const response = await fetch("http://localhost:5000/api/forge-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error);
    }

    setMethod(data.result.method || "GET");

setUrl(data.result.url || "");

setHeaders(
  data.result.headers?.length
    ? data.result.headers
    : [{ key: "", value: "" }]
);

setQueryParams(
  data.result.queryParams?.length
    ? data.result.queryParams
    : [{ key: "", value: "" }]
);

setBody(
  data.result.body
    ? JSON.stringify(data.result.body, null, 2)
    : ""
);

alert("✅ Request generated successfully!");

  } catch (error) {
    console.error(error);
    setError(
  error.message || "ForgeAI failed to generate the request."
);
  }
}
    async function handleSend() {
      setError("");

if (!url.trim()) {
  setError("Please enter a URL.");
  return;
}
  try {
  new URL(url);
} catch {
  setError("Please enter a valid URL.");
  return;
}
 try {
    setLoading(true);
    setResponse(null);
    const start = performance.now(); 
    const finalUrl = url + buildQueryString();
    const res = await fetch("http://localhost:5000/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method,
        url: finalUrl,
        body: body,
      }),
    });

    const data = await res.json();
    const end = performance.now();

    setResponseTime(Math.round(end - start));
    setResponse(data);
  } catch (error) {
  console.error(error);

  setError(
    "Request failed. Please check your internet connection or the API URL."
  );
} finally {
    setLoading(false);
  }
}

function getStatusColor(status) {
  if (status >= 200 && status < 300)
    return "bg-green-600";

  if (status >= 300 && status < 400)
    return "bg-blue-600";

  if (status >= 400 && status < 500)
    return "bg-yellow-500 text-black";

  return "bg-red-600";
}
async function copyResponse() {
  await navigator.clipboard.writeText(
    JSON.stringify(response.data, null, 2)
  );

  alert("Copied!");
}

function getResponseSize(data) {
  const bytes = new Blob([JSON.stringify(data)]).size;

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  return `${(bytes / 1024).toFixed(2)} KB`;
}

function getStatusText(status) {
  switch (status) {
    case 200:
      return "OK";

    case 201:
      return "Created";

    case 400:
      return "Bad Request";

    case 401:
      return "Unauthorized";

    case 403:
      return "Forbidden";

    case 404:
      return "Not Found";

    case 500:
      return "Server Error";

    default:
      return "";
  }
}

    return (
  <main className="min-h-screen bg-slate-950 text-white px-8 py-10">

    <h1 className="text-4xl font-bold text-green-400">
      Request Workspace
    </h1>

    <p className="text-slate-400 mt-2 mb-8">
      Build and send HTTP requests.
    </p>

    {error && (
  <div className="mt-6 bg-red-600/20 border border-red-500 text-red-300 p-4 rounded-xl">
    {error}
  </div>
)}

    {/* Request Card */}

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">

      <h2 className="text-xl font-semibold mb-5">
        Request
      </h2>

      <div className="flex gap-4 items-center">

        <RequestMethod
          method={method}
          setMethod={setMethod}
        />

        <RequestUrl
          url={url}
          setUrl={setUrl}
        />

        <SendButton
          onSend={handleSend}
          loading={loading}
        />

      </div>

    </div>

    <ForgeAI
    onGenerate={generateWithAI}
/>
    {/* Request Body */}

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg mt-8">

      <h2 className="text-xl font-semibold mb-5">
        Request Body
      </h2>

      <RequestBody
        body={body}
        setBody={setBody}
      />

    </div>
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg mt-8">

  <RequestHeaders
  headers={headers}
  setHeaders={setHeaders}
/>

</div>
<QueryParams
  queryParams={queryParams}
  setQueryParams={setQueryParams}
/>

    {/* Response */}

    {response && (

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg mt-8">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-xl font-semibold">
            Server Response
          </h2>

          <button
            onClick={copyResponse}
            className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition"
          >
            📋 Copy
          </button>

        </div>

        <div className="flex flex-wrap items-center gap-4 mb-5">

  <span
    className={`${getStatusColor(response.status)} px-3 py-1 rounded-md font-semibold`}
  >
    📊 {response.status} {getStatusText(response.status)}
  </span>

  <span className="bg-slate-700 px-3 py-1 rounded-md font-semibold">
    ⏱ {responseTime} ms
  </span>

  <span className="bg-slate-700 px-3 py-1 rounded-md font-semibold">
    📦 {getResponseSize(response.data)}
  </span>

</div>

        <pre className="bg-slate-950 rounded-xl p-5 text-green-400 whitespace-pre-wrap break-words overflow-auto max-h-[450px]">
          {JSON.stringify(response.data, null, 2)}
        </pre>

      </div>

    )}

  </main>
);

}

export default Workspace;