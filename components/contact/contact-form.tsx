"use client";

import { useState, useEffect, useRef, FormEvent, useId, useMemo } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/shared/components";
import { LiveRegion, SrOnly } from "../ui/accessibility";

interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    subject: string;
    message: string;
    honeypot: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    subject?: string;
    message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

interface InputWrapperProps {
    children: React.ReactNode;
    label: string;
    name: keyof FormErrors;
    required?: boolean;
    icon: React.ElementType;
    errorId: string;
    hintId?: string;
    hintText?: string;
    formData: FormData;
    errors: FormErrors;
    touched: Record<string, boolean>;
    isFieldValid: boolean;
}

function InputWrapper({
    children,
    label,
    name,
    required,
    icon: Icon,
    errorId,
    hintId,
    hintText,
    formData,
    errors,
    touched,
    isFieldValid,
}: InputWrapperProps) {
    return (
        <div className="relative group">
            {hintText && (
                <SrOnly as="span" id={hintId}>
                    {hintText}
                </SrOnly>
            )}
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors z-10">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                {children}
                {isFieldValid && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 animate-scale-in z-10">
                        <CheckCircle className="h-5 w-5" aria-hidden="true" />
                        <SrOnly>Field is valid</SrOnly>
                    </div>
                )}
            </div>
            <label
                htmlFor={name}
                className={`absolute left-12 transition-all duration-200 pointer-events-none z-20 ${
                    formData[name]
                        ? "-top-2.5 text-xs bg-white px-1 text-primary font-medium"
                        : "top-1/2 -translate-y-1/2 text-neutral-500"
                }`}
            >
                {label}
                {required && (
                    <>
                        <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
                        <SrOnly>(required)</SrOnly>
                    </>
                )}
            </label>
            {errors[name] && touched[name] && (
                <p
                    id={errorId}
                    role="alert"
                    className="mt-1.5 text-sm text-red-600 flex items-center gap-1 animate-fade-in"
                >
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    {errors[name]}
                </p>
            )}
        </div>
    );
}

const subjectOptions = [
    { value: "", label: "Select a topic..." },
    { value: "partnership", label: "Partnership Inquiry" },
    { value: "demo", label: "Product Demo Request" },
    { value: "support", label: "Technical Support" },
    { value: "consulting", label: "Consulting Services" },
    { value: "careers", label: "Career Opportunities" },
    { value: "other", label: "Other" },
];

const STORAGE_KEY = "contact_form_draft";

const initialFormData: FormData = {
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    honeypot: "",
};

