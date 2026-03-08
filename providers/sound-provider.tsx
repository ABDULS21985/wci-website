"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  soundManager,
  initializeSoundManager,
  playSound as playSoundFromManager,
  type SoundName,
} from "../lib/sound-manager";

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = "digibit-sound-enabled";

// ============================================================================
// Types
// ============================================================================

interface SoundContextValue {
  /** Whether sounds are currently enabled */
  isSoundEnabled: boolean;
  /** Toggle sound on/off */
  toggleSound: () => void;
  /** Explicitly set sound enabled state */
  setSoundEnabled: (enabled: boolean) => void;
  /** Play a sound by name (only if sounds are enabled) */
  playSound: (soundName: SoundName) => void;
  /** Whether the sound system has been initialized */
  isInitialized: boolean;
  /** Initialize the sound system (must be called on user gesture) */
  initializeSound: () => void;
}

// ============================================================================
// Context
// ============================================================================

const SoundContext = createContext<SoundContextValue | null>(null);

// ============================================================================
// Provider Component
// ============================================================================

interface SoundProviderProps {
  children: ReactNode;
}

/**
 * SoundProvider - Provides sound functionality to the app
 *
 * Features:
 * - Sound is OFF by default (opt-in only)
 * - Persists user preference in localStorage
 * - Respects prefers-reduced-motion
 * - Only initializes AudioContext after user gesture
 *
 * Usage:
 * ```tsx
 * // In layout.tsx
 * <SoundProvider>
 *   {children}
 * </SoundProvider>
 *
 * // In components
 * const { playSound, toggleSound, isSoundEnabled } = useSound();
 * ```
 */
export function SoundProvider({ children }: SoundProviderProps) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Load saved preference and check system preferences
  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      // Disable sounds if user enables reduced motion
      if (e.matches && isSoundEnabled) {
        setIsSoundEnabled(false);
        soundManager.setEnabled(false);
      }
    };

    motionQuery.addEventListener("change", handleMotionChange);

    // Don't load preference if reduced motion is preferred
    if (!motionQuery.matches) {
      // Load saved preference
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved !== null) {
          const enabled = saved === "true";
          setIsSoundEnabled(enabled);
          soundManager.setEnabled(enabled);
        }
      } catch {
        // localStorage not available
      }
    }

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Initialize sound system on first user interaction
  const initializeSound = useCallback(() => {
    if (!isInitialized && !prefersReducedMotion) {
      const success = initializeSoundManager();
      if (success) {
        setIsInitialized(true);
        // Apply current enabled state
        soundManager.setEnabled(isSoundEnabled);
      }
    }
  }, [isInitialized, prefersReducedMotion, isSoundEnabled]);

  // Set up global click listener to initialize on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      initializeSound();
      // Remove listener after first interaction
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    // Only add listeners if not initialized
    if (!isInitialized && !prefersReducedMotion) {
      document.addEventListener("click", handleFirstInteraction);
      document.addEventListener("keydown", handleFirstInteraction);
      document.addEventListener("touchstart", handleFirstInteraction);
    }

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isInitialized, prefersReducedMotion, initializeSound]);

  // Toggle sound on/off
  const toggleSound = useCallback(() => {
    // Don't allow enabling if reduced motion is preferred
    if (prefersReducedMotion) return;

    // Initialize if not already done
    if (!isInitialized) {
      initializeSound();
    }

    const newEnabled = !isSoundEnabled;
    setIsSoundEnabled(newEnabled);
    soundManager.setEnabled(newEnabled);

    // Persist preference
    try {
      localStorage.setItem(STORAGE_KEY, String(newEnabled));
    } catch {
      // localStorage not available
    }

    // Play a sound to confirm enabling
    if (newEnabled) {
      playSoundFromManager("switch");
    }
  }, [isSoundEnabled, isInitialized, prefersReducedMotion, initializeSound]);

  // Explicitly set sound enabled state
  const setSoundEnabled = useCallback(
    (enabled: boolean) => {
      // Don't allow enabling if reduced motion is preferred
      if (prefersReducedMotion && enabled) return;

      // Initialize if enabling and not already done
      if (enabled && !isInitialized) {
        initializeSound();
      }

      setIsSoundEnabled(enabled);
      soundManager.setEnabled(enabled);

      // Persist preference
      try {
        localStorage.setItem(STORAGE_KEY, String(enabled));
      } catch {
        // localStorage not available
      }
    },
    [isInitialized, prefersReducedMotion, initializeSound]
  );

  // Play a sound
  const playSound = useCallback(
    (soundName: SoundName) => {
      if (isSoundEnabled && isInitialized && !prefersReducedMotion) {
        playSoundFromManager(soundName);
      }
    },
    [isSoundEnabled, isInitialized, prefersReducedMotion]
  );

  const value: SoundContextValue = {
    isSoundEnabled,
    toggleSound,
    setSoundEnabled,
    playSound,
    isInitialized,
    initializeSound,
  };

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

/**
 * useSound - Access sound functionality from context
 *
 * @throws Error if used outside SoundProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { playSound, isSoundEnabled, toggleSound } = useSound();
 *
 *   return (
 *     <button onClick={() => playSound("click")}>
 *       Click me
 *     </button>
 *   );
 * }
 * ```
 */
export function useSound(): SoundContextValue {
  const context = useContext(SoundContext);

  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }

  return context;
}

// ============================================================================
// Optional Hook (doesn't throw if outside provider)
// ============================================================================

/**
 * useSoundOptional - Access sound functionality without requiring provider
 * Returns null if used outside SoundProvider
 *
 * Useful for shared components that may or may not have sound enabled
 */
export function useSoundOptional(): SoundContextValue | null {
  return useContext(SoundContext);
}
