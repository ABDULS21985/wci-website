"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";

export interface UseLottieAnimationOptions {
  /** Initial playback speed */
  initialSpeed?: number;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Callback when animation loops */
  onLoopComplete?: () => void;
}

export interface UseLottieAnimationReturn {
  /** Ref to attach to Lottie component */
  lottieRef: React.RefObject<LottieRefCurrentProps | null>;
  /** Play the animation */
  play: () => void;
  /** Pause the animation */
  pause: () => void;
  /** Stop the animation and go to first frame */
  stop: () => void;
  /** Set playback speed (1 = normal, 2 = double, 0.5 = half) */
  setSpeed: (speed: number) => void;
  /** Go to specific frame and play */
  goToAndPlay: (frame: number, isFrame?: boolean) => void;
  /** Go to specific frame and stop */
  goToAndStop: (frame: number, isFrame?: boolean) => void;
  /** Set animation direction (1 = forward, -1 = reverse) */
  setDirection: (direction: 1 | -1) => void;
  /** Get animation duration in seconds or frames */
  getDuration: (inFrames?: boolean) => number | undefined;
  /** Toggle between play and pause */
  togglePlay: () => void;
  /** Play animation from the beginning */
  replay: () => void;
  /** Current playback speed */
  speed: number;
  /** Whether animation is currently playing */
  isPlaying: boolean;
  /** Current playback direction */
  direction: 1 | -1;
}

/**
 * useLottieAnimation Hook
 *
 * A custom hook for programmatic control of Lottie animations.
 * Provides methods to play, pause, stop, and control animation playback.
 *
 * @example
 * // Basic usage
 * const { lottieRef, play, pause, togglePlay } = useLottieAnimation();
 *
 * return (
 *   <div>
 *     <Lottie lottieRef={lottieRef} animationData={myAnimation} />
 *     <button onClick={togglePlay}>Toggle</button>
 *   </div>
 * );
 *
 * @example
 * // With speed control
 * const { lottieRef, setSpeed, speed } = useLottieAnimation({
 *   initialSpeed: 0.5
 * });
 *
 * return (
 *   <div>
 *     <Lottie lottieRef={lottieRef} animationData={myAnimation} />
 *     <input
 *       type="range"
 *       min="0.1"
 *       max="2"
 *       step="0.1"
 *       value={speed}
 *       onChange={(e) => setSpeed(parseFloat(e.target.value))}
 *     />
 *   </div>
 * );
 *
 * @example
 * // With completion callback
 * const { lottieRef, replay } = useLottieAnimation({
 *   onComplete: () => console.log('Animation finished!')
 * });
 */
export function useLottieAnimation(
  options: UseLottieAnimationOptions = {}
): UseLottieAnimationReturn {
  const { initialSpeed = 1, onComplete, onLoopComplete } = options;

  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [speed, setSpeedState] = useState(initialSpeed);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirectionState] = useState<1 | -1>(1);

  // Set initial speed
  useEffect(() => {
    if (lottieRef.current && initialSpeed !== 1) {
      lottieRef.current.setSpeed(initialSpeed);
    }
  }, [initialSpeed]);

  const play = useCallback(() => {
    lottieRef.current?.play();
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    lottieRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const stop = useCallback(() => {
    lottieRef.current?.stop();
    setIsPlaying(false);
  }, []);

  const setSpeed = useCallback((newSpeed: number) => {
    lottieRef.current?.setSpeed(newSpeed);
    setSpeedState(newSpeed);
  }, []);

  const goToAndPlay = useCallback((frame: number, isFrame = true) => {
    lottieRef.current?.goToAndPlay(frame, isFrame);
    setIsPlaying(true);
  }, []);

  const goToAndStop = useCallback((frame: number, isFrame = true) => {
    lottieRef.current?.goToAndStop(frame, isFrame);
    setIsPlaying(false);
  }, []);

  const setDirection = useCallback((newDirection: 1 | -1) => {
    lottieRef.current?.setDirection(newDirection);
    setDirectionState(newDirection);
  }, []);

  const getDuration = useCallback((inFrames = false) => {
    return lottieRef.current?.getDuration(inFrames);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const replay = useCallback(() => {
    lottieRef.current?.goToAndPlay(0, true);
    setIsPlaying(true);
  }, []);

  // Handle animation events
  useEffect(() => {
    const currentRef = lottieRef.current;
    if (!currentRef) return;

    // Note: lottie-react handles these via props, but we track state here
    // The actual event handlers should be passed to the Lottie component
  }, [onComplete, onLoopComplete]);

  return {
    lottieRef,
    play,
    pause,
    stop,
    setSpeed,
    goToAndPlay,
    goToAndStop,
    setDirection,
    getDuration,
    togglePlay,
    replay,
    speed,
    isPlaying,
    direction,
  };
}

/**
 * useReducedMotion Hook
 *
 * Detects if user prefers reduced motion for accessibility.
 *
 * @example
 * const prefersReducedMotion = useReducedMotion();
 *
 * if (prefersReducedMotion) {
 *   return <StaticImage />;
 * }
 * return <LottieAnimation />;
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * useLottieSequence Hook
 *
 * Play a sequence of Lottie segments in order.
 *
 * @example
 * const { playSequence, isSequencePlaying } = useLottieSequence(lottieRef);
 *
 * // Play frames 0-30, then 30-60, then 60-90
 * playSequence([[0, 30], [30, 60], [60, 90]]);
 */
export function useLottieSequence(
  lottieRef: React.RefObject<LottieRefCurrentProps | null>
) {
  const [isSequencePlaying, setIsSequencePlaying] = useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const segmentsRef = useRef<[number, number][]>([]);

  const playSequence = useCallback((segments: [number, number][]) => {
    if (!lottieRef.current || segments.length === 0) return;

    segmentsRef.current = segments;
    setCurrentSegmentIndex(0);
    setIsSequencePlaying(true);

    lottieRef.current.playSegments(segments[0], true);
  }, [lottieRef]);

  const stopSequence = useCallback(() => {
    lottieRef.current?.stop();
    setIsSequencePlaying(false);
    setCurrentSegmentIndex(0);
    segmentsRef.current = [];
  }, [lottieRef]);

  // This would need to be wired to the onComplete callback of the Lottie component
  const handleSegmentComplete = useCallback(() => {
    const nextIndex = currentSegmentIndex + 1;

    if (nextIndex < segmentsRef.current.length) {
      setCurrentSegmentIndex(nextIndex);
      lottieRef.current?.playSegments(segmentsRef.current[nextIndex], true);
    } else {
      setIsSequencePlaying(false);
      setCurrentSegmentIndex(0);
    }
  }, [currentSegmentIndex, lottieRef]);

  return {
    playSequence,
    stopSequence,
    isSequencePlaying,
    currentSegmentIndex,
    handleSegmentComplete,
  };
}

export default useLottieAnimation;
