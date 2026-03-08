"use client";

import { useState, FormEvent } from "react";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/shared/components";

interface NewsletterSectionProps {
    heading?: string;
    subheading?: string;
    placeholder?: string;
    buttonText?: string;
    privacyNote?: string;
}

export function NewsletterSection({
    heading = "Stay Ahead of the Curve",
    subheading = "Get exclusive insights, industry trends, and expert updates delivered straight to your inbox. Join thousands of professionals who trust us for the latest in digital innovation.",
    placeholder = "Enter your email address",
    buttonText = "Subscribe",
    privacyNote = "We respect your privacy. Unsubscribe at any time.",
}: NewsletterSectionProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.trim()) {
            setStatus("error");
            setMessage("Please enter your email address.");
            return;
        }

        if (!validateEmail(email)) {
            setStatus("error");
            setMessage("Please enter a valid email address.");
            return;
        }

        setStatus("loading");
        setMessage("");

        try {
            const response = await fetch("/api/v1/newsletter/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus("success");
                setMessage("Thank you for subscribing! Check your inbox for confirmation.");
                setEmail("");
            } else {
                const data = await response.json();
                setStatus("error");
                setMessage(data.message || "Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setMessage("Unable to connect. Please try again later.");
        }
    };

    return (
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />

            {/* Blur Decorations */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-accent-orange/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-accent-orange/10 rounded-full blur-2xl" />

            {/* Semi-transparent Overlay */}
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" />

            {/* Content */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Icon */}
                    <div
                        className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-fade-in-up"
                    >
                        <Mail className="h-8 w-8 text-accent-orange" />
                    </div>

                    {/* Heading */}
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in-up"
                        style={{ animationDelay: "100ms" }}
                    >
                        {heading}
                    </h2>

                    {/* Subheading */}
                    <p
                        className="text-lg md:text-xl text-white/80 mb-8 animate-fade-in-up"
                        style={{ animationDelay: "200ms" }}
                    >
                        {subheading}
                    </p>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="animate-fade-in-up"
                        style={{ animationDelay: "300ms" }}
                    >
                        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-4">
                            <div className="flex-1 relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (status !== "idle" && status !== "loading") {
                                            setStatus("idle");
                                            setMessage("");
                                        }
                                    }}
                                    placeholder={placeholder}
                                    disabled={status === "loading"}
                                    className="w-full px-5 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/60 text-base focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/30 transition-all duration-300 disabled:opacity-50"
                                    aria-label="Email address"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={status === "loading"}
                                className="bg-accent-orange hover:bg-accent-red text-white rounded-full px-8 h-12 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-orange/25 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Subscribing...
                                    </>
                                ) : (
                                    <>
                                        {buttonText}
                                        <Send className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Status Messages */}
                        {message && (
                            <div
                                className={`flex items-center justify-center gap-2 text-sm mb-4 animate-fade-in-up ${
                                    status === "success" ? "text-green-300" : "text-red-300"
                                }`}
                            >
                                {status === "success" ? (
                                    <CheckCircle className="h-4 w-4" />
                                ) : (
                                    <AlertCircle className="h-4 w-4" />
                                )}
                                <span>{message}</span>
                            </div>
                        )}
                    </form>

                    {/* Privacy Note */}
                    <p
                        className="text-sm text-white/60 animate-fade-in-up"
                        style={{ animationDelay: "400ms" }}
                    >
                        {privacyNote}
                    </p>
                </div>
            </div>
        </section>
    );
}
