function SendButton({ onSend, loading }) {
  return (
    <button
  onClick={onSend}
  disabled={loading}
  className="bg-green-500 hover:bg-green-400 disabled:bg-gray-500 text-slate-900 font-semibold px-8 py-3 rounded-lg transition"
>
  {loading ? "Sending..." : "Send"}
</button>
  );
}

export default SendButton;