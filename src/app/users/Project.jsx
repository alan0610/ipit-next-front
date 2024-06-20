import "./users.css";
import Link from "next/link";

export default function Project(props) {
  return (
    <li className="user-item">
      <div className="card user-item__content">
        <Link href={`/users/${props.Id}`}>
          <div className="user-item__info">
            <h2>{props.ProjectName}</h2>
            <h2>{props.Precio}</h2>
            <p>{props.Descripcion}</p>
          </div>
        </Link>
        <div>
          <Link href={`/users/${props.Id}`}>
            <button>Invertir</button>
          </Link>
        </div>
      </div>
    </li>
  );
}
