"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

interface CopyLinkButtonProps {
    url: string;
    className?: string;
}

export function CopyLinkButton({ url, className = "" }: CopyLinkButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`flex items-center justify-center transition-all duration-300 ${className}`}
            title={copied ? "Copied!" : "Copy link"}
        >
            {copied ? (
                <Check className="h-4 w-4 text-green-500" />
            ) : (
                <Link2 className="h-4 w-4" />
            )}
        </button>
    );
}
