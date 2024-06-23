"use client";

import { useState } from 'react';
import  NavList from './NavList';
import ItemsNav from './MocNav.js';


export default function NavBar(){ 
  const [isOpen, setIsOpen] = useState(false);
    
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 align-middle">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="asd.jpeg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">iPiT</span>
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
          <div className={`md:flex flex-col md:flex-row md:items-center w-full md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <NavList ItemsNav={ItemsNav}/>
          </div>
          <div>
            
          </div>
        </div>
      </nav>
    </>
  );
};
