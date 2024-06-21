import Link from "next/link";

export default function Project(props) {
  return (
    <li className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden mb-6">
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{props.ProjectName}</h2>
          <h2 className="text-xl text-gray-600">${props.Precio} por acción</h2>
          <p className="text-gray-700 mt-2">{props.Descripcion}</p>
        </div>
        <div className="text-center">
          <Link href={`/projectss/${props.Id}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 hover:shadow-md transition duration-200">
              Invertir
            </button>
          </Link>
        </div>
      </div>
    </li>
  );
}
