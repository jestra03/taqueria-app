// components/AddTaskForm.tsx
import React, { useState, ChangeEvent, FormEvent, ReactElement } from 'react'

interface AddTaskFormProps {
    onNewTask: (name: string) => void
}

export default function AddTaskForm({ onNewTask }: AddTaskFormProps): ReactElement {
    const [inputValue, setInputValue] = useState<string>('')

    const handleAdd = (): void => {
        const trimmed = inputValue.trim()
        if (!trimmed) return
        onNewTask(trimmed)
        setInputValue('')
    }

    return (
        <form
            className="flex items-center gap-2"
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                handleAdd()
            }}
        >
            <input
                type="text"
                placeholder="New task name"
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.target.value)
                }
                className="border-2 border-gray-300 rounded-lg px-4 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
            />
            <button
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg shadow"
            >
                Add Task
            </button>
        </form>
    )
}

