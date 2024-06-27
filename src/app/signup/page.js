"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
const ProjectsPage = "/Projects";

export default function PageSignup() {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      location.href = ProjectsPage;
    }
  }, [])

  async function handlerSignup(formData) {
    const user = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch(`${process.env.apiUrl}/users/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Si la respuesta es exitosa, redirige al usuario
      redirect(ProjectsPage);
    } catch (error) {
      console.error("Error:", error);
      redirect(ProjectsPage);
    }
  }

  return (
    <>
      <div className="flex flex-col mt-15 justify-center bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl font-medium leading-9 tracking-tight text-gray-900">
            Registrate
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action={handlerSignup} method="POST">
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
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
