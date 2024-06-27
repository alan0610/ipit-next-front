"use client";
import { useState, useEffect } from "react";
import ProjectList from "./ProjectList";

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const url = `${process.env.apiUrl}/projects`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <ProjectList Projects={projects} />
    </>
  );
}
