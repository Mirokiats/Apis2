"use client";
import Link from 'next/link';
import { useState } from 'react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">Showcase</Link>
      </div>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/pokemon">Pokémon</Link>
          </li>
          <li>
            <Link href="/videogames">Videojuegos</Link>
          </li>
          <li>
            <Link href="/chargermap">Estaciones de Carga</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
