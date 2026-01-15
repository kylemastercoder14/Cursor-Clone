import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { getItemPadding } from "@/features/projects/components/file-explorer/constants";
import { cn } from "@/lib/utils";
import { Doc } from "convex/_generated/dataModel";
import { ReactNode } from "react";

interface TreeItemWrapperProps {
  item: Doc<"files">;
  children: ReactNode;
  level: number;
  isActive?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  onCreateFile?: () => void;
  onCreateFolder?: () => void;
}

export const TreeItemWrapper = ({
  children,
  item,
  level,
  isActive,
  onClick,
  onCreateFile,
  onCreateFolder,
  onDelete,
  onDoubleClick,
  onRename,
}: TreeItemWrapperProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <button
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onRename?.();
            }
          }}
          className={cn(
            "group flex items-center gap-1 w-full h-5.5 hover:bg-accent/30 outline-none focus:ring-1 focus:ring-inset focus:ring-ring",
            isActive && "bg-accent/30"
          )}
          style={{ paddingLeft: getItemPadding(level, item.type === "file") }}
        >
          {children}
        </button>
      </ContextMenuTrigger>
      <ContextMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-64"
      >
        {item.type === "folder" && (
          <>
            <ContextMenuItem onClick={onCreateFile} className="text-xs">
              New File...
            </ContextMenuItem>
            <ContextMenuItem onClick={onCreateFolder} className="text-xs">
              New Folder...
            </ContextMenuItem>
            <ContextMenuSeparator />
          </>
        )}

        <ContextMenuItem
          onClick={() => {
            // TODO: Open to the side implementation
          }}
          className="text-xs"
        >
          Open to the Side
          <ContextMenuShortcut>Ctrl+Enter</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            // TODO: Open with implementation
          }}
          className="text-xs"
        >
          Open with...
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            // TODO: Open File history implementation
          }}
          className="text-xs"
        >
          File History
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            // TODO: Cut implementation
          }}
          className="text-xs"
        >
          Cut
          <ContextMenuShortcut>Ctrl+X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            // TODO: Copy implementation
          }}
          className="text-xs"
        >
          Copy
          <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => {
            // TODO: Copy path implementation
          }}
          className="text-xs"
        >
          Copy Path
          <ContextMenuShortcut>Shift+Alt+C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            // TODO: Copy relative path implementation
          }}
          className="text-xs"
        >
          Copy Relative Path
          <ContextMenuShortcut>Ctrl+Shift+C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            // TODO: Copy remote path URL implementation
          }}
          className="text-xs"
        >
          Copy Remote Path URL
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onRename} className="text-xs">
          Rename...
          <ContextMenuShortcut>Enter</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={onDelete} className="text-xs">
          Delete
          <ContextMenuShortcut>Delete</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
