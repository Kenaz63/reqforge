import RequestMethod from "../components/RequestMethod";
import RequestUrl from "../components/RequestUrl";
import SendButton from "../components/SendButton";
import { useState } from "react";
import RequestBody from "../components/RequestBody";
function Workspace() {
    const [response, setResponse] = useState(null);
    const [method, setMethod] = useState("GET");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [body, setBody] = useState("");
    const [responseTime, setResponseTime] = useState(null);
    async function handleSend() {
  try {
    setLoading(true);
    setResponse(null);
    const start = performance.now(); 
    const res = await fetch("http://localhost:5000/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method,
        url,
        body: body,
      }),
    });

    const data = await res.json();
    const end = performance.now();

    setResponseTime(Math.round(end - start));
    setResponse(data);
  } catch (error) {
    console.error(error);
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
    return (

        <main className="min-h-screen bg-slate-900 text-white p-10">

            <h1 className="text-4xl font-bold text-green-400">
                Request Workspace
            </h1>

            <p className="text-slate-400 mt-2">
                Build and send HTTP requests.
            </p>

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

            <div className="mt-8">
                <RequestBody
                  body={body}
                  setBody={setBody}
                />
            </div>

            <hr className="my-10 border-slate-700" />

            <div>
                {/* Server Response */}
            </div>

            {response && (
      <div className="mt-10 bg-slate-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
              Server Response
          </h2>

          <button
            onClick={copyResponse}
            className="bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg"
          >
            📋 Copy
          </button>
        </div>
      <div className="flex items-center gap-4 mb-4">
  <span
    className={`${getStatusColor(response.status)} px-3 py-1 rounded-md font-semibold`}
  >
    Status: {response.status}
  </span>

  <span className="bg-slate-700 px-3 py-1 rounded-md font-semibold">
    ⏱ {responseTime} ms
  </span>
</div>

<pre className="bg-slate-900 rounded-lg p-4 text-green-400 whitespace-pre-wrap break-words overflow-auto max-h-[500px]">
  {JSON.stringify(response.data, null, 2)}
</pre>
      </div>
    )}

        </main>

    );

}

export default Workspace;