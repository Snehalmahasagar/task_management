function TaskCard({ task, onDelete, onEdit }) {

  if (!task) return null

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border">

      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-lg font-semibold">
            {task.title}
          </h3>

          <p className="text-gray-600 text-sm mt-1">
            {task.description}
          </p>

          <p className="text-sm mt-2">
            Due: {task.dueDate}
          </p>

        </div>

        <span className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-600">
          {task.status}
        </span>

      </div>

      <div className="flex gap-3 mt-4">

        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Delete
        </button>

      </div>

    </div>
  )
}

export default TaskCard