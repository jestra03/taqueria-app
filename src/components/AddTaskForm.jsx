// components/AddTaskForm.jsx
import React, { useState } from 'react'

export default function AddTaskForm({ onNewTask }) {
    const [inputValue, setInputValue] = useState('')

    const handleAdd = () => {
        if (!inputValue.trim()) return
        onNewTask(inputValue.trim())
        setInputValue('')
    }

    return (
        <div className="flex items-center gap-2 mb-4">
            <input
                type="text"
                placeholder="New task name"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-3/4"
            />
            <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow"
            >
                Add task
            </button>
        </div>
    )
}