export function ContactForm() {
    // Use lazy initialization for formData to read from localStorage
    const [formData, setFormData] = useState<FormData>(() => {
        if (typeof window === "undefined") return initialFormData;
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
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
    const lastSubmitRef = useRef(0);

    // Derive showOptionalFields as a computed value instead of using useEffect+setState
    const showOptionalFields = useMemo(() => {
        return Boolean(formData.name && formData.email) || Boolean(formData.phone) || Boolean(formData.company);
    }, [formData.name, formData.email, formData.phone, formData.company]);

    // Generate unique IDs for accessibility
    const formId = useId();
    const formTitleId = `${formId}-title`;
    const formDescId = `${formId}-desc`;
    const statusRegionId = `${formId}-status`;
    const nameErrorId = `${formId}-name-error`;
    const nameHintId = `${formId}-name-hint`;
    const emailErrorId = `${formId}-email-error`;
    const emailHintId = `${formId}-email-hint`;
    const phoneErrorId = `${formId}-phone-error`;
    const companyErrorId = `${formId}-company-error`;
    const subjectErrorId = `${formId}-subject-error`;
    const messageErrorId = `${formId}-message-error`;
    const messageHintId = `${formId}-message-hint`;

    // Auto-save form data
    useEffect(() => {
        if (submitStatus !== "success") {
            const timer = setTimeout(() => {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [formData, submitStatus]);

    const validateField = (name: keyof FormData, value: string): string | undefined => {
        switch (name) {
            case "name":
                if (!value.trim()) return "Name is required";
                if (value.length < 2) return "Name must be at least 2 characters";
                if (value.length > 100) return "Name must be less than 100 characters";
                return undefined;
            case "email":
                if (!value.trim()) return "Email is required";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return "Please enter a valid email address";
                return undefined;
            case "phone":
                if (value && value.length > 50)
                    return "Phone number must be less than 50 characters";
                return undefined;
            case "company":
                if (value && value.length > 100)
                    return "Company name must be less than 100 characters";
                return undefined;
            case "subject":
                if (!value.trim()) return "Subject is required";
                if (value.length < 2) return "Subject must be at least 2 characters";
                if (value.length > 255) return "Subject must be less than 255 characters";
                return undefined;
            case "message":
                if (!value.trim()) return "Message is required";
                if (value.length < 10) return "Message must be at least 10 characters";
                if (value.length > 5000) return "Message must be less than 5000 characters";
                return undefined;
            default:
                return undefined;
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
            if (key === "honeypot") return;
            const error = validateField(key, formData[key]);
            if (error) newErrors[key as keyof FormErrors] = error;
        });
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
            subject: true,
            message: true,
        });

        if (!validateForm()) {
            return;
        }

        setSubmitStatus("loading");
        setSubmitMessage("");

        try {
            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL || "https://api.globaldigibit.com/api/v1";
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
                    subject: formData.subject.trim(),
                    message: formData.message.trim(),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus("success");
                setSubmitMessage("Thank you for your message! We'll get back to you soon.");
                localStorage.removeItem(STORAGE_KEY);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    subject: "",
                    message: "",
                    honeypot: "",
                });
                setTouched({});
            } else if (response.status === 429) {
                setSubmitStatus("error");
                setSubmitMessage("Too many requests. Please wait a moment and try again.");
            } else {
                setSubmitStatus("error");
                setSubmitMessage(data.message || "Something went wrong. Please try again.");
            }
        } catch {
            setSubmitStatus("error");
            setSubmitMessage(
                "Unable to send message. Please check your connection and try again."
            );
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
        return touched[name] && !errors[name] && formData[name].trim().length > 0;
    };

    // Helper function to get aria-describedby for inputs
    const getAriaDescribedBy = (fieldName: keyof FormErrors, errorId: string, hintId?: string) => {
        const ids: string[] = [];
        if (errors[fieldName] && touched[fieldName]) {
            ids.push(errorId);
        }
        if (hintId) {
            ids.push(hintId);
        }
        return ids.length > 0 ? ids.join(" ") : undefined;
    };

    if (submitStatus === "success") {
        return (
            <div
                className="relative bg-white border border-neutral-200 rounded-2xl p-8 shadow-xl shadow-neutral-200/50"
                role="alert"
                aria-live="polite"
            >
                {/* Premium gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-t-2xl" />

                <div className="text-center py-8">
                    <div className="relative inline-flex items-center justify-center mb-6">
                        <div className="absolute inset-0 bg-green-100 rounded-full motion-safe:animate-ping opacity-75" aria-hidden="true" />
                        <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                            <CheckCircle className="h-10 w-10 text-white" aria-hidden="true" />
                        </div>
                    </div>

                    <h3 className="text-display text-2xl font-bold text-neutral-900 mb-2">
                        Message Sent Successfully!
                    </h3>
                    <p className="text-neutral-500 mb-8">{submitMessage}</p>

                    <div className="bg-neutral-50 rounded-xl p-6 mb-6 border border-neutral-100">
                        <h4 className="font-semibold text-neutral-900 mb-4">
                            What happens next?
                        </h4>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
                            <div className="flex items-center gap-2 text-neutral-600">
                                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                                </div>
                                <span>We review your message</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-neutral-400 hidden md:block" aria-hidden="true" />
                            <div className="flex items-center gap-2 text-neutral-600">
                                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                                </div>
                                <span>Reply within 2-4 hours</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-neutral-400 hidden md:block" aria-hidden="true" />
                            <div className="flex items-center gap-2 text-neutral-600">
                                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                                </div>
                                <span>Start your project</span>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => setSubmitStatus("idle")}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-white"
                    >
                        Send Another Message
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative bg-white border border-neutral-200 rounded-2xl p-8 shadow-xl shadow-neutral-200/50">
            {/* Premium gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent-orange rounded-t-2xl" />

            <div className="mb-8">
                <h2 id={formTitleId} className="text-display text-2xl font-bold text-neutral-900 mb-2">
                    Send Us a Message
                </h2>
                <p id={formDescId} className="text-neutral-500">
                    Fill out the form below and we&apos;ll respond within 2-4 hours.
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

            {submitStatus === "error" && (
                <div
                    role="alert"
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 animate-shake"
                >
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0" aria-hidden="true" />
                    <p className="text-red-800">{submitMessage}</p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
                role="group"
                aria-labelledby={formTitleId}
                aria-describedby={formDescId}
                noValidate
            >
                {/* Honeypot field - hidden from users, catches bots */}
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

                <InputWrapper
                    label="Your Name"
                    name="name"
                    required
                    icon={User}
                    errorId={nameErrorId}
                    hintId={nameHintId}
                    hintText="Enter your full name, minimum 2 characters"
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    isFieldValid={isFieldValid("name")}
                >
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("name")}
                        className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                            errors.name && touched.name
                                ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                                : "border-neutral-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                        }`}
                        disabled={submitStatus === "loading"}
                        aria-required="true"
                        aria-invalid={errors.name && touched.name ? "true" : undefined}
                        aria-describedby={getAriaDescribedBy("name", nameErrorId, nameHintId)}
                        autoComplete="name"
                    />
                </InputWrapper>

                <InputWrapper
                    label="Email Address"
                    name="email"
                    required
                    icon={Mail}
                    errorId={emailErrorId}
                    hintId={emailHintId}
                    hintText="Enter a valid email address in the format name@example.com"
                    formData={formData}
                    errors={errors}
                    touched={touched}
                    isFieldValid={isFieldValid("email")}
                >
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                            errors.email && touched.email
                                ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                                : "border-neutral-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                        }`}
                        disabled={submitStatus === "loading"}
                        aria-required="true"
                        aria-invalid={errors.email && touched.email ? "true" : undefined}
                        aria-describedby={getAriaDescribedBy("email", emailErrorId, emailHintId)}
                        autoComplete="email"
                    />
                </InputWrapper>

                {showOptionalFields && (
                    <div className="grid md:grid-cols-2 gap-5 animate-fade-in-up">
                        <InputWrapper
                            label="Phone Number"
                            name="phone"
                            icon={Phone}
                            errorId={phoneErrorId}
                            formData={formData}
                            errors={errors}
                            touched={touched}
                            isFieldValid={isFieldValid("phone")}
                        >
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={() => handleBlur("phone")}
                                className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 rounded-xl transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                                disabled={submitStatus === "loading"}
                                aria-invalid={errors.phone && touched.phone ? "true" : undefined}
                                aria-describedby={errors.phone && touched.phone ? phoneErrorId : undefined}
                                autoComplete="tel"
                            />
                        </InputWrapper>

                        <InputWrapper
                            label="Company Name"
                            name="company"
                            icon={Building2}
                            errorId={companyErrorId}
                            formData={formData}
                            errors={errors}
                            touched={touched}
                            isFieldValid={isFieldValid("company")}
                        >
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                onBlur={() => handleBlur("company")}
                                className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 rounded-xl transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                                disabled={submitStatus === "loading"}
                                aria-invalid={errors.company && touched.company ? "true" : undefined}
                                aria-describedby={errors.company && touched.company ? companyErrorId : undefined}
                                autoComplete="organization"
                            />
                        </InputWrapper>
                    </div>
                )}

                <div className="relative group">
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors z-10">
                            <HelpCircle className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            onBlur={() => handleBlur("subject")}
                            className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-200 focus:outline-none appearance-none bg-white ${
                                errors.subject && touched.subject
                                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                                    : "border-neutral-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                            }`}
                            disabled={submitStatus === "loading"}
                            aria-required="true"
                            aria-invalid={errors.subject && touched.subject ? "true" : undefined}
                            aria-describedby={errors.subject && touched.subject ? subjectErrorId : undefined}
                        >
                            {subjectOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
                            <svg
                                className="h-5 w-5 text-neutral-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                    <label
                        htmlFor="subject"
                        className={`absolute left-12 transition-all duration-200 pointer-events-none z-20 ${
                            formData.subject
                                ? "-top-2.5 text-xs bg-white px-1 text-primary font-medium"
                                : "top-1/2 -translate-y-1/2 text-neutral-500"
                        }`}
                    >
                        Subject <span className="text-red-500" aria-hidden="true">*</span>
                        <SrOnly>(required)</SrOnly>
                    </label>
                    {errors.subject && touched.subject && (
                        <p
                            id={subjectErrorId}
                            role="alert"
                            className="mt-1.5 text-sm text-red-600 flex items-center gap-1 animate-fade-in"
                        >
                            <AlertCircle className="h-4 w-4" aria-hidden="true" />
                            {errors.subject}
                        </p>
                    )}
                </div>

                <div className="relative group">
                    <SrOnly as="span" id={messageHintId}>
                        Enter your message, minimum 10 characters, maximum 5000 characters
                    </SrOnly>
                    <div className="relative">
                        <div className="absolute left-4 top-4 text-neutral-400 group-focus-within:text-primary transition-colors z-10">
                            <MessageSquare className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onBlur={() => handleBlur("message")}
                            rows={5}
                            className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-200 focus:outline-none resize-none ${
                                errors.message && touched.message
                                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                                    : "border-neutral-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                            }`}
                            disabled={submitStatus === "loading"}
                            aria-required="true"
                            aria-invalid={errors.message && touched.message ? "true" : undefined}
                            aria-describedby={getAriaDescribedBy("message", messageErrorId, messageHintId)}
                        />
                        {isFieldValid("message") && (
                            <div className="absolute right-4 top-4 text-green-500 animate-scale-in z-10">
                                <CheckCircle className="h-5 w-5" aria-hidden="true" />
                                <SrOnly>Field is valid</SrOnly>
                            </div>
                        )}
                    </div>
                    <label
                        htmlFor="message"
                        className={`absolute left-12 transition-all duration-200 pointer-events-none z-20 ${
                            formData.message
                                ? "-top-2.5 text-xs bg-white px-1 text-primary font-medium"
                                : "top-4 text-neutral-500"
                        }`}
                    >
                        Your Message <span className="text-red-500" aria-hidden="true">*</span>
                        <SrOnly>(required)</SrOnly>
                    </label>
                    {errors.message && touched.message && (
                        <p
                            id={messageErrorId}
                            role="alert"
                            className="mt-1.5 text-sm text-red-600 flex items-center gap-1 animate-fade-in"
                        >
                            <AlertCircle className="h-4 w-4" aria-hidden="true" />
                            {errors.message}
                        </p>
                    )}
                    <div className="flex justify-between mt-1.5 text-sm text-neutral-500">
                        <span aria-live="polite">
                            <span aria-hidden="true">{formData.message.length}/5000 characters</span>
                            <SrOnly>{formData.message.length} of 5000 characters used</SrOnly>
                        </span>
                        {formData.message.length >= 10 && (
                            <span className="text-green-600" aria-live="polite">Looks good!</span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-neutral-500 bg-neutral-50 px-4 py-3 rounded-xl border border-neutral-100">
                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span>Average response time: 2-4 hours during business hours</span>
                </div>

                <Button
                    type="submit"
                    disabled={submitStatus === "loading"}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] btn-press"
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
                            <span>Send Message</span>
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}
