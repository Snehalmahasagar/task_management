import { useState, useEffect } from "react"
import TaskCard from "../components/TaskCard"
import TaskForm from "../components/TaskForm"
import FilterBar from "../components/FilterBar"

function Dashboard() {

  // State to store all tasks
  const [tasks, setTasks] = useState(() => {
  const storedTasks = localStorage.getItem("tasks")
  return storedTasks ? JSON.parse(storedTasks) : []
})

  // State for filter option
  const [filter, setFilter] = useState("All")

  // task currently being editing
  const [editTask, setEditTask] = useState(null)

  // current pagination
  const [currentPage, setCurrentPage] = useState(1)

  // No of tasks
  const tasksPerPage = 5

const [search,setSearch] = useState("")
 
const filteredTasks = tasks
  .filter((task) =>
    filter === "All" ? true : task.status === filter
  )
  .filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  )


  // Save tasks to localStorage whenever tasks change
 useEffect(() => {
  if (tasks.length >= 0) {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
}, [tasks])
useEffect(() => {
  setCurrentPage(1)
}, [search])

  // Add new task
  const addTask = (task) => {
    setTasks([...tasks, task])
  }


  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }


  // Start editing a task
  const startEdit = (task) => {
    setEditTask(task)
  }


  // Update an existing task
  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    )
    setEditTask(null)
  }





  // -----------------------------
  // PAGINATION LOGIC
  // -----------------------------

  const indexOfLastTask = currentPage * tasksPerPage

  const indexOfFirstTask = indexOfLastTask - tasksPerPage

  const currentTasks = filteredTasks.slice(
    indexOfFirstTask,
    indexOfLastTask
  )

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage)


  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filter])


  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">

      {/* Task Form Section */}

      <TaskForm
        addTask={addTask}
        updateTask={updateTask}
        editTask={editTask}
      />


      <div>
<input 
  type="text"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
/>
        {/* Filter Buttons */}

        <FilterBar filter={filter} setFilter={setFilter} />


        {/* Task List */}

        <div className="space-y-4 mt-4">

          {currentTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onEdit={startEdit}
            />
          ))}

        </div>


        {/* Pagination Controls */}

        <div className="flex justify-center gap-2 mt-6">

          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>


          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded 
              ${currentPage === index + 1
                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}


          <button
            onClick={() => setCurrentPage(currentPage + 1)}
           disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  )
}

export default Dashboard