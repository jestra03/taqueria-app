import React, { ReactElement, useState } from 'react'
import { nanoid } from 'nanoid'
import AddTaskForm from './components/AddTaskForm'
import TodoItem    from './components/TodoItem'
import Modal       from './components/Modal'

interface ITask {
    id: string
    name: string
    completed: boolean
}

const INITIAL_TASK_LIST: ITask[] = [
    { id: nanoid(), name: 'Eat',    completed: false },
    { id: nanoid(), name: 'Sleep',  completed: false },
    { id: nanoid(), name: 'Repeat', completed: false }
]

export default function App(): ReactElement {
    const [tasks, setTasks] = useState<ITask[]>(INITIAL_TASK_LIST)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const addTask = (name: string): void =>
        setTasks(prev => [...prev, { id: nanoid(), name, completed: false }])

    const toggleTask = (id: string): void =>
        setTasks(prev =>
            prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
        )

    const deleteTask = (id: string): void =>
        setTasks(prev => prev.filter(t => t.id !== id))

    return (
        <main className="m-4 max-w-lg mx-auto">
            <div className="mb-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow"
                >
                    New Task
                </button>
            </div>

            <Modal
                headerLabel="New Task"
                isOpen={isModalOpen}
                onCloseRequested={() => setIsModalOpen(false)}
            >
                <AddTaskForm
                    onNewTask={(name: string) => {
                        addTask(name)
                        setIsModalOpen(false)
                    }}
                />
            </Modal>

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
