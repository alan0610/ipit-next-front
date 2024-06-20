import MenuItem from "./MenuItem";

export default function NavList({ ItemsNav }){
  return (
    <>
      <ul className="gap-4 flex flex-col md:flex-row font-medium p-4 md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 justify-center md:justify-end">
        {ItemsNav.map((itemNav, index) => {
          return(
            <MenuItem
              key={index} // Agrega la clave aquí
              Url={itemNav.url}
              Contenido={itemNav.contenido}
            />
          );
        })}
      </ul>
    </>
  );
};
