
import { Loader2 } from "lucide-react";
import { cn } from "./lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
};

export function Spinner({ className, size = "md", ...props }: SpinnerProps) {
    return (
        <div {...props} className={cn("animate-spin", className)}>
            <Loader2 className={cn("text-primary", sizeClasses[size])} />
            <span className="sr-only">Loading...</span>
        </div>
    );
}
