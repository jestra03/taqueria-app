// src/components/Footer.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";

const Footer: React.FC = () => (
    <footer
        className="
      bg-[var(--color-primary)] dark:bg-gray-800
      text-white dark:text-gray-100
      flex flex-row justify-around items-center
      px-[var(--space-md)]
      py-[var(--space-sm)]
      sm:justify-between
      transition-colors
    "
    >
      {/* Social Icons */}
      <div className="flex space-x-[var(--space-md)]">
        <a
            href="https://www.facebook.com/profile.php?id=61561582092226"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[var(--color-accent)] dark:text-gray-100 dark:hover:text-[var(--color-accent)]"
        >
          <FaFacebook className="h-6 w-6" />
        </a>
        <a
            href="https://www.instagram.com/taqueria.cincodemayo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[var(--color-accent)] dark:text-gray-100 dark:hover:text-[var(--color-accent)]"
        >
          <FaInstagram className="h-6 w-6" />
        </a>
        <a
            href="https://www.google.com/search?q=Taqueria+Cinco+de+Mayo+Los+Osos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[var(--color-accent)] dark:text-gray-100 dark:hover:text-[var(--color-accent)]"
        >
          <FaGoogle className="h-6 w-6" />
        </a>
      </div>

      {/* Credit */}
      <div className="font-medium">
        Built by Joshua Estrada
      </div>

      {/* Terms Link */}
      <div>
        <Link
            to="/terms-of-service"
            className="font-medium text-white hover:text-[var(--color-accent)] dark:text-gray-100 dark:hover:text-[var(--color-accent)]"
        >
          Terms of Service
        </Link>
      </div>
    </footer>
);

export default Footer;
