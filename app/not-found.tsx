import Link from "next/link";

/* ===========================================
   ROOT 404 NOT FOUND PAGE
   Custom 404 page with premium animations
   =========================================== */

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans antialiased overflow-hidden">
        <div className="min-h-screen flex items-center justify-center px-4 relative">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Orbs */}
            <div
              className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
              style={{
                background: "linear-gradient(135deg, #1E4DB7 0%, #6366F1 100%)",
                top: "10%",
                left: "10%",
                animation: "float1 12s ease-in-out infinite",
              }}
            />
            <div
              className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
              style={{
                background: "linear-gradient(135deg, #F59A23 0%, #E86A1D 100%)",
                bottom: "10%",
                right: "10%",
                animation: "float2 15s ease-in-out infinite",
              }}
            />
            <div
              className="absolute w-64 h-64 rounded-full blur-3xl opacity-10"
              style={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                top: "50%",
                right: "30%",
                animation: "float3 10s ease-in-out infinite",
              }}
            />

            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #1E4DB7 1px, transparent 1px),
                  linear-gradient(to bottom, #1E4DB7 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                animation: "grid-move 20s linear infinite",
              }}
            />
          </div>

          {/* Main Content */}
          <div className="max-w-2xl w-full text-center relative z-10">
            {/* Animated 404 Text */}
            <div className="relative mb-8">
              {/* Large 404 Background */}
              <div
                className="text-[12rem] md:text-[16rem] font-bold leading-none select-none"
                style={{
                  background: "linear-gradient(135deg, #1E4DB7 0%, #6366F1 50%, #8B5CF6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  opacity: 0.1,
                  animation: "fade-in 0.8s ease-out forwards",
                }}
              >
                404
              </div>

              {/* Overlaid 404 with Animation */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  animation: "fade-in-scale 0.6s ease-out 0.2s forwards",
                  opacity: 0,
                }}
              >
                <span
                  className="text-6xl md:text-8xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #1E4DB7 0%, #143A8F 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  404
                </span>
              </div>
            </div>

            {/* Lost Astronaut Illustration (CSS Art) */}
            <div
              className="relative mx-auto w-40 h-40 mb-8"
              style={{
                animation: "float 6s ease-in-out infinite",
              }}
            >
              {/* Astronaut Body */}
              <div className="absolute inset-4 bg-gradient-to-b from-gray-100 to-gray-200 rounded-3xl shadow-lg">
                {/* Helmet */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full border-4 border-gray-300">
                  {/* Visor */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-8 bg-gradient-to-br from-blue-900 to-blue-600 rounded-lg opacity-80">
                    {/* Reflection */}
                    <div className="absolute top-1 left-1 w-3 h-2 bg-white/40 rounded-sm" />
                  </div>
                </div>
                {/* Backpack */}
                <div className="absolute top-4 -right-3 w-8 h-16 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg" />
                {/* Arms */}
                <div
                  className="absolute top-8 -left-6 w-6 h-3 bg-gray-200 rounded-full origin-right"
                  style={{ transform: "rotate(-20deg)" }}
                />
                <div
                  className="absolute top-8 -right-6 w-6 h-3 bg-gray-200 rounded-full origin-left"
                  style={{ transform: "rotate(20deg)" }}
                />
                {/* Legs */}
                <div className="absolute bottom-0 left-4 w-5 h-10 bg-gray-200 rounded-b-full" />
                <div className="absolute bottom-0 right-4 w-5 h-10 bg-gray-200 rounded-b-full" />
              </div>
              {/* Tether */}
              <svg
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-20"
                viewBox="0 0 160 80"
                fill="none"
              >
                <path
                  d="M80 0 Q 40 40, 0 80"
                  stroke="#d1d5db"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                  style={{
                    animation: "dash 2s linear infinite",
                  }}
                />
              </svg>
            </div>

            {/* Error Message */}
            <h1
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{
                animation: "fade-in-up 0.6s ease-out 0.3s forwards",
                opacity: 0,
              }}
            >
              Page Not Found
            </h1>

            <p
              className="text-gray-600 mb-8 text-lg max-w-md mx-auto"
              style={{
                animation: "fade-in-up 0.6s ease-out 0.4s forwards",
                opacity: 0,
              }}
            >
              Looks like you&apos;ve ventured into uncharted territory.
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            {/* Quick Links */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
              style={{
                animation: "fade-in-up 0.6s ease-out 0.5s forwards",
                opacity: 0,
              }}
            >
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #1E4DB7 0%, #143A8F 100%)",
                  boxShadow: "0 4px 15px rgba(30, 77, 183, 0.3)",
                }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-blue-700 font-medium rounded-lg border-2 border-blue-700 transition-all duration-300 hover:bg-blue-700 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contact Us
              </Link>
            </div>

            {/* Suggested Pages */}
            <div
              style={{
                animation: "fade-in-up 0.6s ease-out 0.6s forwards",
                opacity: 0,
              }}
            >
              <p className="text-sm text-gray-500 mb-4">
                Or explore these popular pages:
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  { href: "/services", label: "Services" },
                  { href: "/products", label: "Products" },
                  { href: "/about", label: "About Us" },
                  { href: "/blogs", label: "Blog" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inline Styles for Animations */}
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(-10px) rotate(-3deg);
            }
            50% {
              transform: translateY(10px) rotate(3deg);
            }
          }

          @keyframes float1 {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            33% {
              transform: translateY(-30px) translateX(20px);
            }
            66% {
              transform: translateY(20px) translateX(-10px);
            }
          }

          @keyframes float2 {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(40px) translateX(-30px);
            }
          }

          @keyframes float3 {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-20px) scale(1.1);
            }
          }

          @keyframes grid-move {
            0% {
              transform: translateX(0) translateY(0);
            }
            100% {
              transform: translateX(40px) translateY(40px);
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 0.1;
            }
          }

          @keyframes fade-in-scale {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes dash {
            to {
              stroke-dashoffset: -20;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
