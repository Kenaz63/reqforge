import RequestMethod from "../components/RequestMethod";
import RequestUrl from "../components/RequestUrl";
import SendButton from "../components/SendButton";
import { useState } from "react";
function Workspace() {
    const [response, setResponse] = useState(null);
    const [method, setMethod] = useState("GET");
    const [url, setUrl] = useState("");
    async function handleSend() {
  console.log("SEND BUTTON CLICKED");

  const res = await fetch("http://localhost:5000/api/health");

  const data = await res.json();

  setResponse(data);

  console.log(data);
}
    return (

        <main className="min-h-screen bg-slate-900 text-white p-10">

            <h1 className="text-4xl font-bold text-green-400">
                Request Workspace
            </h1>

            <p className="text-slate-400 mt-2">
                Build and send HTTP requests.
            </p>

            <div className="flex gap-4 mt-10">
                <RequestMethod
  method={method}
  setMethod={setMethod}
/>

<RequestUrl
  url={url}
  setUrl={setUrl}
/>

                <SendButton onSend={handleSend} />

            </div>
            {response && (
      <div className="mt-10 bg-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Server Response
        </h2>

        <pre className="text-green-400">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    )}

        </main>

    );

}

export default Workspace;