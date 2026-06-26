function Navbar({ title }) {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <h1 className="text-2xl font-bold text-green-400 text-4xl font-black tracking-tight">
        {title}
      </h1>

      <nav className="flex items-center gap-8">
        <a href="#" className="text-slate-300 hover:text-white">
          Features
        </a>

        <a href="#" className="text-slate-300 hover:text-white">
          Docs
        </a>

        <a href="#" className="text-slate-300 hover:text-white">
          GitHub
        </a>

        <button className="border border-slate-600 px-4 py-2 rounded-lg hover:bg-slate-800 transition duration-200">
          Login
        </button>
      </nav>
    </header>
  );
}

export default Navbar;