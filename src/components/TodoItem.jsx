// components/TodoItem.jsx
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function TodoItem({ name, completed, onToggle, onDelete }) {
    return (
        <li className="flex items-center gap-3 py-2">
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={onToggle}
                    className="form-checkbox h-5 w-5 accent-blue-500"
                />
                <span className={`text-base ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {name}
        </span>
            </label>
            <button
                onClick={onDelete}
                title="Delete Task"
                className="text-gray-500 hover:text-gray-700"
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </li>
    )
}
