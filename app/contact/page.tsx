import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us | Global Digitalbit Limited",
    description: "Get in touch with Global Digitalbit Limited. Reach our offices in Nigeria (Abuja) and Doha. Contact us for IT consultancy, AI solutions, cybersecurity, and CBDC implementation.",
    openGraph: {
        title: "Contact Global Digitalbit Limited",
        description: "Reach our offices in Nigeria and Doha for world-class IT solutions and consultancy.",
        url: "https://globaldigibit.com/contact",
    },
};

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen pt-20 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-neutral-600">
                        We'd love to hear from you. Reach out to our teams in Nigeria or Doha.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Nigeria Office */}
                    <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 hover:shadow-lg transition-shadow animate-fade-in-up delay-100">
                        <h2 className="text-2xl font-bold text-primary mb-6">Nigeria Headquarter</h2>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <MapPin className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
                                <p className="text-neutral-600">
                                    15 D Yalinga Crescent Off Adedokumbo Ademola Crescent,<br />
                                    Wuse 2, Abuja, Nigeria
                                </p>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-6 w-6 text-primary mr-4 shrink-0" />
                                <p className="text-neutral-600">+234 (0) 816 177 8448</p>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-6 w-6 text-primary mr-4 shrink-0" />
                                <p className="text-neutral-600">connect@globaldigibit.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Doha Office */}
                    <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 hover:shadow-lg transition-shadow animate-fade-in-up delay-200">
                        <h2 className="text-2xl font-bold text-primary mb-6">Doha Office</h2>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <MapPin className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
                                <p className="text-neutral-600">
                                    Level 14, Commercial Bank Plaza,<br />
                                    West Bay, Doha
                                </p>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-6 w-6 text-primary mr-4 shrink-0" />
                                <p className="text-neutral-600">+974 3147 5305</p>
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-6 w-6 text-primary mr-4 shrink-0" />
                                <p className="text-neutral-600">connect@globaldigibit.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
