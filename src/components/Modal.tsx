import React, { ReactElement, useRef, MouseEvent } from 'react'

interface ModalProps {
    headerLabel: string
    isOpen: boolean
    onCloseRequested: () => void
    children: React.ReactNode
}

export default function Modal({
                                  headerLabel,
                                  isOpen,
                                  onCloseRequested,
                                  children
                              }: ModalProps): ReactElement | null {
    const innerRef = useRef<HTMLDivElement>(null)
    if (!isOpen) return null

    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>): void => {
        if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
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
                    <button
                        onClick={onCloseRequested}
                        aria-label="Close"
                        className="text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </div>
    )
}
