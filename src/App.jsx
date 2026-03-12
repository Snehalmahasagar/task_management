import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-orange-400 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Task Management Dashboard
        </h1>

        <Dashboard />

      </div>

    </div>
  )
}

export default App