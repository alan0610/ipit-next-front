import "./users.css";
import Project from "./Project";

export default function ProjectList(props) {
  return (
    <ul className="users-list">
      {props.Projects.map((project) => {
        return (
          <Project
            Id={project["Object Id"]}
            ProjectName={project["nombreProyecto"]}
            Precio={project.precio}
            Descripcion={project.descripcion}
          />
        );
      })}
    </ul>
  );
}
