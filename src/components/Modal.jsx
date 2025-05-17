// components/Modal.jsx
import React, { useRef } from 'react'

export default function Modal({ headerLabel, isOpen, onCloseRequested, children }) {
    const innerRef = useRef(null)
    if (!isOpen) return null

    const handleOverlayClick = (e) => {
        // close if clicked outside the dialog
        if (innerRef.current && !innerRef.current.contains(e.target)) {
            onCloseRequested()
        }
    }

    return (
        <div
            className="fixed inset-0 bg-gray-700/80 flex items-center justify-center z-50"
            onMouseDown={handleOverlayClick}
        >
            <div
                ref={innerRef}
                className="bg-white rounded-lg shadow-lg border border-gray-300 w-11/12 max-w-md"
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">{headerLabel}</h2>
                    <button onClick={onCloseRequested} aria-label="Close" className="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </div>
    )
}
