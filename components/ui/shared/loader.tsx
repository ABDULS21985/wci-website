
import { cn } from "./lib/utils";
import { Spinner } from "./spinner";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "fullscreen" | "default";
}

export function Loader({
    className,
    size = "lg",
    variant = "default",
    ...props
}: LoaderProps) {
    if (variant === "fullscreen") {
        return (
            <div
                className={cn(
                    "fixed inset-0 z-50 flex items-center justify-center bg-background/80",
                    className
                )}
                {...props}
            >
                <Spinner size={size} />
            </div>
        );
    }

    return (
        <div
            className={cn("flex w-full items-center justify-center py-6", className)}
            {...props}
        >
            <Spinner size={size} />
        </div>
    );
}
