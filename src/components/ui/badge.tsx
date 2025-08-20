import React from "react";
// Update the path below if your utils file is located elsewhere
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "secondary" | "success" | "warning" | "danger";
}

const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = "default", ...props }, ref) => (
        <span
            ref={ref}
            className={cn(
                "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                variantClasses[variant],
                className
            )}
            {...props}
        />
    )
);

Badge.displayName = "Badge";