import Project from "./Project";

export default function ProjectList(props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {props.Projects.map((project , index) => {
          return (
            <Project
              key={index}
              Id={project._id}
              ProjectName={project["nombreProyecto"]}
              Precio={project.precio}
              Descripcion={project.descripcion}
            />
          );
        })}
      </ul>
    </div>
  );
}
