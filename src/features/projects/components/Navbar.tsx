"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useProject,
  useRenameProject,
} from "@/features/projects/hooks/use-projects";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Id } from "convex/_generated/dataModel";
import { formatDistanceToNow } from "date-fns";
import { CloudCheckIcon, Loader2Icon } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const Navbar = ({ projectId }: { projectId: Id<"projects"> }) => {
  const project = useProject(projectId);
  const renameProject = useRenameProject(projectId);

  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState("");

  const handleStartRename = () => {
    if (!project) return;
    setName(project.name);
    setIsRenaming(true);
  };

  const handleSubmit = () => {
    if (!project) return;
    setIsRenaming(true);

    const trimmedName = name.trim();
    if (!trimmedName || trimmedName === project.name) return;

    renameProject({ id: projectId, name: trimmedName });
  };

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
      setIsRenaming(false);
      toast.success("Project renamed successfully");
    } else if (e.key === "Escape") {
      setIsRenaming(false);
    }
  };
  return (
    <nav className="flex justify-between items-center gap-x-2 p-2 bg-sidebar border-b">
      <div className="flex items-center gap-x-2">
        <Breadcrumb>
          <BreadcrumbList className="gap-0!">
            <BreadcrumbItem>
              <BreadcrumbLink className="flex items-center gap-1.5" asChild>
                <Button variant="ghost" className="w-fit! p-1-5! h-7!" asChild>
                  <Link href="/">
                    <Image src="/logo.svg" alt="Logo" width={20} height={20} />{" "}
                    <span className={cn("text-sm font-medium", font.className)}>
                      Cursor Clone
                    </span>
                  </Link>
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ml-0! mr-3!" />
            <BreadcrumbItem>
              {isRenaming ? (
                <input
                  type="text"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(e) => e.currentTarget.select()}
                  onBlur={handleSubmit}
                  onKeyDown={handleKeydown}
                  className="text-sm bg-transparent text-foreground outline-none focus:ring-1 focus:ring-inset focus:ring-ring font-medium max-w-40 truncate"
                />
              ) : (
                <BreadcrumbPage
                  onClick={handleStartRename}
                  className="text-sm cursor-pointer hover:text-primary font-medium max-w-40 truncate"
                >
                  {project?.name ?? "Loading..."}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {project?.importStatus === "importing" ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Loader2Icon className="animate-spin size-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>Importing...</TooltipContent>
          </Tooltip>
        ) : (
          project?.updatedAt && (
            <Tooltip>
              <TooltipTrigger asChild>
                <CloudCheckIcon className="size-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                Saved{" "}
                {project?.updatedAt
                  ? formatDistanceToNow(project.updatedAt, { addSuffix: true })
                  : "unknown"}
              </TooltipContent>
            </Tooltip>
          )
        )}
      </div>
      <div className="flex items-center gap-2">
        <UserButton />
      </div>
    </nav>
  );
};
