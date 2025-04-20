function Task({ name, date, onDelete }) {
  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between mt-5 max-w-xl mx-auto gap-3 border-2 border-gray-900 rounded-md p-3"
      role="listitem"
      aria-label={`Task ${name} due on ${date}`}
    >
      <div className="w-full sm:w-64 text-lg sm:text-xl border-b sm:border-b-0 sm:border-r-2 border-amber-500 p-1 text-center sm:text-left">
        {name}
      </div>
      <div className="w-full sm:w-44 text-lg text-center border-b sm:border-b-0 sm:border-r-2 border-amber-500 p-1">
        {date}
      </div>
      <button
        onClick={onDelete}
        className="bg-red-600 text-white hover:bg-red-500 h-10 w-full sm:w-24 rounded-md"
        aria-label={`Delete task ${name}`}
      >
        Delete
      </button>
    </div>
  );
}

export default Task;
