import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

export const useCreateFile = () => {
  return useMutation(api.files.createFile);
};

export const useCreateFolder = () => {
  return useMutation(api.files.createFolder);
};

export const useFolderContents = ({
  projectId,
  parentId,
  enabled,
}: {
  projectId: Id<"projects">;
  parentId?: Id<"files">;
  enabled?: boolean;
}) => {
  return useQuery(
    api.files.getFolderContent,
    enabled ? { projectId, parentId } : "skip"
  );
};

export const useRenameFile = () => {
  return useMutation(api.files.renameFile);
};

export const useDeleteFile = () => {
  return useMutation(api.files.deleteFile);
};
