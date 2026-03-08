/**
 * Sound Manager - Web Audio API based sound system
 *
 * Features:
 * - OFF by default (opt-in only)
 * - Uses Web Audio API for synthesized sounds (no external files needed)
 * - Max 15% volume for subtle, professional audio
 * - Only initializes AudioContext after user gesture (click/tap)
 * - Respects user's reduced motion preferences
 *
 * Sound Catalog:
 * - click: 80ms - Short percussive tap for buttons
 * - hover: 50ms - Gentle high-frequency whisper for hover states
 * - switch: 120ms - Dual-tone for toggle switches
 * - success: 300ms - Pleasant ascending chord
 * - error: 250ms - Soft descending tone
 */

// ============================================================================
// Types
// ============================================================================

export type SoundName = "click" | "hover" | "switch" | "success" | "error";

export interface SoundConfig {
  duration: number; // in milliseconds
  frequencies: number[]; // base frequencies in Hz
  type: OscillatorType;
  attack: number; // attack time in seconds
  decay: number; // decay time in seconds
  volume: number; // relative volume (0-1), will be scaled by MAX_VOLUME
}

// ============================================================================
// Constants
// ============================================================================

/** Maximum volume - 15% as per specification */
const MAX_VOLUME = 0.15;

/** Sound configurations for each sound type */
const SOUND_CATALOG: Record<SoundName, SoundConfig> = {
  click: {
    duration: 80,
    frequencies: [800, 1200],
    type: "sine",
    attack: 0.001,
    decay: 0.08,
    volume: 0.6,
  },
  hover: {
    duration: 50,
    frequencies: [1400],
    type: "sine",
    attack: 0.001,
    decay: 0.05,
    volume: 0.3,
  },
  switch: {
    duration: 120,
    frequencies: [600, 900],
    type: "sine",
    attack: 0.01,
    decay: 0.11,
    volume: 0.5,
  },
  success: {
    duration: 300,
    frequencies: [523.25, 659.25, 783.99], // C5, E5, G5 - Major chord
    type: "sine",
    attack: 0.02,
    decay: 0.28,
    volume: 0.5,
  },
  error: {
    duration: 250,
    frequencies: [440, 349.23], // A4, F4 - Descending
    type: "sine",
    attack: 0.01,
    decay: 0.24,
    volume: 0.4,
  },
};

// ============================================================================
// Sound Manager Class
// ============================================================================

class SoundManager {
  private audioContext: AudioContext | null = null;
  private isInitialized = false;
  private isEnabled = false;
  private masterGainNode: GainNode | null = null;

  /**
   * Initialize the AudioContext after user gesture
   * Must be called on first user interaction (click/tap)
   */
  public initialize(): boolean {
    if (this.isInitialized) return true;

    try {
      // Check for reduced motion preference
      if (typeof window !== "undefined") {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        // Don't initialize sounds if user prefers reduced motion
        if (prefersReducedMotion) {
          console.log("SoundManager: Disabled due to reduced motion preference");
          return false;
        }
      }

      // Create AudioContext (requires user gesture)
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (!AudioContextClass) {
        console.warn("SoundManager: Web Audio API not supported");
        return false;
      }

      this.audioContext = new AudioContextClass();
      this.masterGainNode = this.audioContext.createGain();
      this.masterGainNode.gain.value = MAX_VOLUME;
      this.masterGainNode.connect(this.audioContext.destination);

      this.isInitialized = true;
      console.log("SoundManager: Initialized successfully");
      return true;
    } catch (error) {
      console.warn("SoundManager: Failed to initialize", error);
      return false;
    }
  }

  /**
   * Enable or disable sound playback
   */
  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;

    // Resume AudioContext if it was suspended
    if (enabled && this.audioContext?.state === "suspended") {
      this.audioContext.resume();
    }
  }

  /**
   * Check if sounds are currently enabled
   */
  public getEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Check if the manager is initialized
   */
  public getInitialized(): boolean {
    return this.isInitialized;
  }

  /**
   * Play a sound from the catalog
   */
  public play(soundName: SoundName): void {
    // Don't play if not enabled or not initialized
    if (!this.isEnabled || !this.isInitialized) return;
    if (!this.audioContext || !this.masterGainNode) return;

    // Resume context if suspended (can happen after tab becomes inactive)
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }

    const config = SOUND_CATALOG[soundName];
    if (!config) {
      console.warn(`SoundManager: Unknown sound "${soundName}"`);
      return;
    }

    this.synthesizeSound(config);
  }

  /**
   * Synthesize a sound using Web Audio API oscillators
   */
  private synthesizeSound(config: SoundConfig): void {
    if (!this.audioContext || !this.masterGainNode) return;

    const now = this.audioContext.currentTime;
    const { frequencies, type, attack, decay, volume } = config;

    // Create oscillators for each frequency
    frequencies.forEach((frequency, index) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.type = type;
      oscillator.frequency.value = frequency;

      // For success sound, stagger the frequencies slightly for a chord effect
      const frequencyOffset = config === SOUND_CATALOG.success ? index * 0.02 : 0;

      // ADSR envelope (Attack, Decay, Sustain=0, Release)
      gainNode.gain.setValueAtTime(0, now + frequencyOffset);
      gainNode.gain.linearRampToValueAtTime(
        volume / frequencies.length,
        now + frequencyOffset + attack
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        now + frequencyOffset + attack + decay
      );

      // Connect: oscillator -> gain -> master gain -> destination
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGainNode!);

      // Start and stop
      oscillator.start(now + frequencyOffset);
      oscillator.stop(now + frequencyOffset + attack + decay + 0.01);

      // Cleanup
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
      };
    });
  }

  /**
   * Cleanup resources
   */
  public dispose(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
      this.masterGainNode = null;
      this.isInitialized = false;
      this.isEnabled = false;
    }
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

/** Singleton instance of SoundManager */
export const soundManager = new SoundManager();

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Play a sound (convenience function)
 * Will only play if sound is enabled and initialized
 */
export function playSound(soundName: SoundName): void {
  soundManager.play(soundName);
}

/**
 * Initialize sound manager (must be called on user gesture)
 */
export function initializeSoundManager(): boolean {
  return soundManager.initialize();
}

/**
 * Get available sound names
 */
export function getSoundNames(): SoundName[] {
  return Object.keys(SOUND_CATALOG) as SoundName[];
}

/**
 * Get sound duration in milliseconds
 */
export function getSoundDuration(soundName: SoundName): number {
  return SOUND_CATALOG[soundName]?.duration ?? 0;
}
