import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "../../components/ui/button";
import { Home, Search, ArrowRight, MessageCircle } from "lucide-react";

/* ===========================================
   LOCALE 404 NOT FOUND PAGE
   Custom 404 page with premium animations
   Integrates with next-intl for translations
   =========================================== */

export default function NotFound() {
  const t = useTranslations("notFound");

  const suggestedPages = [
    { href: "/services", labelKey: "services", icon: "services" },
    { href: "/products", labelKey: "products", icon: "products" },
    { href: "/about", labelKey: "about", icon: "about" },
    { href: "/blogs", labelKey: "blog", icon: "blog" },
    { href: "/contact", labelKey: "contact", icon: "contact" },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-15 bg-gradient-to-r from-primary to-secondary animate-float1 top-[10%] left-[10%]" />
        <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-10 bg-gradient-to-r from-accent-orange to-accent-red animate-float2 bottom-[10%] right-[10%]" />
        <div className="absolute w-64 h-64 rounded-full blur-3xl opacity-10 bg-gradient-to-r from-trustmehub to-trustmehub-dark animate-float3 top-[50%] right-[30%]" />

        {/* Animated Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] animate-grid-move"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--primary) 1px, transparent 1px),
              linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary/30 animate-float-delay-1" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-secondary/30 animate-float-delay-2" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-accent-orange/30 animate-float-delay-3" />
      </div>

      {/* Main Content */}
      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Animated 404 Display */}
        <div className="relative mb-8">
          {/* Large Background 404 */}
          <div className="text-[10rem] md:text-[14rem] font-bold leading-none select-none text-gradient opacity-10 animate-fade-in">
            404
          </div>

          {/* Overlaid 404 with Glow Effect */}
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in-scale delay-200">
            <span className="text-5xl md:text-7xl font-bold text-gradient-primary drop-shadow-lg">
              404
            </span>
          </div>

          {/* Orbiting Elements */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-48 h-48 animate-spin-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-orange shadow-lg shadow-accent-orange/50" />
            </div>
          </div>
        </div>

        {/* Lost in Space Illustration */}
        <div className="relative mx-auto w-32 h-32 mb-8 animate-float">
          {/* Planet */}
          <div className="absolute bottom-0 right-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary shadow-xl shadow-primary/30">
            {/* Planet Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-4 rounded-full border-2 border-primary/30 transform rotate-[-20deg]" />
            {/* Crater */}
            <div className="absolute top-3 right-4 w-3 h-3 rounded-full bg-secondary/50" />
            <div className="absolute bottom-4 left-3 w-2 h-2 rounded-full bg-secondary/40" />
          </div>

          {/* Satellite */}
          <div className="absolute top-0 left-0 w-10 h-10 animate-float-delay-1">
            <div className="w-full h-full relative">
              {/* Body */}
              <div className="absolute inset-2 bg-gradient-to-br from-neutral-light to-surface-3 rounded-lg shadow-md" />
              {/* Solar Panels */}
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-4 h-8 bg-gradient-to-r from-info to-info-dark rounded-sm" />
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-4 h-8 bg-gradient-to-l from-info to-info-dark rounded-sm" />
              {/* Antenna */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-surface-4" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-error animate-pulse" />
            </div>
          </div>

          {/* Stars */}
          <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-secondary-yellow animate-pulse" />
          <div className="absolute top-8 left-8 w-1.5 h-1.5 rounded-full bg-white animate-pulse delay-300" />
          <div className="absolute bottom-8 left-4 w-1 h-1 rounded-full bg-secondary-yellow animate-pulse delay-500" />
        </div>

        {/* Error Message */}
        <h1 className="text-fluid-3xl font-bold text-foreground mb-4 animate-fade-in-up delay-300">
          {t("title", { defaultValue: "Page Not Found" })}
        </h1>

        <p className="text-neutral-gray text-lg mb-8 max-w-md mx-auto animate-fade-in-up delay-400">
          {t("description", {
            defaultValue:
              "Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.",
          })}
        </p>

        {/* Search Suggestion */}
        <div className="mb-8 animate-fade-in-up delay-500">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-1 rounded-full border border-border text-sm text-neutral-gray">
            <Search className="w-4 h-4" />
            <span>{t("searchSuggestion", { defaultValue: "Try searching for what you need" })}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fade-in-up delay-500">
          <Button asChild variant="primary" size="lg" className="press-effect">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              {t("goHome", { defaultValue: "Back to Home" })}
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact" className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {t("contactUs", { defaultValue: "Contact Us" })}
            </Link>
          </Button>
        </div>

        {/* Suggested Pages */}
        <div className="animate-fade-in-up delay-600">
          <p className="text-sm text-neutral-gray mb-4">
            {t("exploreSuggestion", { defaultValue: "Or explore these popular pages:" })}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {suggestedPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group inline-flex items-center gap-2 px-4 py-2 text-sm text-neutral-gray bg-surface-1 rounded-full border border-border hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <span>
                  {t(`pages.${page.labelKey}`, { defaultValue: page.labelKey.charAt(0).toUpperCase() + page.labelKey.slice(1) })}
                </span>
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Decorative Bottom Gradient */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
