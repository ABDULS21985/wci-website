"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { X, Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";

// ============================================
// TYPES
// ============================================

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ============================================
// CONSTANTS
// ============================================

const STORAGE_KEY = "websummit-promo-dismissed";
const EVENT_DATE = new Date("2026-02-01T09:00:00+03:00"); // Feb 1, 2026 - Qatar timezone (AST/GMT+3)
const EVENT_END_DATE = new Date("2026-02-04T23:59:59+03:00"); // Feb 4, 2026

// ============================================
// HOOKS
// ============================================

function useCountdown(targetDate: Date): CountdownTime {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setCountdown(calculateTimeLeft());

    const timer = setInterval(() => {
      setCountdown(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return countdown;
}

// ============================================
// SUBCOMPONENTS
// ============================================

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-white tabular-nums min-w-[2ch] inline-block text-center">
          {String(value).padStart(2, "0")}
        </span>
        {/* Pulse effect on change */}
        <span className="absolute inset-0 bg-white/20 rounded animate-ping opacity-0" />
      </div>
      <span className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  );
}

function QatarFlag() {
  return (
    <svg
      viewBox="0 0 28 16"
      className="w-6 h-4 sm:w-7 sm:h-4 rounded-sm overflow-hidden shadow-sm"
      aria-label="Qatar flag"
    >
      {/* Qatar flag - maroon with white serrated edge */}
      <rect width="28" height="16" fill="#8D1B3D" />
      <polygon
        points="0,0 11,0 7,1.78 11,3.56 7,5.33 11,7.11 7,8.89 11,10.67 7,12.44 11,14.22 7,16 0,16"
        fill="white"
      />
    </svg>
  );
}

function WebSummitLogo() {
  return (
    <div className="flex items-center gap-1.5">
      {/* Simplified Web Summit inspired logo mark */}
      <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-orange to-secondary-yellow rounded-lg" />
        <span className="relative text-xs sm:text-sm font-black text-white">W</span>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function WebSummitPromo() {
  const [isDismissed, setIsDismissed] = useState(true); // Start hidden to prevent flash
  const [isVisible, setIsVisible] = useState(false);
  const [isEventActive, setIsEventActive] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const countdown = useCountdown(EVENT_DATE);

  // Check localStorage and event dates on mount
  useEffect(() => {
    const now = new Date();
    const eventHasEnded = now > EVENT_END_DATE;

    // Don't show banner if event has ended
    if (eventHasEnded) {
      setIsDismissed(true);
      return;
    }

    // Check if event is currently active (between start and end)
    const eventIsActive = now >= EVENT_DATE && now <= EVENT_END_DATE;
    setIsEventActive(eventIsActive);

    // Check localStorage for dismissal
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const dismissedTime = new Date(dismissed);
      const hoursSinceDismissal = (now.getTime() - dismissedTime.getTime()) / (1000 * 60 * 60);

      // Reset dismissal after 24 hours
      if (hoursSinceDismissal > 24) {
        localStorage.removeItem(STORAGE_KEY);
        setIsDismissed(false);
      } else {
        setIsDismissed(true);
      }
    } else {
      setIsDismissed(false);
    }
  }, []);

  // Animate in after mount
  useEffect(() => {
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500); // Delay for page load
      return () => clearTimeout(timer);
    }
  }, [isDismissed]);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsDismissed(true);
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    }, 300); // Wait for exit animation
  }, []);

  // Don't render if dismissed
  if (isDismissed) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      className={`fixed left-0 right-0 z-40 transition-all duration-500 ease-out top-[64px] sm:top-[80px] ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
      role="banner"
      aria-label="Web Summit Qatar 2026 Promotion"
    >
      {/* Main Banner */}
      <div className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-secondary" />

        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-orange/20 to-transparent animate-shimmer-slide"
          style={{ backgroundSize: "200% 100%" }}
        />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Glowing orbs */}
        <div className="absolute -left-20 -top-20 w-40 h-40 bg-accent-orange/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-secondary-yellow/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        {/* Content - Make entire banner clickable */}
        <Link
          href="/websummit-qatar-2026"
          className="relative z-10 block container mx-auto px-4 py-3 sm:py-3.5 cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Left: Event Info */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Logo & Flag */}
              <div className="hidden sm:flex items-center gap-2">
                <WebSummitLogo />
                <div className="w-px h-6 bg-white/20" />
                <QatarFlag />
              </div>

              {/* Event Details */}
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                {/* Mobile: Compact layout */}
                <div className="flex items-center gap-2 sm:hidden">
                  <WebSummitLogo />
                  <QatarFlag />
                </div>

                <div className="flex items-center gap-1.5 text-white">
                  <Sparkles className="w-4 h-4 text-secondary-yellow animate-pulse" />
                  <span className="text-sm sm:text-base font-semibold">
                    {isEventActive ? "We're at" : "Meet us at"} Web Summit Qatar 2026
                  </span>
                </div>

                <div className="hidden md:flex items-center gap-3 text-white/70">
                  <span className="w-px h-4 bg-white/20" />
                  <div className="flex items-center gap-1.5 text-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Feb 1-4</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Booth A5-35</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Countdown (Desktop) */}
            {!isEventActive && (
              <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-xs text-white/60 uppercase tracking-wider font-medium">
                  Starts in
                </span>
                <div className="flex items-center gap-2">
                  <CountdownUnit value={countdown.days} label="Days" />
                  <span className="text-white/40 text-lg font-light">:</span>
                  <CountdownUnit value={countdown.hours} label="Hrs" />
                  <span className="text-white/40 text-lg font-light">:</span>
                  <CountdownUnit value={countdown.minutes} label="Min" />
                  <span className="text-white/40 text-lg font-light hidden sm:inline">:</span>
                  <div className="hidden sm:block">
                    <CountdownUnit value={countdown.seconds} label="Sec" />
                  </div>
                </div>
              </div>
            )}

            {/* Event Active Badge */}
            {isEventActive && (
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-400/30">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-sm font-medium text-green-300">Event is Live!</span>
              </div>
            )}

            {/* Right: CTA & Dismiss */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile countdown */}
              {!isEventActive && (
                <div className="flex lg:hidden items-center gap-1.5 text-xs text-white/70">
                  <span className="font-medium text-white">{countdown.days}d</span>
                  <span>{countdown.hours}h</span>
                  <span>{countdown.minutes}m</span>
                </div>
              )}

              {/* CTA Button - Visual only since entire banner is clickable */}
              <span
                className="group relative inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-accent-orange to-secondary-yellow hover:from-accent-red hover:to-accent-orange text-white rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold shadow-lg shadow-accent-orange/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent-orange/40 overflow-hidden"
              >
                <span className="relative z-10">
                  {isEventActive ? "Visit Us" : "Book a Meeting"}
                </span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </span>
            </div>
          </div>
        </Link>

        {/* Dismiss Button - Outside the link to prevent navigation */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDismiss();
          }}
          className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-6 z-20 p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-primary"
          aria-label="Dismiss promotion banner"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-orange/60 to-transparent" />
      </div>
    </div>
  );
}

// ============================================
// ALTERNATIVE: FLOATING CARD OVERLAY (Option B)
// ============================================

export function WebSummitPromoCard() {
  const [isDismissed, setIsDismissed] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const countdown = useCountdown(EVENT_DATE);

  useEffect(() => {
    const now = new Date();
    if (now > EVENT_END_DATE) {
      setIsDismissed(true);
      return;
    }

    const dismissed = localStorage.getItem(STORAGE_KEY + "-card");
    if (!dismissed) {
      setIsDismissed(false);
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsDismissed(true);
      localStorage.setItem(STORAGE_KEY + "-card", new Date().toISOString());
    }, 300);
  }, []);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-sm transition-all duration-500 ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-8 opacity-0 scale-95"
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary via-primary to-secondary shadow-2xl shadow-primary/30 border border-white/10">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/10 via-transparent to-secondary-yellow/10" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all z-10"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <WebSummitLogo />
            <QatarFlag />
            <span className="text-xs font-medium text-accent-orange uppercase tracking-wider">
              Coming Soon
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2">
            Web Summit Qatar 2026
          </h3>
          <p className="text-sm text-white/60 mb-4">
            Meet Digibit Global Solutions at Booth A5-35. Discover our AI, Blockchain & Cybersecurity solutions.
          </p>

          {/* Event details */}
          <div className="flex items-center gap-4 mb-5 text-sm text-white/70">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-accent-orange" />
              <span>Feb 1-4, 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-secondary-yellow" />
              <span>Doha</span>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white/5 border border-white/10 mb-5">
            <CountdownUnit value={countdown.days} label="Days" />
            <span className="text-white/30">:</span>
            <CountdownUnit value={countdown.hours} label="Hours" />
            <span className="text-white/30">:</span>
            <CountdownUnit value={countdown.minutes} label="Mins" />
            <span className="text-white/30">:</span>
            <CountdownUnit value={countdown.seconds} label="Secs" />
          </div>

          {/* CTA */}
          <Link
            href="/websummit-qatar-2026"
            className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-accent-orange to-secondary-yellow hover:from-accent-red hover:to-accent-orange text-white rounded-full py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent-orange/30"
          >
            Learn More
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WebSummitPromo;
