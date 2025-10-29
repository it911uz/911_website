import type { ComponentProps } from "react";

export const Container = ({ className, ...props }: ComponentProps<"div">) => {
	return (
		<div className={`max-w-[1750px] mx-auto px-4 ${className}`} {...props} />
	);
};
