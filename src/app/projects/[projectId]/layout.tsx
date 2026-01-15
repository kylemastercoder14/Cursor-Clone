import { ProjectIdLayout } from "@/features/projects/components/ProjectIdLayout";
import { Id } from 'convex/_generated/dataModel';
import { ReactNode } from "react";

const ProjectLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ projectId: Id<"projects"> }>;
}) => {
  const { projectId } = await params;
  return <ProjectIdLayout projectId={projectId}>{children}</ProjectIdLayout>;
};

export default ProjectLayout;
