"use client";

import { useState, useEffect, useRef, useId } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Plus, MessageCircle, ArrowRight } from "lucide-react";

interface FaqItem {
    questionKey: string;
    answerKey: string;
}

const faqItems: FaqItem[] = [
    {
        questionKey: "questions.services1.question",
        answerKey: "questions.services1.answer",
    },
    {
        questionKey: "questions.services2.question",
        answerKey: "questions.services2.answer",
    },
    {
        questionKey: "questions.training.question",
        answerKey: "questions.training.answer",
    },
    {
        questionKey: "questions.gettingStarted.question",
        answerKey: "questions.gettingStarted.answer",
    },
    {
        questionKey: "questions.international.question",
        answerKey: "questions.international.answer",
    },
    {
        questionKey: "questions.different.question",
        answerKey: "questions.different.answer",
    },
];

export function FaqsSection() {
    const t = useTranslations("faqs");
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [animatedItems, setAnimatedItems] = useState<number[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const uniqueId = useId();

    // Intersection Observer for entrance animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        // Stagger the entrance animations like terminal printing
                        faqItems.forEach((_, index) => {
                            setTimeout(() => {
                                setAnimatedItems((prev) => [...prev, index]);
                            }, 80 * index); // 0.08s stagger
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleFaq(index);
        }
    };

    // Create translated FAQ data
    const faqs = faqItems.map((item) => ({
        question: t(item.questionKey),
        answer: t(item.answerKey),
    }));

    return (
        <section
            ref={sectionRef}
            className="w-full py-20 md:py-32 bg-[#F8FAFC]"
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    {/* Kicker */}
                    <span className="inline-block text-sm font-semibold tracking-wider uppercase text-[#1E4DB7] mb-4">
                        FAQ
                    </span>

                    {/* Headline */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                        Common Questions, Clear Answers
                    </h2>

                    {/* Subtext */}
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        {t("cta.subtitle")}
                    </p>
                </div>

                {/* FAQs Accordion - Centered with max-width for readability */}
                <div className="max-w-[850px] mx-auto">
                    <div className="divide-y divide-slate-200">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            const isAnimated = animatedItems.includes(index);
                            const panelId = `faq-panel-${uniqueId}-${index}`;
                            const buttonId = `faq-button-${uniqueId}-${index}`;

                            return (
                                <div
                                    key={index}
                                    className={`transition-all duration-500 ease-out ${
                                        isAnimated
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-5"
                                    }`}
                                    style={{
                                        transitionDelay: isAnimated ? "0ms" : `${index * 80}ms`,
                                    }}
                                >
                                    {/* Accordion Item */}
                                    <div
                                        className={`relative transition-all duration-300 ${
                                            isOpen
                                                ? "border-l-4 border-l-[#1E4DB7] bg-white"
                                                : "border-l-4 border-l-transparent hover:bg-slate-50"
                                        }`}
                                    >
                                        {/* Question Button */}
                                        <button
                                            id={buttonId}
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                            onClick={() => toggleFaq(index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            className="w-full flex items-center justify-between gap-4 py-5 px-4 md:px-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4DB7] focus-visible:ring-offset-2 transition-colors"
                                        >
                                            {/* Question Text */}
                                            <span className="text-base md:text-lg font-semibold text-slate-900 pr-4">
                                                {faq.question}
                                            </span>

                                            {/* Plus/X Icon with rotation */}
                                            <span
                                                className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ease-out ${
                                                    isOpen ? "rotate-45" : "rotate-0"
                                                }`}
                                                aria-hidden="true"
                                            >
                                                <Plus
                                                    className={`w-5 h-5 transition-colors duration-300 ${
                                                        isOpen ? "text-[#1E4DB7]" : "text-slate-400"
                                                    }`}
                                                />
                                            </span>
                                        </button>

                                        {/* Answer Panel with smooth height animation */}
                                        <div
                                            id={panelId}
                                            role="region"
                                            aria-labelledby={buttonId}
                                            className={`grid transition-all duration-300 ease-out ${
                                                isOpen
                                                    ? "grid-rows-[1fr] opacity-100"
                                                    : "grid-rows-[0fr] opacity-0"
                                            }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="px-4 md:px-6 pb-5">
                                                    <p className="text-slate-600 leading-relaxed text-base">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Contact CTA Section */}
                    <div
                        className={`mt-12 md:mt-16 text-center transition-all duration-700 delay-500 ${
                            hasAnimated
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-5"
                        }`}
                    >
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm">
                            <div className="flex flex-col items-center gap-6">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-full bg-[#1E4DB7]/10 flex items-center justify-center">
                                    <MessageCircle className="w-7 h-7 text-[#1E4DB7]" />
                                </div>

                                {/* Text */}
                                <div className="text-center">
                                    <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                                        {t("cta.title")}
                                    </h4>
                                    <p className="text-slate-600">
                                        {t("cta.subtitle")}
                                    </p>
                                </div>

                                {/* CTA Button */}
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E4DB7] hover:bg-[#1a44a3] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#1E4DB7]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E4DB7] focus-visible:ring-offset-2 group"
                                >
                                    <span>{t("cta.button")}</span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
