// src/components/ScrollToTopButton.tsx
import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

interface Props {
  onClick: () => void;
}

const ScrollToTopButton: React.FC<Props> = ({ onClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    // initialize
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <button
          onClick={onClick}
          aria-label="Scroll to top"
          className={`
        fixed bottom-4 right-4
        bg-white hover:bg-gray-100
        p-3 rounded-full shadow-lg
        focus:outline-none
        transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      >
        <IoIosArrowUp className="h-6 w-6 text-[var(--color-primary)]" />
      </button>
  );
};

export default ScrollToTopButton;
