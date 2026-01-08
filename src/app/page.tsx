"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function Home() {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);
  return (
    <main className="flex min-h-screen flex-col items-center text-white p-24">
      <Button onClick={() => createProject({ name: "New project" })}>
        Add new project
      </Button>
      {projects?.map((project) => (
        <div className="text-white text-2xl" key={project._id}>
          Name: {project.name} | Owner ID: {project.ownerId}
        </div>
      ))}
    </main>
  );
}
