"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { ChevronDown } from "lucide-react";

function Popover(props: ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  children,
  className,
  hasIcon = false,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Trigger> & {
  hasIcon?: boolean;
}) {
  return (
    <PopoverPrimitive.Trigger
      className={cn(
        "cursor-pointer select-none text-foreground font-medium transition-all",
        "hover:text-primary focus:outline-none",
        hasIcon && "inline-flex items-center gap-1",
        className
      )}
      data-slot="popover-trigger"
      {...props}
    >
      <span className="w-fit">{children}</span>
      {hasIcon && (
        <span className="transition-transform duration-200">
          <ChevronDown size={24} />
        </span>
      )}
    </PopoverPrimitive.Trigger>
  );
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 8,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-auto rounded-xl bg-white text-popover-foreground shadow-md outline-hidden",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor(props: ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
