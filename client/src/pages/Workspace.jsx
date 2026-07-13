import { useState, useEffect } from "react";

import RequestMethod from "../components/RequestMethod";
import RequestUrl from "../components/RequestUrl";
import SendButton from "../components/SendButton";
import RequestBody from "../components/RequestBody";
import RequestHeaders from "../components/RequestHeaders";
import QueryParams from "../components/QueryParams";
import ForgeAI from "../components/ForgeAI";

function Workspace() {
  /* -------------------------- */
  /* State */
  /* -------------------------- */

  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [success, setSuccess] = useState("");
  const [headers, setHeaders] = useState([
    {
      key: "",
      value: "",
    },
  ]);

  const [queryParams, setQueryParams] = useState([
    {
      key: "",
      value: "",
    },
  ]);

  const [body, setBody] = useState("");

  const [response, setResponse] = useState(null);

  const [responseTime, setResponseTime] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [aiExplanation, setAiExplanation] = useState("");

  const [explaining, setExplaining] = useState(false);

  const [location, setLocation] = useState(null);

  /* -------------------------- */
  /* Effects */
  /* -------------------------- */

  useEffect(() => {
    if (method === "GET") {
      setBody("");
    }
  }, [method]);

  /* -------------------------- */
  /* Helpers */
  /* -------------------------- */

  function buildQueryString() {
  const validParams = queryParams.filter((param) => {
    const key = String(param.key ?? "").trim();
    const value = String(param.value ?? "").trim();

    return key !== "" && value !== "";
  });

  if (!validParams.length) {
    return "";
  }

  return (
    "?" +
    validParams
      .map((param) => {
        const key = encodeURIComponent(String(param.key ?? "").trim());
        const value = encodeURIComponent(String(param.value ?? "").trim());

        return `${key}=${value}`;
      })
      .join("&")
  );
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

  function getResponseSize(data) {
    const bytes = new Blob([
      JSON.stringify(data),
    ]).size;

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  async function copyResponse() {
    setError("");
    const content =
      response.data ??
      response.error ??
      response;

    await navigator.clipboard.writeText(
      JSON.stringify(content, null, 2)
    );

    setSuccess("📋 Response copied to clipboard.");
  }
    /* -------------------------- */
  /* ForgeAI Request Generator */
  /* -------------------------- */

  async function generateWithAI(prompt) {
    try {
      setError("");

      const res = await fetch("http://localhost:5000/api/forge-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await res.json();
      setLocation(data.result.location || null);
      if (!data.success) {
        throw new Error(
          data.error || data.message || "ForgeAI failed."
        );
      }

      if (data.result?.unsupported) {
        setError(data.result.message);
        return;
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

      setAiExplanation("");
      setLocation(data.result.location || null);
      setSuccess("✅ API request generated successfully.");

      return true;
    } catch (error) {
  console.error(error);

  setError(
    error.message ||
    "ForgeAI couldn't generate a request."
  );

  return false;
}
  }

  /* -------------------------- */
  /* Send Request */
  /* -------------------------- */

  async function handleSend() {
    setError("");
    setSuccess("");
    setAiExplanation("");
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

      const res = await fetch(
        "http://localhost:5000/api/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method,
            url: finalUrl,
            headers,
            body,
          }),
        }
      );

      const data = await res.json();

      const end = performance.now();

      setResponse(data);
      window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
      setResponseTime(Math.round(end - start));

      setSuccess(
        `✅ ${method} request completed successfully.`
      );
    } catch (error) {
      console.error(error);

      setError(
        "Request failed. Please check the API or your internet connection."
      );
    } finally {
      setLoading(false);
    }
  }

  /* -------------------------- */
  /* Explain Response */
  /* -------------------------- */

  async function handleExplainResponse() {
    if (!response) return;

    try {
      setExplaining(true);

      const finalUrl = url + buildQueryString();

      const res = await fetch(
        "http://localhost:5000/api/explain-response",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            request: {
              method,
              url: finalUrl,
              headers,
              body,
            },
            response,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setAiExplanation(data.explanation);
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "ForgeAI couldn't explain the response."
      );
    } finally {
      setExplaining(false);
    }
  }
    return (
    <main className="min-h-screen bg-slate-950 text-white px-8 py-10">

      <h1 className="text-4xl font-bold text-green-400">
        Request Workspace
      </h1>

      <p className="text-slate-400 mt-2 mb-8">
        Build, test and understand APIs using AI-powered assistance.
      </p>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500 bg-red-600/20 p-4 text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-xl border border-green-600 bg-green-600/20 p-4 text-green-300">
          {success}
        </div>
      )}

      {/* Request Builder */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">

        <div className="mb-5">
          <h2 className="text-xl font-semibold">
            Request Builder
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Configure your API request.
          </p>
        </div>

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

      {/* ForgeAI */}

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
          method={method}
        />

      </div>

      {/* Headers */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg mt-8">

        <RequestHeaders
          headers={headers}
          setHeaders={setHeaders}
        />

      </div>

      {/* Query Params */}

      <QueryParams
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />

      {/* Response */}
      {location && (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mt-6">
    📍 {location.city}, {location.state}, {location.country}
  </div>
)}
      {!response && (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-8 text-center">
    <div className="text-5xl mb-4">📡</div>

    <h2 className="text-2xl font-semibold text-white">
      No Response Yet
    </h2>

    <p className="text-slate-400 mt-2 max-w-md mx-auto">
      Start by generating an API request with ForgeAI or build one manually. Once you send it, the response and AI analysis will appear here.
    </p>
  </div>
)}

      {response && (

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg mt-8">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-xl font-semibold">
              Server Response
            </h2>

            <div className="flex gap-3">

              <button
                onClick={copyResponse}
                className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition"
              >
                📋 Copy Response
              </button>

              {aiExplanation && (
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(aiExplanation)
                  }
                  className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition"
                >
                  🤖 Copy Analysis
                </button>
              )}

            </div>

          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">

            <span
              className={`${getStatusColor(response.status)} px-3 py-1 rounded-md font-semibold`}
            >
              📊 {response.status} {getStatusText(response.status)}
            </span>

            <span className="bg-slate-700 px-3 py-1 rounded-md font-semibold">
              🌐 {response.source}
            </span>

            <span className="bg-slate-700 px-3 py-1 rounded-md font-semibold">
              ⏱ {responseTime} ms
            </span>

            <span className="bg-slate-700 px-3 py-1 rounded-md font-semibold">
              📦 {getResponseSize(response.data ?? response.error)}
            </span>

          </div>

          <button
            onClick={handleExplainResponse}
            disabled={explaining}
            className="mb-6 rounded-lg bg-green-600 px-5 py-2 font-semibold hover:bg-green-500 disabled:opacity-50"
          >
            {explaining
              ? "🤖 Analyzing Response..."
              : "🤖 Explain Response"}
          </button>

          <pre className="bg-slate-950 rounded-xl p-5 text-green-400 whitespace-pre-wrap break-words overflow-auto max-h-[450px]">
            {JSON.stringify(
              response.data ??
                response.error ??
                response,
              null,
              2
            )}
          </pre>

          {aiExplanation && (

            <div className="mt-8 rounded-2xl border border-green-600 bg-slate-950 p-6">

             <h3 className="text-2xl font-bold text-green-400 mb-2">
              🤖 ForgeAI Analysis
            </h3>

            <p className="text-sm text-slate-400 mb-6">
              AI-generated explanation of the API response.
            </p>

              <div className="whitespace-pre-wrap text-slate-200 leading-8 text-[16px]">
                {aiExplanation}
              </div>

            </div>

          )}

        </div>

      )}

    </main>
  );
}

export default Workspace;