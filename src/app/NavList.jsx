import { useState, useEffect } from "react";
import MenuItem from "./MenuItem";

export default function NavList({ ItemsNav }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Obtener el token desde localStorage cuando el componente se monte
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);
  

  return (
    <>
      <ul className="gap-4 flex flex-col md:flex-row font-medium p-4 md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 justify-center md:justify-end">
        {ItemsNav.filter(itemNav => {
          if (token) {
            // Si el token está definido, solo renderiza el itemNav con contenido "Salir"
            return itemNav.contenido === "Salir";
          } else {
            // Si el token no está definido, renderiza todos excepto el itemNav con contenido "Salir"
            return itemNav.contenido !== "Salir";
          }
        }).map((itemNav, index) => (
          <MenuItem
            key={index}
            Url={itemNav.url}
            Contenido={itemNav.contenido}
          />
        ))}
      </ul>
    </>
  );
}