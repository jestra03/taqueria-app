// App.jsx
import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import AddTaskForm from './components/AddTaskForm'
import TodoItem from './components/TodoItem'
import Modal from './components/Modal'

const INITIAL_TASK_LIST = [
    { id: nanoid(), name: 'Eat', completed: false },
    { id: nanoid(), name: 'Sleep', completed: false },
    { id: nanoid(), name: 'Repeat', completed: false }
]

export default function App() {
    const [tasks, setTasks] = useState(INITIAL_TASK_LIST)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const addTask = (name) => {
        setTasks(prev => [...prev, { id: nanoid(), name, completed: false }])
    }

    const toggleTask = (id) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id))
    }

    return (
        <main className="m-4 max-w-lg mx-auto">
            {/* Open Modal */}
            <div className="mb-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow"
                >
                    New Task
                </button>
            </div>

            {/* Modal */}
            <Modal
                headerLabel="New Task"
                isOpen={isModalOpen}
                onCloseRequested={() => setIsModalOpen(false)}
            >
                <AddTaskForm
                    onNewTask={(name) => {
                        addTask(name)
                        setIsModalOpen(false)
                    }}
                />
            </Modal>

            {/* To-Do List */}
            <section>
                <h1 className="text-xl font-bold mb-3">To do</h1>
                <ul className="space-y-2">
                    {tasks.map(task => (
                        <TodoItem
                            key={task.id}
                            name={task.name}
                            completed={task.completed}
                            onToggle={() => toggleTask(task.id)}
                            onDelete={() => deleteTask(task.id)}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}
