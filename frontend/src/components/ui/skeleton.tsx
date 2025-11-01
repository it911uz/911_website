import { cn } from "@/lib/utils";

interface SkeletonProps extends React.ComponentProps<"div"> {
  animated?: boolean;
  tone?: "default" | "muted" | "accent";
}

function Skeleton({
  className,
  animated = true,
  tone = "accent",
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "rounded-md",
        tone === "default" && "bg-muted",
        tone === "muted" && "bg-muted/70",
        tone === "accent" && "bg-accent/60",
        animated && "animate-pulse",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
