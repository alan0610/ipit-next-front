"use client";
import { useState, useEffect } from "react";
import ProjectList from "./ProjectList";

const loginPage = "/login";

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const url = `${process.env.apiUrl}/projects`;

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        location.href = loginPage;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.log('Failed to fetch projects');
      }
    };

    fetchProjects().catch(console.error);
  }, []);

  return (
    <>
      <ProjectList Projects={projects} />
    </>
  );
}
