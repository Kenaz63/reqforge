import { useState } from "react";

function RequestMethod() {

    const [method, setMethod] = useState("GET");

    return (

        <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
        >

            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>

        </select>

    );
}

export default RequestMethod;