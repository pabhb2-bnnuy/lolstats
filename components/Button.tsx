//hover:animate-tada

export default function Button({ text }: { text: string }) {
  return (
    <button
      className=" border-indigo-500 border-2 rounded-md shadow-xs shadow-indigo-900 bg-indigo-600
     text-white w-30 h-9 hover:bg-blue-800 transition duration-600 hover:border-indigo-300 hover:animate-zoom"
    >
      {text}
    </button>
  );
}
