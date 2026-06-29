function SendButton({ onSend }) {
  return (
    <button
  onClick={onSend}
  className="bg-green-500 hover:bg-green-400 text-slate-900 font-semibold px-8 py-3 rounded-lg transition"
>
  Send
</button>
  );
}

export default SendButton;