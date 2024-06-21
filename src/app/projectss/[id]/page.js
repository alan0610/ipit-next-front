"use client";
import { useState, useEffect } from "react";

export default function PageDetails({ params }) {
  const { id } = params;
  const [project, setProject] = useState(null);
  const [invested, setInvested] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/users/projects")
      .then((response) => response.json())
      .then((data) => {
        setProject(data.find((project) => project["_id"] === id));
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleInvest = () => {
    setInvested(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {
        project === null
          ? (
            <h1 className="text-2xl font-bold text-center">Cargando...</h1>
          )
          : (
            <>
              {
                invested
                ? (
                  <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 p-6">
                    <h1 className="text-2xl font-bold text-center">¡Usted ha invertido ${project.precio} en {project.nombreProyecto}!</h1>
                  </div>
                )
                : (
                  <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 p-6">
                    <h1 className="text-2xl font-bold text-center">ATENCIÓN! USTED VA A INVERTIR EN ESTE PROYECTO</h1>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{project["nombreProyecto"]}</h2>
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Descripción:</span> {project["descripcion"]}</p>
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Contacto:</span> {project["contacto"]}</p>
                    <p className="text-gray-600 mb-2"><span className="font-semibold">Precio Necesario:</span> ${project["precioNecesario"]}</p>
                    <p className="text-gray-600 mb-4"><span className="font-semibold">Precio por acción:</span> ${project["precio"]}</p>
                    <div className="text-center">
                      <button onClick={handleInvest} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                        Invertir
                      </button>
                    </div>
                  </div>
                )
              }
            </>
          )
      }
    </div>
  );
}
