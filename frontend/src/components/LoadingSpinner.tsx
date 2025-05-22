// src/components/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center py-[var(--space-lg)]">
        <div
            className={`
        w-10 h-10
        border-4 border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]
        border-l-[var(--color-primary)] dark:border-l-[var(--color-primary-dark)]
        rounded-full
        animate-spin
      `}
        />
    </div>
);

export default LoadingSpinner;
