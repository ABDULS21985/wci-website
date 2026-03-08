"use client";

import { useState } from "react";

type Variant = "particles" | "orbs" | "gradient" | "mesh";
type Intensity = "subtle" | "medium" | "intense";

interface AnimatedBackgroundProps {
  variant?: Variant;
  intensity?: Intensity;
  className?: string;
  showGrid?: boolean;
}

const intensityConfig = {
  subtle: {
    orbCount: 3,
    particleCount: 15,
    opacity: 0.3,
    blur: "60px",
    speed: 30,
  },
  medium: {
    orbCount: 5,
    particleCount: 25,
    opacity: 0.5,
    blur: "40px",
    speed: 20,
  },
  intense: {
    orbCount: 7,
    particleCount: 40,
    opacity: 0.7,
    blur: "24px",
    speed: 15,
  },
};

// Floating Orbs Component
function FloatingOrbs({ intensity }: { intensity: Intensity }) {
  const config = intensityConfig[intensity];
  const orbs = Array.from({ length: config.orbCount }, (_, i) => i);

  const orbStyles = [
    { size: 288, color: "rgb(168, 85, 247)", top: "0%", left: "0%", delay: 0 },
    { size: 384, color: "rgb(59, 130, 246)", top: "25%", right: "0%", delay: 1 },
    { size: 320, color: "rgb(236, 72, 153)", bottom: "0%", left: "25%", delay: 2 },
    { size: 256, color: "rgb(6, 182, 212)", bottom: "25%", right: "25%", delay: 3 },
    { size: 224, color: "rgb(99, 102, 241)", top: "50%", left: "50%", delay: 4 },
    { size: 192, color: "rgb(139, 92, 246)", top: "33%", left: "33%", delay: 5 },
    { size: 240, color: "rgb(217, 70, 239)", bottom: "33%", right: "33%", delay: 6 },
  ];

  return (
    <>
      {orbs.map((i) => {
        const style = orbStyles[i % orbStyles.length];
        return (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${style.size}px`,
              height: `${style.size}px`,
              backgroundColor: style.color,
              top: style.top,
              left: style.left,
              right: style.right,
              bottom: style.bottom,
              filter: `blur(${config.blur})`,
              opacity: config.opacity,
              animationDelay: `${style.delay}s`,
              animationDuration: `${config.speed}s`,
            }}
          />
        );
      })}
    </>
  );
}

// Particles Component
function Particles({ intensity }: { intensity: Intensity }) {
  const config = intensityConfig[intensity];

  // Use lazy initialization with useState to generate random values once on mount
  // This avoids the impure function warning with useMemo
  const [particleStyles] = useState(() =>
    Array.from({ length: config.particleCount }, () => ({
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 10,
    }))
  );

  return (
    <>
      {particleStyles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            bottom: "-10px",
            opacity: config.opacity * 0.6,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </>
  );
}

// Gradient Component
function GradientBackground({ intensity }: { intensity: Intensity }) {
  const config = intensityConfig[intensity];

  return (
    <>
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-gradient-shift"
        style={{
          opacity: config.opacity,
          backgroundSize: "200% 200%",
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-tr from-pink-900/50 via-transparent to-cyan-900/50 animate-gradient-shift"
        style={{
          opacity: config.opacity * 0.7,
          backgroundSize: "200% 200%",
          animationDirection: "reverse",
        }}
      />
    </>
  );
}

// Mesh Component
function MeshBackground({ intensity }: { intensity: Intensity }) {
  const config = intensityConfig[intensity];

  const meshStyles = [
    { width: "50%", height: "50%", top: "-10%", left: "-10%", color: "rgba(139, 92, 246, 0.8)", delay: 0 },
    { width: "60%", height: "60%", top: "50%", right: "-20%", color: "rgba(59, 130, 246, 0.8)", delay: -5 },
    { width: "45%", height: "45%", bottom: "-10%", left: "20%", color: "rgba(236, 72, 153, 0.8)", delay: -10 },
    { width: "40%", height: "40%", top: "30%", left: "40%", color: "rgba(34, 211, 238, 0.6)", delay: -15 },
  ];

  return (
    <div className="absolute inset-0" style={{ opacity: config.opacity, filter: "blur(60px)" }}>
      {meshStyles.map((mesh, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: mesh.width,
            height: mesh.height,
            top: mesh.top,
            left: mesh.left,
            right: mesh.right,
            bottom: mesh.bottom,
            background: `radial-gradient(circle, ${mesh.color} 0%, transparent 70%)`,
            animationDelay: `${mesh.delay}s`,
            animationDuration: `${config.speed + i * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

// Grid Overlay Component
function GridOverlay({ intensity }: { intensity: Intensity }) {
  const config = intensityConfig[intensity];

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, ${config.opacity * 0.1}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, ${config.opacity * 0.1}) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  );
}

export function AnimatedBackground({
  variant = "orbs",
  intensity = "medium",
  className = "",
  showGrid = false,
}: AnimatedBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Base dark background */}
      <div className="absolute inset-0 bg-gray-950" />

      {/* Variant-specific background */}
      {variant === "orbs" && <FloatingOrbs intensity={intensity} />}
      {variant === "particles" && (
        <>
          <GradientBackground intensity={intensity} />
          <Particles intensity={intensity} />
        </>
      )}
      {variant === "gradient" && <GradientBackground intensity={intensity} />}
      {variant === "mesh" && <MeshBackground intensity={intensity} />}

      {/* Optional grid overlay */}
      {showGrid && <GridOverlay intensity={intensity} />}

      {/* Noise texture overlay for premium feel */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export default AnimatedBackground;
