// src/components/Notification.tsx
import React, { useState, useEffect } from 'react';

type NotificationProps = {
    message: string;
    success?: boolean;
    timer?: number;
    onComplete?: () => void; // Add callback for when animation completes
};

const Notification: React.FC<NotificationProps> = ({
                                                       message,
                                                       success = true,
                                                       timer = 3000,
                                                       onComplete,
                                                   }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false);
            // After fade-out animation completes, notify parent
            setTimeout(() => {
                onComplete?.();
            }, 300); // Match the transition duration
        }, timer);

        return () => clearTimeout(timeout);
    }, [timer, onComplete]);

    const bgClass = success
        ? 'bg-[var(--color-success)] dark:bg-[var(--color-success-dark)]'
        : 'bg-[var(--color-error)] dark:bg-[var(--color-error-dark)]';

    return (
        <div
            className={`
                fixed bottom-[var(--space-md)] left-[var(--space-md)]
                px-[var(--space-lg)] py-[var(--space-sm)]
                rounded-full
                flex items-center
                z-50
                transition-opacity duration-300 ease-in-out
                ${visible ? 'opacity-100' : 'opacity-0'}
                ${bgClass}
            `}
        >
            <p className="text-black dark:text-white text-base">
                {message}
            </p>
        </div>
    );
};

export default Notification;