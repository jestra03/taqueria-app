// src/components/NavBar.tsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/taqueria-logo.png";
import logoDm from "../assets/taqueria-logo-darkmode.png";

interface NavBarProps {
  onSettingsClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSettingsClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
          isOpen &&
          menuRef.current &&
          !menuRef.current.contains(e.target as Node) &&
          toggleRef.current &&
          !toggleRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isOpen]);

  const handleAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/#about-section");
    } else {
      window.history.replaceState({}, "", "/#about-section");
      document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const linkClass =
      "font-bold text-[var(--color-primary)] dark:text-white hover:text-[var(--color-accent)] transition-colors";

  return (
      <nav
          className="
        fixed top-0 left-0 right-0 z-40
        bg-[var(--color-bg)] dark:bg-gray-800
        pt-4 pb-2
        border-b-2 border-b-[var(--color-primary)]
        dark:border-b-white
        shadow-[0_4px_0_var(--color-accent)]
        transition-all
      "
      >
        {/* Desktop */}
        <div className="hidden sm:flex max-w-7xl mx-auto px-4 lg:px-8 h-16 items-center justify-between">
          <Link to="/">
            <img
                src={logo}
                alt="Taqueria Logo"
                className="
              h-20 w-auto
              transform transition-transform duration-200
              hover:scale-110 active:scale-100
              dark:hidden
            "
            />
            <img
                src={logoDm}
                alt="Taqueria Logo"
                className="
              h-20 w-auto
              transform transition-transform duration-200
              hover:scale-110 active:scale-100
              hidden
              dark:block
            "
            />
          </Link>

          <div className="flex space-x-10">
            <Link to="/" className={linkClass}>Home</Link>
            <a href="#about-section" onClick={handleAbout} className={linkClass}>About</a>
            <Link to="/catering" className={linkClass}>Catering Services</Link>
            <Link to="/menu" className={linkClass}>Menu</Link>
          </div>

          <button onClick={onSettingsClick} className={linkClass}>
            <IoMdSettings size={28} />
          </button>
        </div>

        {/* Mobile */}
        <div className="sm:hidden flex items-center justify-between px-4 h-16">
          <button ref={toggleRef} onClick={() => setIsOpen(o => !o)} className={linkClass}>
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
          <button onClick={onSettingsClick} className={linkClass}>
            <IoMdSettings size={28} />
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
            ref={menuRef}
            className="
          sm:hidden overflow-hidden
          bg-[var(--color-bg)] dark:bg-gray-800
          transition-[max-height] duration-300 ease-in-out
        "
            style={{ maxHeight: isOpen ? "300px" : "0" }}
        >
          <button
              onClick={() => { navigate("/"); setIsOpen(false); }}
              className={`block w-full text-left px-4 py-2 ${linkClass}`}
          >
            Home
          </button>
          <button
              onClick={(e) => { handleAbout(e); }}
              className={`block w-full text-left px-4 py-2 ${linkClass}`}
          >
            About
          </button>
          <button
              onClick={() => { navigate("/catering"); setIsOpen(false); }}
              className={`block w-full text-left px-4 py-2 ${linkClass}`}
          >
            Catering Services
          </button>
          <button
              onClick={() => { navigate("/menu"); setIsOpen(false); }}
              className={`block w-full text-left px-4 py-2 ${linkClass}`}
          >
            Menu
          </button>
        </div>
      </nav>
  );
};

export default NavBar;
