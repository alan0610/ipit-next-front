"use client";
import { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
//https://raw.githubusercontent.com/ORT-PabloFernandez/PNTP2-REACT-EJEMPLO/main/src/data/Users.json

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:3000/api/users/projects"
    )
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        console.log("aca esta la data: " + data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <ProjectList Projects={projects} />
    </>
  );
}
