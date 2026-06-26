import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <Navbar title="ReqForge" />
      <Hero />
    </div>
  );
}

export default App;