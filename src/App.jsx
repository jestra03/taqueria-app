// App.jsx
import { useState } from 'react'
import AddTaskForm from './components/AddTaskForm'
import TodoItem from './components/TodoItem'

function App() {
    const [tasks, setTasks] = useState([
        { id: 1, name: 'Eat' },
        { id: 2, name: 'Sleep' },
        { id: 3, name: 'Repeat' }
    ])

    return (
        <main className="m-4">
            <AddTaskForm />
            <section>
                <h1 className="text-xl font-bold">To do</h1>
                <ul className="space-y-2">
                    {tasks.map(task => (
                        <TodoItem key={task.id} name={task.name} />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default App

