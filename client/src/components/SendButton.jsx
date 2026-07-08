function SendButton({ onSend, loading }) {
  return (
    <button
  onClick={onSend}
  disabled={loading}
  className="bg-green-600 hover:bg-green-500 transition-all duration-200 px-8 py-3 rounded-xl font-semibold"
>
  {loading ? "Sending..." : "Send"}
</button>
  );
}

export default SendButton;