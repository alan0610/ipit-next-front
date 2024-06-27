"use client"
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    location.href = '/Login';
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="/Projects" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
            iPiT
          </span>
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`md:flex md:space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
          {isAuthenticated ? (
            <>
              <a
                href="/Users"
                className="block mt-4 md:inline-block md:mt-0 dark:text-white hover:text-gray-800"
              >
                Perfil
              </a>
              <button
                onClick={handleLogout}
                className="block mt-4 md:inline-block md:mt-0 dark:text-white hover:text-gray-800"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <a
                href="/Login"
                className="block mt-4 md:inline-block md:mt-0 dark:text-white hover:text-gray-800"
              >
                Ingresar
              </a>
              <a
                href="/Signup"
                className="block mt-4 md:inline-block md:mt-0 dark:text-white hover:text-gray-800"
              >
                Registrar
              </a>
              <a
                href="/"
                className="block mt-4 md:inline-block md:mt-0 dark:text-white hover:text-gray-800"
              >
                Inicio
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
