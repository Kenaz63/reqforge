function CollectionCard({ emoji, title }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex justify-between items-center hover:border-green-400 hover:cursor-pointer transition duration-200">
      <div className="flex items-center gap-3">
        <span className="text-2xl">
          {emoji}
        </span>

        <h3 className="text-lg font-medium text-white">
          {title}
        </h3>
      </div>

      <span className="text-slate-400 text-xl">
        →
      </span>
    </div>
  );
}

export default CollectionCard;