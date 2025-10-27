import type { ComponentProps } from "react";

export const Container = ({ className, ...props }: ComponentProps<"div">) => {
	return <div className={`container mx-auto px-4 ${className}`} {...props} />;
};
