"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'

const loginPage = "/login";

export default function DetailsPage({ params }) {
  const { id } = params;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const url = `${process.env.apiUrl}/projects`;
  const urlInvest = `${process.env.apiUrl}/users/invest`;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          location.href = loginPage;
        }
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        const selectedProject = data.find((project) => project._id === id);
        setProject(selectedProject);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleInvest = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Decodifica el token JWT correctamente
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
      console.log(decodedToken)

      const response = await fetch(urlInvest, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          projectId: id,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al realizar la inversión');
      }

      const data = await response.json();

      if (data.success) {
        setMessage('Operación realizada');
        alert('Operación realizada')
        location.href = "/Users"
      } else {
        setMessage('Saldo Insuficiente');
      }
    } catch (error) {
      console.error('Error al invertir:', error);
      setMessage('Error al realizar la inversión');
    }
  };

  return (
    <main>
      <div>
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          project && (
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-6">
              <div className="p-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {project.name}
                </h2>
                <p className="text-sm text-gray-600">{project.info}</p>
                <p className="mt-2 text-gray-700">{project.detailed_info}</p>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-600">Costo de Inversión:</p>
                    <p className="text-lg font-medium text-gray-800">
                      ${project.cost_investment.toLocaleString("es-ES")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Retorno de Inversión:</p>
                    <ul className="list-disc pl-6 ">
                      <li className="text-sm text-gray-700">
                        Ingresos: $
                        {project.investment_return.income.toLocaleString(
                          "es-ES"
                        )}
                      </li>
                      <li className="text-sm text-gray-700">
                        Costos Operativos: $
                        {project.investment_return.operating_costs.toLocaleString(
                          "es-ES"
                        )}
                      </li>
                      <li className="text-sm text-gray-700">
                        Beneficio Neto: $
                        {project.investment_return.net_profit.toLocaleString(
                          "es-ES"
                        )}
                      </li>
                      <li className="text-sm text-gray-700">
                        ROI: {project.investment_return.roi}
                      </li>
                      <li className="text-sm text-gray-700">
                        Periodo de Retorno:{" "}
                        {project.investment_return.payback_period}
                      </li>
                    </ul>
                  </div>
                </div>
                <hr className="my-4" />
                <div>
                  <p className="text-gray-600">Riesgos:</p>
                  <p className="text-sm text-gray-700">{project.risks}</p>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600">Estrategias de Mitigación:</p>
                  <p className="text-sm text-gray-700">
                    {project.mitigation_strategies}
                  </p>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleInvest}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:shadow-md transition duration-200"
                  >
                    Invertir
                  </button>
                  <p className="mt-2 text-sm text-gray-700">{message}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}
