"use client";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import ProjectList from "../Projects/ProjectList";
import Link from "next/link";

export default function UserPage() {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      throw new Error("No token found");
    }

    const decodedToken = jwt.decode(storedToken); // Decodifica el token para obtener el payload sin verificarlo
    const userId = decodedToken["_id"];

    setToken(storedToken);
    const urlUsers = `http://localhost:3000/api/users/${userId}`;
    const urlProjects = `http://localhost:3000/api/users/${userId}/projects`;

    fetch(urlUsers, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al realizar la búsqueda");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data); // Asegúrate de que 'data' contiene los datos del usuario esperados
        console.log("User data:", data);
      })
      .catch((error) => {
        console.error("Error al encontrar el usuario:", error);
        setMessage("Error al encontrar el usuario");
      });

    // Para obtener los proyectos de dicho usuario
    fetch(urlProjects, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al realizar la búsqueda");
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data); // Asegúrate de que 'data' contiene los datos del usuario esperados
        console.log("User data:", data);
      })
      .catch((error) => {
        console.error("Error al encontrar el usuario:", error);
        setMessage("Error al encontrar el usuario");
      });
  }, []);

  return (
    <>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.username}
          </h2>
          <p className="text-lg font-medium text-gray-800 mt-3">
            Saldo: ${user.balance}
          </p>
          <hr className="my-4 border-gray-300" />
          <div>
            <p className="text-gray-600 mb-2">
              Lista de Proyectos en los cuales se invirtió:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="py-2 px-4 text-left text-md font-bold text-gray-600">
                      Invirtió en los siguientes proyectos:
                    </th>
                    {/* Puedes agregar más encabezados aquí según sea necesario */}
                  </tr>
                </thead>
                <tbody>
                  {projects &&
                    projects.map((project, index) => (
                      <tr key={index} className="border-b border-gray-300">
                        <td className="py-2 px-4 text-left text-sm font-medium text-gray-800">
                          {project.name}
                        </td>
                        <td className="py-2 px-4 text-left text-sm font-medium text-gray-800">
                          {project.cost_investment}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <Link
          href="/Deposit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:shadow-md transition duration-200"
        >
          Depositar
        </Link>
      </div>
    </>
  );
};
