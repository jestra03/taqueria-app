// src/components/Modal.tsx
import React, { ReactElement, useRef, MouseEvent } from 'react';

interface ModalProps {
    headerLabel: string;
    isOpen: boolean;
    onCloseRequested: () => void;
    children: React.ReactNode;
}

export default function Modal({
                                  headerLabel,
                                  isOpen,
                                  onCloseRequested,
                                  children
                              }: ModalProps): ReactElement | null {
    const innerRef = useRef<HTMLDivElement>(null);
    if (!isOpen) return null;

    const handleOverlayClick = (e: MouseEvent<HTMLDivElement>): void => {
        if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
            onCloseRequested();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-gray-700/80 dark:bg-gray-900/80 flex items-center justify-center z-100 transition-colors"
            onMouseDown={handleOverlayClick}
        >
            <div
                ref={innerRef}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-11/12 max-w-md overflow-hidden"
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{headerLabel}</h2>
                    <button
                        onClick={onCloseRequested}
                        aria-label="Close"
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4 text-gray-800 dark:text-gray-200">
                    {children}
                </div>
            </div>
        </div>
    );
}
