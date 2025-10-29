import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Loader2Icon } from "lucide-react";

export const buttonVariants = cva(
	"cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 aria-invalid:ring-red-600/20 aria-invalid:border-red-600",
	{
		variants: {
			variant: {
				black: "bg-gray-900 text-white hover:bg-black/80",
				white: "bg-white text-gray-900 hover:bg-gray-100",
				red: "bg-red-600 text-white hover:bg-red-700",
				green: "bg-green-600 text-white hover:bg-green-700",
				default: "bg-gray-200 text-gray-900 hover:bg-gray-300",
				orange: "bg-orange-600 text-white hover:bg-orange-700",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-8 px-3 text-xs font-medium",
				lg: "h-12 px-8 py-3 text-lg font-semibold",
			},
			rounded: {
				"true": "rounded-full",
				"false": "rounded-md",
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			rounded: false,
		},
	},
);

export const Button = ({
	className,
	variant,
	size,
	rounded,
	asChild = false,
	children,
	loading = false,
	...props
}: ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		loading?: boolean;
	}) => {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, rounded, className }))}
			disabled={props.disabled || loading}
			{...props}
		>
			{
				loading ? <Loader2Icon className="animate-spin size-5" /> : children
			}
		</Comp>
	);
};