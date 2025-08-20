import * as React from "react";
import { cn } from "@/lib/utils";


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
isLoading?: boolean;
}


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ isLoading, className, children, ...props }, ref) => {
return (
<button
ref={ref}
className={cn(
"inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50",
className
)}
disabled={isLoading || props.disabled}
{...props}
>
{isLoading && (
<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
)}
{children}
</button>
);
});
Button.displayName = "Button";