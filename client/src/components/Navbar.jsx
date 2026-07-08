function Navbar({ title }) {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <h1 className="text-2xl font-bold text-green-400 text-4xl font-black tracking-tight">
        {title}
      </h1>
    </header>
  );
}

export default Navbar;