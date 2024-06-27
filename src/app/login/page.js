"use client";
import Link from "next/link";
import { useState } from "react";
const ProjectsPage = "/Projects";

export default function LoginPage() {
  const [error, setError] = useState(null);

  async function handlerLogin(formData) {
    const user = {
      // Obtener data del formulario HTML, los textos dentro del get corresponden al Id del label
      username: formData.get("username"),
      password: formData.get("password"),
    };
    console.log(user);

    // Realiza un POST obteniendo los parametros Fetcheados desde el backend
    const request = await fetch(`${process.env.apiUrl}/users/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user), // Postea el
    });
    console.log(request);

    // Preguntar en el request por el request.status
    if (request.status === 401) {
      setError("Usuario o contraseña incorrectos");
      return;
    }

    const token = (await request.json()).token;
    localStorage.setItem("token", token);

    // Redireccionar a la pagina original, antes de pedir credenciales
    location.href = ProjectsPage;
  }

  return (
    <>
      <div className="flex flex-col mt-15 justify-center bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl font-medium leading-9 tracking-tight text-gray-900">
            Ingresa a tu Cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action={handlerLogin} method="POST">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Usuario
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block 
                  w-full 
                  rounded-md 
                  border-0 
                  px-3 py-1.5 
                  text-gray-900 
                  shadow-sm 
                  ring-1 ring-inset ring-gray-300 
                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block 
                  w-full 
                  rounded-md 
                  border-0 
                  px-3 py-1.5 
                  text-gray-900 
                  shadow-sm 
                  ring-1 ring-inset ring-gray-300 
                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex 
                w-full 
                justify-center 
                rounded-md 
                bg-indigo-600 
                px-3 py-1.5 
                text-sm text-white 
                font-semibold 
                leading-6 
                shadow-sm 
                hover:bg-indigo-500 
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Ingresar
              </button>
            </div>
          </form>

          {error && (
            <div
              className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
