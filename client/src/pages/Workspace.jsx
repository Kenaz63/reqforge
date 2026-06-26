import RequestMethod from "../components/RequestMethod";
import RequestUrl from "../components/RequestUrl";
import SendButton from "../components/SendButton";

function Workspace() {

    return (

        <main className="min-h-screen bg-slate-900 text-white p-10">

            <h1 className="text-4xl font-bold text-green-400">
                Request Workspace
            </h1>

            <p className="text-slate-400 mt-2">
                Build and send HTTP requests.
            </p>

            <div className="flex gap-4 mt-10">

                <RequestMethod />

                <RequestUrl />

                <SendButton />

            </div>

        </main>

    );

}

export default Workspace;