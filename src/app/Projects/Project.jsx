import Link from "next/link";

export default function Project(props) {
  const formattedCost = props.Cost.toLocaleString("es-ES"); // Constante de costo formateada para que figure con separador de miles

  return (
    <li className="flex flex-col bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden mb-6">
      <div className="flex flex-col p-5 flex-grow">
        <div className="m-1">
          <p className="text-2xl font-bold text-gray-800">
            {props.ProjectName}
          </p>

          <p className="text-lg font-bold text-gray-500 mt-3">
            Costo de inversión:{" "}
            <span className="text-lg font-medium text-gray-600">
              ${formattedCost}
            </span>
          </p>
        </div>

        <p className="text-lg font-light text-gray-800">{props.Info}</p>

        <div className="text-center mt-5">
          <Link href={`/Projects/${props.Id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:shadow-md transition duration-200">
              Info
            </button>
          </Link>
        </div>
      </div>
    </li>
  );
}
