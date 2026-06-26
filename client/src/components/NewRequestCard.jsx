import { useNavigate } from "react-router-dom";

function NewRequestCard() {

  const navigate = useNavigate();

  function handleNewRequest() {
    navigate("/workspace");
  }

  return (
    <div
      onClick={handleNewRequest}
      className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-green-400 hover:bg-slate-800/80 cursor-pointer transition duration-200"
    >
      <h2 className="text-2xl font-semibold text-white">
        + New Request
      </h2>

      <p className="mt-2 text-slate-400">
        Create and send a new HTTP request.
      </p>
    </div>
  );
}

export default NewRequestCard;