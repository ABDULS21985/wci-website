"use client";

import { ShieldCheck, Globe, Users } from "lucide-react";

export function AboutUsSection() {
    return (
        <section className="w-full py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
                <h2 className="text-sm font-bold tracking-wide text-primary uppercase mb-3">About Us</h2>
                <h3 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-8">
                    We believe in not just offering technology solutions
                </h3>
                <p className="text-lg text-neutral-600 mb-16 leading-relaxed">
                    Digibit is a technology and cybersecurity company operating across Doha and Nigeria, delivering mission-critical digital systems for governments, regulators, and enterprises in emerging and advanced markets.
                </p>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                    <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-primary/20 transition-colors">
                        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>
                        <h4 className="text-xl font-bold text-neutral-900 mb-3">Our Core Values</h4>
                        <p className="text-neutral-600">Innovation, Reliability, Integrity, Teamwork.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-primary/20 transition-colors">
                        <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-6">
                            <Globe className="h-6 w-6 text-purple-600" />
                        </div>
                        <h4 className="text-xl font-bold text-neutral-900 mb-3">Our Vision</h4>
                        <p className="text-neutral-600">To create a connected and prosperous future by empowering individuals and businesses through innovative technology.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-primary/20 transition-colors">
                        <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-6">
                            <Users className="h-6 w-6 text-orange-600" />
                        </div>
                        <h4 className="text-xl font-bold text-neutral-900 mb-3">Our Mission</h4>
                        <p className="text-neutral-600">To deliver cutting-edge technology solutions, exceptional service, and foster a culture of innovation.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
