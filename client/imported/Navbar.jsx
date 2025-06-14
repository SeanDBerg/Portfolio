// Navbar.jsx - Enhanced existing nav with scroll-based styling
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import useScrollPosition from '../hooks/useScrollPosition';
import '../styles/navbar.css';

export default function Navbar() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 20;
  return (
    <nav className={`navbar fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-md bg-white/80 backdrop-blur' : ''}`}>
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {/* Placeholder toggle retained as visual UI (optional) */}
        <li>
        </li>
      </ul>
    </nav>
  );
}
