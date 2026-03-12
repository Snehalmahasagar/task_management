function FilterBar({ filter, setFilter }) {

  const filters = ["All", "Pending", "In Progress", "Completed"]

  return (
    <div className="flex flex-wrap gap-2">

      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-1 rounded text-sm
          ${filter === f
            ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
            : "bg-gray-200"
          }`}
        >
          {f}
        </button>
      ))}

    </div>
  )
}

export default FilterBar