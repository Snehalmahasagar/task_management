import { useState, useEffect } from "react"

function TaskForm({ addTask, updateTask, editTask }) {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("Pending")
  const [dueDate, setDueDate] = useState("")

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title)
      setDescription(editTask.description)
      setStatus(editTask.status)
      setDueDate(editTask.dueDate)
    }
  }, [editTask])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      alert("Title required")
      return
    }
    if (!description.trim()) {
      alert("description required")
      return
    }
    if (!status.trim()) {
      alert("Status required")
      return
    }
    if (!dueDate.trim()) {
      alert("DueDate required")
      return
    }



    const taskData = {
      id: editTask ? editTask.id : Date.now(),
      title,
      description,
      status,
      dueDate
    }

    if (editTask) updateTask(taskData)
    else addTask(taskData)

    setTitle("")
    setDescription("")
    setStatus("Pending")
    setDueDate("")
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-xl font-semibold mb-4">
        {editTask ? "Edit Task" : "Add Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded hover:opacity-90"
        >
          {editTask ? "Update Task" : "Add Task"}
        </button>

      </form>

    </div>
  )
}

export default TaskForm