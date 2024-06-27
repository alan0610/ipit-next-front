import Project from "./Project";

export default function ProjectList(props) {
  return (
    <div className="container mx-auto px-4 py-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5">
        {props.Projects.map((project, index) => {
          return (
            <Project
              key={index}
              Id={project._id}
              ProjectName={project.name}
              Cost={project.cost_investment}
              Info={project.info}
            />
          );
        })}
      </ul>
    </div>
  );
}
