import { cn } from "lib/utils";

type RenderProgressProps = {
  progress: number;
  className?: string;
  "aria-hidden"?: boolean;
};

export function RenderProgress({
  progress,
  className,
  "aria-hidden": ariaHidden,
}: RenderProgressProps) {
  return (
    <div
      className={cn("h-1 overflow-hidden rounded-full bg-muted", className)}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-hidden={ariaHidden}
    >
      <div
        className="h-full rounded-full bg-primary transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
