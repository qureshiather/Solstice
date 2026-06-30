import * as React from "react";

import { cn } from "lib/utils";

type CanvasLoaderProps = {
  progress: number;
  className?: string;
};

export function CanvasLoader({ progress, className }: CanvasLoaderProps) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 z-10 flex items-center gap-2.5 rounded-b-lg border-t border-border/50 bg-background/90 px-3 py-2 backdrop-blur-md",
        className,
      )}
    >
      <span className="shrink-0 text-xs font-medium tabular-nums text-foreground">
        {progress}%
      </span>
      <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
