import { cn } from "lib/utils";

import { RenderProgress } from "./RenderProgress";

type RenderStatusProps = {
  isRendering: boolean;
  progress: number;
  readyText: string;
  renderingLabel?: string;
  className?: string;
};

export function RenderStatus({
  isRendering,
  progress,
  readyText,
  renderingLabel = "Rendering",
  className,
}: RenderStatusProps) {
  return (
    <div className={cn("flex h-11 flex-col justify-between", className)}>
      <p className="text-sm text-muted-foreground">
        {isRendering ? `${renderingLabel}… ${progress}%` : readyText}
      </p>
      <RenderProgress
        progress={isRendering ? progress : 0}
        className={cn(!isRendering && "opacity-0")}
        aria-hidden={!isRendering}
      />
    </div>
  );
}
