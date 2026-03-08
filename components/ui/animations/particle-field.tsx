"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/components/ui/shared/lib/utils";

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
}

interface ParticleFieldProps {
  /** "hero" for full viewport fixed, "section" for contained within parent */
  variant?: "hero" | "section";
  /** Override default particle count (responsive defaults: desktop 60, tablet 30, mobile 15) */
  particleCount?: number;
  /** Particle color - default is brand yellow at 15% opacity */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

const DEFAULT_COLOR = "rgba(255, 230, 59, 0.15)";
const FRAME_INTERVAL = 1000 / 30; // 30fps throttle
const FADE_DURATION = 1000; // 1 second fade in
const MIN_SPEED = 0.2;
const MAX_SPEED = 0.5;
const MIN_SIZE = 1;
const MAX_SIZE = 2;
const PARALLAX_RANGE = 25; // ±25px mouse parallax

function getResponsiveParticleCount(): number {
  if (typeof window === "undefined") return 60;
  const width = window.innerWidth;
  if (width < 640) return 15; // Mobile
  if (width < 1024) return 30; // Tablet
  return 60; // Desktop
}

function createParticle(canvasWidth: number, canvasHeight: number, startAtBottom = false): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: startAtBottom ? canvasHeight + Math.random() * 50 : Math.random() * canvasHeight,
    speed: MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
    size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
    opacity: 0.5 + Math.random() * 0.5, // Varying opacity within particles
  };
}

export function ParticleField({
  variant = "hero",
  particleCount,
  color = DEFAULT_COLOR,
  className,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const fadeProgressRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Track mouse position for parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (typeof window === "undefined") return;
    mousePositionRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion, handleMouseMove]);

  // Main animation loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setup canvas size
    const updateCanvasSize = () => {
      const rect = variant === "hero"
        ? { width: window.innerWidth, height: window.innerHeight }
        : container.getBoundingClientRect();

      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      return { width: rect.width, height: rect.height };
    };

    let dimensions = updateCanvasSize();

    // Initialize particles
    const count = particleCount ?? getResponsiveParticleCount();
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(dimensions.width, dimensions.height, false)
    );

    startTimeRef.current = performance.now();
    setIsVisible(true);

    // Animation function
    const animate = (currentTime: number) => {
      // Throttle to 30fps
      if (currentTime - lastFrameTimeRef.current < FRAME_INTERVAL) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTimeRef.current = currentTime;

      // Calculate fade progress
      const elapsed = currentTime - startTimeRef.current;
      fadeProgressRef.current = Math.min(elapsed / FADE_DURATION, 1);

      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Calculate parallax offset
      const parallaxX = (mousePositionRef.current.x - 0.5) * PARALLAX_RANGE * 2;
      const parallaxY = (mousePositionRef.current.y - 0.5) * PARALLAX_RANGE * 2;

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Move particle upward
        particle.y -= particle.speed;

        // Reset particle if it goes off screen
        if (particle.y < -10) {
          particlesRef.current[index] = createParticle(dimensions.width, dimensions.height, true);
          return;
        }

        // Calculate position with parallax
        const drawX = particle.x + parallaxX;
        const drawY = particle.y + parallaxY;

        // Parse color and apply opacity
        const baseOpacity = fadeProgressRef.current * particle.opacity;
        const finalColor = color.replace(/[\d.]+\)$/, `${baseOpacity * 0.15})`);

        // Draw particle
        ctx.beginPath();
        ctx.arc(drawX, drawY, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = finalColor;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      dimensions = updateCanvasSize();

      // Update particle count on resize if not explicitly set
      if (!particleCount) {
        const newCount = getResponsiveParticleCount();
        const currentCount = particlesRef.current.length;

        if (newCount > currentCount) {
          // Add more particles
          for (let i = currentCount; i < newCount; i++) {
            particlesRef.current.push(createParticle(dimensions.width, dimensions.height, false));
          }
        } else if (newCount < currentCount) {
          // Remove excess particles
          particlesRef.current = particlesRef.current.slice(0, newCount);
        }
      }

      // Reposition particles within new bounds
      particlesRef.current.forEach((particle) => {
        if (particle.x > dimensions.width) {
          particle.x = Math.random() * dimensions.width;
        }
        if (particle.y > dimensions.height) {
          particle.y = Math.random() * dimensions.height;
        }
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [prefersReducedMotion, variant, particleCount, color]);

  // Don't render anything if reduced motion is preferred
  if (prefersReducedMotion) {
    return null;
  }

  const containerStyles = variant === "hero"
    ? "fixed inset-0 z-[-1] pointer-events-none"
    : "absolute inset-0 z-[-1] pointer-events-none overflow-hidden";

  return (
    <div
      ref={containerRef}
      className={cn(
        containerStyles,
        "transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}

export default ParticleField;
