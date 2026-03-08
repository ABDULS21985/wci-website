"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  MessageCircle,
} from "lucide-react";

/* ===========================================
   ROOT ERROR PAGE
   Handles errors at the app root level
   =========================================== */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Root error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans antialiased">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-lg w-full text-center">
            {/* Animated Error Illustration */}
            <div className="relative mx-auto w-32 h-32 mb-10">
              {/* Outer pulsing ring */}
              <div
                className="absolute inset-0 rounded-full bg-red-100"
                style={{
                  animation: "pulse-scale 3s ease-in-out infinite",
                }}
              />
              {/* Rotating dashed ring */}
              <div
                className="absolute inset-3 rounded-full border-2 border-dashed border-red-300"
                style={{
                  animation: "spin 30s linear infinite",
                }}
              />
              {/* Inner gradient circle */}
              <div
                className="absolute inset-6 rounded-full flex items-center justify-center shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                  boxShadow: "0 10px 40px rgba(239, 68, 68, 0.4)",
                }}
              >
                <AlertTriangle
                  className="w-10 h-10 text-white"
                  style={{
                    animation: "bounce-subtle 2s ease-in-out infinite",
                  }}
                />
              </div>
            </div>

            {/* Error Content */}
            <h1
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{
                animation: "fade-in-up 0.6s ease-out forwards",
              }}
            >
              Something went wrong!
            </h1>

            <p
              className="text-gray-600 mb-8 text-lg"
              style={{
                animation: "fade-in-up 0.6s ease-out 0.1s forwards",
                opacity: 0,
              }}
            >
              We apologize for the inconvenience. An unexpected error has occurred.
              Our team has been notified and is working to resolve the issue.
            </p>

            {/* Error Details (Production-safe) */}
            {error.digest && (
              <div
                className="mb-8 bg-gray-50 rounded-xl p-4 border border-gray-200"
                style={{
                  animation: "fade-in-up 0.6s ease-out 0.2s forwards",
                  opacity: 0,
                }}
              >
                <p className="text-sm text-gray-500">
                  Error ID: <code className="font-mono text-gray-700">{error.digest}</code>
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              style={{
                animation: "fade-in-up 0.6s ease-out 0.3s forwards",
                opacity: 0,
              }}
            >
              <Button
                onClick={reset}
                variant="primary"
                size="lg"
                leftIcon={<RefreshCw className="w-5 h-5" />}
              >
                Try Again
              </Button>
              <Button
                asChild
                variant="secondary"
                size="lg"
              >
                <Link href="/" className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Go Home
                </Link>
              </Button>
            </div>

            {/* Contact Support */}
            <div
              className="mt-8"
              style={{
                animation: "fade-in-up 0.6s ease-out 0.4s forwards",
                opacity: 0,
              }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Inline Styles for Animations */}
        <style>{`
          @keyframes pulse-scale {
            0%, 100% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.15);
              opacity: 0.3;
            }
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes bounce-subtle {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
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
        `}</style>
      </body>
    </html>
  );
}
