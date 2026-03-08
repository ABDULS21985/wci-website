"use client";

import { useState, useEffect, useRef, FormEvent, useId, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    Loader2,
    CheckCircle,
    AlertCircle,
    User,
    Mail,
    Phone,
    Building2,
    MessageSquare,
    HelpCircle,
    Clock,
    ArrowRight,
    Sparkles,
    ChevronDown,
    DollarSign,
    Calendar,
    Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/shared/components";
import { LiveRegion, SrOnly } from "../ui/accessibility";
import { Confetti } from "./confetti";
import { easings, durations } from "@/lib/motion-config";

// ============================================================================
// Types
// ============================================================================

interface FormData {
    name: string;
    email: string;
    company: string;
    message: string;
    // Additional fields (progressive disclosure)
    phone: string;
    budget: string;
    timeline: string;
    serviceInterest: string;
    honeypot: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    company?: string;
    message?: string;
    phone?: string;
    budget?: string;
    timeline?: string;
    serviceInterest?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ============================================================================
// Floating Label Input Component
// ============================================================================

interface FloatingInputProps {
    id: string;
    name: keyof FormData;
    type?: string;
    value: string;
    label: string;
    icon: React.ElementType;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    touched?: boolean;
    isValid?: boolean;
    hintText?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
}

function FloatingInput({
    id,
    name,
    type = "text",
    value,
    label,
    icon: Icon,
    required,
    disabled,
    error,
    touched,
    isValid,
    hintText,
    onChange,
    onBlur,
}: FloatingInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;
    const hasValue = value.trim().length > 0;
    const shouldFloat = isFocused || hasValue;
    const showError = error && touched;

    return (
        <div className="relative group">
            {hintText && (
                <SrOnly as="span" id={hintId}>
                    {hintText}
                </SrOnly>
            )}
            <div className="relative">
                {/* Icon */}
                <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 z-10 ${
                        isFocused ? "text-primary" : "text-neutral-400"
                    }`}
                >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                {/* Input */}
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur();
                    }}
                    disabled={disabled}
                    className={`
                        peer w-full pl-12 pr-12 pt-6 pb-2
                        border-2 rounded-xl bg-white
                        transition-all duration-200
                        focus:outline-none focus:ring-0
                        placeholder:text-transparent
                        ${
                            showError
                                ? "border-red-300 focus:border-red-500"
                                : "border-neutral-200 focus:border-primary"
                        }
                        ${disabled ? "opacity-50 cursor-not-allowed bg-neutral-50" : ""}
                    `}
                    placeholder={label}
                    aria-required={required}
                    aria-invalid={showError ? "true" : undefined}
                    aria-describedby={[
                        showError ? errorId : null,
                        hintText ? hintId : null,
                    ]
                        .filter(Boolean)
                        .join(" ") || undefined}
                    autoComplete={
                        name === "email"
                            ? "email"
                            : name === "phone"
                            ? "tel"
                            : name === "company"
                            ? "organization"
                            : name === "name"
                            ? "name"
                            : undefined
                    }
                />

                {/* Floating Label */}
                <label
                    htmlFor={id}
                    className={`
                        absolute left-12 pointer-events-none z-20
                        transition-all duration-200 ease-out
                        ${
                            shouldFloat
                                ? "top-2 text-xs font-medium text-primary"
                                : "top-1/2 -translate-y-1/2 text-neutral-500"
                        }
                    `}
                >
                    {label}
                    {required && (
                        <>
                            <span className="text-red-500 ml-0.5" aria-hidden="true">
                                *
                            </span>
                            <SrOnly>(required)</SrOnly>
                        </>
                    )}
                </label>

                {/* Validation Icon */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                    <AnimatePresence mode="wait">
                        {isValid && touched && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="text-green-500"
                            >
                                <CheckCircle className="h-5 w-5" aria-hidden="true" />
                                <SrOnly>Field is valid</SrOnly>
                            </motion.div>
                        )}
                        {showError && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="text-red-500"
                            >
                                <AlertCircle className="h-5 w-5" aria-hidden="true" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {showError && (
                    <motion.p
                        initial={{ opacity: 0, height: 0, y: -8 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        id={errorId}
                        role="alert"
                        className="mt-1.5 text-sm text-red-600 flex items-center gap-1 overflow-hidden"
                    >
                        <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

// ============================================================================
// Floating Label Textarea Component
// ============================================================================

interface FloatingTextareaProps {
    id: string;
    name: keyof FormData;
    value: string;
    label: string;
    icon: React.ElementType;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    touched?: boolean;
    isValid?: boolean;
    hintText?: string;
    rows?: number;
    maxLength?: number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: () => void;
}

function FloatingTextarea({
    id,
    name,
    value,
    label,
    icon: Icon,
    required,
    disabled,
    error,
    touched,
    isValid,
    hintText,
    rows = 5,
    maxLength = 5000,
    onChange,
    onBlur,
}: FloatingTextareaProps) {
    const [isFocused, setIsFocused] = useState(false);
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;
    const hasValue = value.trim().length > 0;
    const shouldFloat = isFocused || hasValue;
    const showError = error && touched;

    return (
        <div className="relative group">
            {hintText && (
                <SrOnly as="span" id={hintId}>
                    {hintText}
                </SrOnly>
            )}
            <div className="relative">
                {/* Icon */}
                <div
                    className={`absolute left-4 top-4 transition-colors duration-200 z-10 ${
                        isFocused ? "text-primary" : "text-neutral-400"
                    }`}
                >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                {/* Textarea */}
                <textarea
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur();
                    }}
                    disabled={disabled}
                    rows={rows}
                    className={`
                        peer w-full pl-12 pr-12 pt-6 pb-2
                        border-2 rounded-xl bg-white resize-none
                        transition-all duration-200
                        focus:outline-none focus:ring-0
                        placeholder:text-transparent
                        ${
                            showError
                                ? "border-red-300 focus:border-red-500"
                                : "border-neutral-200 focus:border-primary"
                        }
                        ${disabled ? "opacity-50 cursor-not-allowed bg-neutral-50" : ""}
                    `}
                    placeholder={label}
                    aria-required={required}
                    aria-invalid={showError ? "true" : undefined}
                    aria-describedby={[
                        showError ? errorId : null,
                        hintText ? hintId : null,
                    ]
                        .filter(Boolean)
                        .join(" ") || undefined}
                />

                {/* Floating Label */}
                <label
                    htmlFor={id}
                    className={`
                        absolute left-12 pointer-events-none z-20
                        transition-all duration-200 ease-out
                        ${
                            shouldFloat
                                ? "top-2 text-xs font-medium text-primary"
                                : "top-4 text-neutral-500"
                        }
                    `}
                >
                    {label}
                    {required && (
                        <>
                            <span className="text-red-500 ml-0.5" aria-hidden="true">
                                *
                            </span>
                            <SrOnly>(required)</SrOnly>
                        </>
                    )}
                </label>

                {/* Validation Icon */}
                <div className="absolute right-4 top-4 z-10">
                    <AnimatePresence mode="wait">
                        {isValid && touched && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="text-green-500"
                            >
                                <CheckCircle className="h-5 w-5" aria-hidden="true" />
                                <SrOnly>Field is valid</SrOnly>
                            </motion.div>
                        )}
                        {showError && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="text-red-500"
                            >
                                <AlertCircle className="h-5 w-5" aria-hidden="true" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Error Message & Character Count */}
            <div className="flex justify-between mt-1.5">
                <AnimatePresence>
                    {showError && (
                        <motion.p
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.2 }}
                            id={errorId}
                            role="alert"
                            className="text-sm text-red-600 flex items-center gap-1"
                        >
                            <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
                <span className="text-sm text-neutral-400 ml-auto">
                    <span aria-hidden="true">
                        {value.length}/{maxLength}
                    </span>
                    <SrOnly>{value.length} of {maxLength} characters used</SrOnly>
                </span>
            </div>
        </div>
    );
}

// ============================================================================
// Floating Label Select Component
// ============================================================================

interface FloatingSelectProps {
    id: string;
    name: keyof FormData;
    value: string;
    label: string;
    icon: React.ElementType;
    options: { value: string; label: string }[];
    required?: boolean;
    disabled?: boolean;
    error?: string;
    touched?: boolean;
    isValid?: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur: () => void;
}

function FloatingSelect({
    id,
    name,
    value,
    label,
    icon: Icon,
    options,
    required,
    disabled,
    error,
    touched,
    isValid,
    onChange,
    onBlur,
}: FloatingSelectProps) {
    const [isFocused, setIsFocused] = useState(false);
    const errorId = `${id}-error`;
    const hasValue = value.trim().length > 0;
    const shouldFloat = isFocused || hasValue;
    const showError = error && touched;

    return (
        <div className="relative group">
            <div className="relative">
                {/* Icon */}
                <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 z-10 ${
                        isFocused ? "text-primary" : "text-neutral-400"
                    }`}
                >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                {/* Select */}
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setIsFocused(false);
                        onBlur();
                    }}
                    disabled={disabled}
                    className={`
                        peer w-full pl-12 pr-12 pt-6 pb-2
                        border-2 rounded-xl bg-white appearance-none
                        transition-all duration-200
                        focus:outline-none focus:ring-0
                        ${
                            showError
                                ? "border-red-300 focus:border-red-500"
                                : "border-neutral-200 focus:border-primary"
                        }
                        ${disabled ? "opacity-50 cursor-not-allowed bg-neutral-50" : ""}
                    `}
                    aria-required={required}
                    aria-invalid={showError ? "true" : undefined}
                    aria-describedby={showError ? errorId : undefined}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Floating Label */}
                <label
                    htmlFor={id}
                    className={`
                        absolute left-12 pointer-events-none z-20
                        transition-all duration-200 ease-out
                        ${
                            shouldFloat
                                ? "top-2 text-xs font-medium text-primary"
                                : "top-1/2 -translate-y-1/2 text-neutral-500"
                        }
                    `}
                >
                    {label}
                    {required && (
                        <>
                            <span className="text-red-500 ml-0.5" aria-hidden="true">
                                *
                            </span>
                            <SrOnly>(required)</SrOnly>
                        </>
                    )}
                </label>

                {/* Dropdown Arrow / Validation Icon */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <AnimatePresence mode="wait">
                        {isValid && touched ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="text-green-500"
                            >
                                <CheckCircle className="h-5 w-5" aria-hidden="true" />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-neutral-400"
                            >
                                <ChevronDown className="h-5 w-5" aria-hidden="true" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {showError && (
                    <motion.p
                        initial={{ opacity: 0, height: 0, y: -8 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        id={errorId}
                        role="alert"
                        className="mt-1.5 text-sm text-red-600 flex items-center gap-1 overflow-hidden"
                    >
                        <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

// ============================================================================
// Select Options
// ============================================================================

const subjectOptions = [
    { value: "", label: "Select a topic..." },
    { value: "partnership", label: "Partnership Inquiry" },
    { value: "demo", label: "Product Demo Request" },
    { value: "support", label: "Technical Support" },
    { value: "consulting", label: "Consulting Services" },
    { value: "careers", label: "Career Opportunities" },
    { value: "other", label: "Other" },
];

const budgetOptions = [
    { value: "", label: "Select budget range..." },
    { value: "under-10k", label: "Under $10,000" },
    { value: "10k-50k", label: "$10,000 - $50,000" },
    { value: "50k-100k", label: "$50,000 - $100,000" },
    { value: "100k-500k", label: "$100,000 - $500,000" },
    { value: "500k+", label: "$500,000+" },
    { value: "not-sure", label: "Not sure yet" },
];

const timelineOptions = [
    { value: "", label: "Select timeline..." },
    { value: "asap", label: "As soon as possible" },
    { value: "1-month", label: "Within 1 month" },
    { value: "1-3-months", label: "1-3 months" },
    { value: "3-6-months", label: "3-6 months" },
    { value: "6-12-months", label: "6-12 months" },
    { value: "exploring", label: "Just exploring" },
];

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = "contact_form_draft_v2";

const initialFormData: FormData = {
    name: "",
    email: "",
    company: "",
    message: "",
    phone: "",
    budget: "",
    timeline: "",
    serviceInterest: "",
    honeypot: "",
};

// ============================================================================
// Main Component
// ============================================================================

export function EnhancedContactForm() {
    // State
    const [formData, setFormData] = useState<FormData>(() => {
        if (typeof window === "undefined") return initialFormData;
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return { ...initialFormData, ...JSON.parse(saved) };
            } catch {
                return initialFormData;
            }
        }
        return initialFormData;
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
    const [submitMessage, setSubmitMessage] = useState("");
    const [showMore, setShowMore] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const lastSubmitRef = useRef(0);
    const additionalFieldsRef = useRef<HTMLDivElement>(null);

    // Generate unique IDs for accessibility
    const formId = useId();
    const formTitleId = `${formId}-title`;
    const formDescId = `${formId}-desc`;
    const statusRegionId = `${formId}-status`;

    // Check if any additional fields have values
    const hasAdditionalData = useMemo(() => {
        return Boolean(formData.phone || formData.budget || formData.timeline || formData.serviceInterest);
    }, [formData.phone, formData.budget, formData.timeline, formData.serviceInterest]);

    // Auto-expand if there's additional data
    useEffect(() => {
        if (hasAdditionalData) {
            setShowMore(true);
        }
    }, [hasAdditionalData]);

    // Auto-save form data
    useEffect(() => {
        if (submitStatus !== "success") {
            const timer = setTimeout(() => {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [formData, submitStatus]);

    // Validation
    const validateField = (name: keyof FormData, value: string): string | undefined => {
        switch (name) {
            case "name":
                if (!value.trim()) return "Please enter your name";
                if (value.length < 2) return "Name must be at least 2 characters";
                if (value.length > 100) return "Name must be less than 100 characters";
                return undefined;
            case "email":
                if (!value.trim()) return "Please enter your email";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return "Please enter a valid email address";
                return undefined;
            case "company":
                if (!value.trim()) return "Please enter your company name";
                if (value.length > 100) return "Company name must be less than 100 characters";
                return undefined;
            case "message":
                if (!value.trim()) return "Please enter your message";
                if (value.length < 10) return "Message must be at least 10 characters";
                if (value.length > 5000) return "Message must be less than 5000 characters";
                return undefined;
            case "phone":
                if (value && value.length > 50) return "Phone number must be less than 50 characters";
                return undefined;
            default:
                return undefined;
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        const requiredFields: (keyof FormErrors)[] = ["name", "email", "company", "message"];

        requiredFields.forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        // Validate optional fields if they have values
        if (formData.phone) {
            const phoneError = validateField("phone", formData.phone);
            if (phoneError) newErrors.phone = phoneError;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (formData.honeypot) {
            setSubmitStatus("success");
            setSubmitMessage("Thank you for your message!");
            return;
        }

        const now = Date.now();
        if (now - lastSubmitRef.current < 10000) {
            return;
        }
        lastSubmitRef.current = now;

        setTouched({
            name: true,
            email: true,
            company: true,
            message: true,
        });

        if (!validateForm()) {
            return;
        }

        setSubmitStatus("loading");
        setSubmitMessage("");

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.womenconnectintl.org/api/v1";
            const response = await fetch(`${apiUrl}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim() || undefined,
                    company: formData.company.trim() || undefined,
                    subject: formData.serviceInterest || "General Inquiry",
                    message: formData.message.trim(),
                    metadata: {
                        budget: formData.budget || undefined,
                        timeline: formData.timeline || undefined,
                        serviceInterest: formData.serviceInterest || undefined,
                    },
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus("success");
                setSubmitMessage(`Thank you, ${formData.name.split(" ")[0]}! We'll get back to you within 2 business hours.`);
                setShowConfetti(true);
                localStorage.removeItem(STORAGE_KEY);

                // Reset confetti after animation
                setTimeout(() => setShowConfetti(false), 3500);
            } else if (response.status === 429) {
                setSubmitStatus("error");
                setSubmitMessage("Too many requests. Please wait a moment and try again.");
            } else {
                setSubmitStatus("error");
                setSubmitMessage(data.message || "Something went wrong. Please try again.");
            }
        } catch {
            setSubmitStatus("error");
            setSubmitMessage("Unable to send message. Please check your connection and try again.");
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const error = validateField(name as keyof FormData, value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (name: keyof FormData) => {
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name, formData[name]);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const isFieldValid = (name: keyof FormErrors) => {
        return !errors[name] && formData[name].trim().length > 0;
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setErrors({});
        setTouched({});
        setSubmitStatus("idle");
        setSubmitMessage("");
        setShowMore(false);
    };

    // ========================================================================
    // Success State
    // ========================================================================

    if (submitStatus === "success") {
        return (
            <>
                <Confetti isActive={showConfetti} />
                <motion.div
                    className="relative bg-white border border-neutral-200 rounded-2xl p-8 shadow-xl shadow-neutral-200/50"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: easings.outExpo }}
                    role="alert"
                    aria-live="polite"
                >
                    {/* Premium gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-t-2xl" />

                    <div className="text-center py-8">
                        <motion.div
                            className="relative inline-flex items-center justify-center mb-6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div
                                className="absolute inset-0 bg-green-100 rounded-full motion-safe:animate-ping opacity-75"
                                aria-hidden="true"
                            />
                            <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                                <CheckCircle className="h-10 w-10 text-white" aria-hidden="true" />
                            </div>
                        </motion.div>

                        <motion.h3
                            className="text-display text-2xl font-bold text-neutral-900 mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Message Sent Successfully!
                        </motion.h3>
                        <motion.p
                            className="text-neutral-500 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {submitMessage}
                        </motion.p>

                        <motion.div
                            className="bg-neutral-50 rounded-xl p-6 mb-6 border border-neutral-100"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h4 className="font-semibold text-neutral-900 mb-4">What happens next?</h4>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                                    </div>
                                    <span>We review your message</span>
                                </div>
                                <ArrowRight
                                    className="h-4 w-4 text-neutral-400 hidden md:block"
                                    aria-hidden="true"
                                />
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                                    </div>
                                    <span>Reply within 2 hours</span>
                                </div>
                                <ArrowRight
                                    className="h-4 w-4 text-neutral-400 hidden md:block"
                                    aria-hidden="true"
                                />
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                                    </div>
                                    <span>Start your project</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Button
                                onClick={resetForm}
                                variant="outline"
                                className="border-primary text-primary hover:bg-primary hover:text-white"
                            >
                                Send Another Message
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </>
        );
    }

    // ========================================================================
    // Form State
    // ========================================================================

    return (
        <div className="relative bg-white border border-neutral-200 rounded-2xl p-8 shadow-xl shadow-neutral-200/50">
            {/* Premium gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent-orange rounded-t-2xl" />

            <div className="mb-8">
                <h2 id={formTitleId} className="text-display text-2xl font-bold text-neutral-900 mb-2">
                    Send Us a Message
                </h2>
                <p id={formDescId} className="text-neutral-500">
                    Fill out the form below and we&apos;ll respond within 2 business hours.
                </p>
            </div>

            {/* Live region for status announcements */}
            <LiveRegion
                id={statusRegionId}
                politeness={submitStatus === "error" ? "assertive" : "polite"}
            >
                {submitStatus === "loading" && "Sending your message, please wait."}
                {submitStatus === "error" && submitMessage}
            </LiveRegion>

            {/* Error Alert */}
            <AnimatePresence>
                {submitStatus === "error" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            role="alert"
                            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
                            initial={{ x: 0 }}
                            animate={{ x: [0, -10, 10, -10, 10, 0] }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <AlertCircle className="h-5 w-5 text-red-600 shrink-0" aria-hidden="true" />
                            <p className="text-red-800">{submitMessage}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
                role="group"
                aria-labelledby={formTitleId}
                aria-describedby={formDescId}
                noValidate
            >
                {/* Honeypot field */}
                <input
                    type="text"
                    name="website"
                    value={formData.honeypot}
                    onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
                    aria-hidden="true"
                />

                {/* Essential Fields */}
                <FloatingInput
                    id="name"
                    name="name"
                    value={formData.name}
                    label="Your Full Name"
                    icon={User}
                    required
                    disabled={submitStatus === "loading"}
                    error={errors.name}
                    touched={touched.name}
                    isValid={isFieldValid("name")}
                    hintText="Enter your full name"
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                />

                <FloatingInput
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    label="Work Email Address"
                    icon={Mail}
                    required
                    disabled={submitStatus === "loading"}
                    error={errors.email}
                    touched={touched.email}
                    isValid={isFieldValid("email")}
                    hintText="Enter a valid work email address"
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                />

                <FloatingInput
                    id="company"
                    name="company"
                    value={formData.company}
                    label="Company Name"
                    icon={Building2}
                    required
                    disabled={submitStatus === "loading"}
                    error={errors.company}
                    touched={touched.company}
                    isValid={isFieldValid("company")}
                    hintText="Enter your company or organization name"
                    onChange={handleChange}
                    onBlur={() => handleBlur("company")}
                />

                <FloatingTextarea
                    id="message"
                    name="message"
                    value={formData.message}
                    label="Tell Us About Your Project"
                    icon={MessageSquare}
                    required
                    disabled={submitStatus === "loading"}
                    error={errors.message}
                    touched={touched.message}
                    isValid={isFieldValid("message")}
                    hintText="Describe your project or inquiry in detail"
                    onChange={handleChange}
                    onBlur={() => handleBlur("message")}
                />

                {/* Progressive Disclosure Toggle */}
                <motion.button
                    type="button"
                    onClick={() => setShowMore(!showMore)}
                    className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-primary hover:text-secondary transition-colors"
                    aria-expanded={showMore}
                    aria-controls="additional-fields"
                >
                    <motion.span
                        animate={{ rotate: showMore ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className="h-4 w-4" />
                    </motion.span>
                    {showMore ? "Show less" : "Tell us more (optional)"}
                </motion.button>

                {/* Additional Fields with Smooth Animation */}
                <AnimatePresence initial={false}>
                    {showMore && (
                        <motion.div
                            id="additional-fields"
                            ref={additionalFieldsRef}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: easings.outExpo }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-5 pt-2">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <FloatingInput
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        label="Phone Number"
                                        icon={Phone}
                                        disabled={submitStatus === "loading"}
                                        error={errors.phone}
                                        touched={touched.phone}
                                        isValid={isFieldValid("phone")}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("phone")}
                                    />

                                    <FloatingSelect
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        label="Estimated Budget"
                                        icon={DollarSign}
                                        options={budgetOptions}
                                        disabled={submitStatus === "loading"}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("budget")}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <FloatingSelect
                                        id="timeline"
                                        name="timeline"
                                        value={formData.timeline}
                                        label="Project Timeline"
                                        icon={Calendar}
                                        options={timelineOptions}
                                        disabled={submitStatus === "loading"}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("timeline")}
                                    />

                                    <FloatingSelect
                                        id="serviceInterest"
                                        name="serviceInterest"
                                        value={formData.serviceInterest}
                                        label="Service Interest"
                                        icon={Briefcase}
                                        options={subjectOptions}
                                        disabled={submitStatus === "loading"}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur("serviceInterest")}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Response Time Note */}
                <div className="flex items-center gap-2 text-sm text-neutral-500 bg-neutral-50 px-4 py-3 rounded-xl border border-neutral-100">
                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>Average response time: 2 hours during business hours</span>
                </div>

                {/* Submit Button */}
                <motion.div
                    whileTap={{ scale: submitStatus === "loading" ? 1 : 0.98 }}
                >
                    <Button
                        type="submit"
                        disabled={submitStatus === "loading"}
                        className={`
                            w-full bg-gradient-to-r from-primary to-secondary
                            hover:from-primary/90 hover:to-secondary/90
                            text-white px-6 py-4 rounded-xl font-semibold
                            transition-all duration-300
                            disabled:opacity-50 disabled:cursor-not-allowed
                            flex items-center justify-center gap-2
                            hover:shadow-lg hover:shadow-primary/30
                            btn-press
                            ${submitStatus === "error" ? "animate-shake" : ""}
                        `}
                        aria-describedby={statusRegionId}
                    >
                        {submitStatus === "loading" ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                                <span>Sending...</span>
                                <SrOnly>Please wait while your message is being sent</SrOnly>
                            </>
                        ) : (
                            <>
                                <Send className="h-5 w-5" aria-hidden="true" />
                                <span>Send My Request</span>
                            </>
                        )}
                    </Button>
                </motion.div>

                {/* Privacy Note */}
                <p className="text-xs text-center text-neutral-400">
                    By submitting this form, you agree to our{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                    </a>
                    . We never share your data.
                </p>
            </form>
        </div>
    );
}
