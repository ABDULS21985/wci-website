/**
 * Sound Effect Hooks
 *
 * Convenient hooks for adding sound effects to UI components.
 * All sounds are optional and only play when the user has explicitly enabled them.
 *
 * Features:
 * - useSoundEffect: Generic hook for any sound
 * - useClickSound: Returns onClick handler with click sound
 * - useHoverSound: Returns onMouseEnter/onMouseLeave handlers with hover sound
 * - useSwitchSound: For toggle switches and checkboxes
 * - useSuccessSound: For success notifications/actions
 * - useErrorSound: For error notifications/actions
 */

import { useCallback, useMemo } from "react";
import { useSoundOptional } from "../providers/sound-provider";
import type { SoundName } from "../lib/sound-manager";

// ============================================================================
// Types
// ============================================================================

export interface ClickSoundHandler {
  onClick: (event?: React.MouseEvent) => void;
}

export interface HoverSoundHandlers {
  onMouseEnter: (event?: React.MouseEvent) => void;
  onMouseLeave: (event?: React.MouseEvent) => void;
}

export interface InteractiveSoundHandlers extends ClickSoundHandler, HoverSoundHandlers {}

// ============================================================================
// Core Hook
// ============================================================================

/**
 * useSoundEffect - Returns a function to play a specific sound
 *
 * @param soundName - The name of the sound to play
 * @returns A function that plays the sound (does nothing if sounds disabled)
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const playSuccess = useSoundEffect("success");
 *
 *   const handleComplete = () => {
 *     // ... do something
 *     playSuccess();
 *   };
 *
 *   return <button onClick={handleComplete}>Complete</button>;
 * }
 * ```
 */
export function useSoundEffect(soundName: SoundName): () => void {
  const soundContext = useSoundOptional();

  return useCallback(() => {
    soundContext?.playSound(soundName);
  }, [soundContext, soundName]);
}

// ============================================================================
// Click Sound Hook
// ============================================================================

/**
 * useClickSound - Returns an onClick handler that plays a click sound
 *
 * @param callback - Optional callback to run alongside the sound
 * @returns Object with onClick handler
 *
 * @example
 * ```tsx
 * // Basic usage
 * function Button({ children }) {
 *   const { onClick } = useClickSound();
 *   return <button onClick={onClick}>{children}</button>;
 * }
 *
 * // With custom callback
 * function Button({ onClick: onButtonClick, children }) {
 *   const { onClick } = useClickSound(onButtonClick);
 *   return <button onClick={onClick}>{children}</button>;
 * }
 *
 * // Spread into props
 * function Button(props) {
 *   const clickHandlers = useClickSound();
 *   return <button {...props} {...clickHandlers} />;
 * }
 * ```
 */
export function useClickSound(
  callback?: (event?: React.MouseEvent) => void
): ClickSoundHandler {
  const soundContext = useSoundOptional();

  const onClick = useCallback(
    (event?: React.MouseEvent) => {
      soundContext?.playSound("click");
      callback?.(event);
    },
    [soundContext, callback]
  );

  return useMemo(() => ({ onClick }), [onClick]);
}

// ============================================================================
// Hover Sound Hook
// ============================================================================

/**
 * useHoverSound - Returns onMouseEnter/onMouseLeave handlers for hover sounds
 *
 * @param onEnterCallback - Optional callback when mouse enters
 * @param onLeaveCallback - Optional callback when mouse leaves
 * @returns Object with onMouseEnter and onMouseLeave handlers
 *
 * @example
 * ```tsx
 * // Basic usage
 * function InteractiveCard({ children }) {
 *   const hoverHandlers = useHoverSound();
 *   return <div {...hoverHandlers}>{children}</div>;
 * }
 *
 * // With custom callbacks
 * function Card({ onHover, onLeave }) {
 *   const hoverHandlers = useHoverSound(onHover, onLeave);
 *   return <div {...hoverHandlers}>...</div>;
 * }
 * ```
 */
export function useHoverSound(
  onEnterCallback?: (event?: React.MouseEvent) => void,
  onLeaveCallback?: (event?: React.MouseEvent) => void
): HoverSoundHandlers {
  const soundContext = useSoundOptional();

  const onMouseEnter = useCallback(
    (event?: React.MouseEvent) => {
      soundContext?.playSound("hover");
      onEnterCallback?.(event);
    },
    [soundContext, onEnterCallback]
  );

  const onMouseLeave = useCallback(
    (event?: React.MouseEvent) => {
      onLeaveCallback?.(event);
    },
    [onLeaveCallback]
  );

  return useMemo(
    () => ({ onMouseEnter, onMouseLeave }),
    [onMouseEnter, onMouseLeave]
  );
}

// ============================================================================
// Combined Interactive Sound Hook
// ============================================================================

/**
 * useInteractiveSound - Combines click and hover sounds for fully interactive elements
 *
 * @param options - Optional callbacks for click, enter, and leave events
 * @returns Combined handlers for onClick, onMouseEnter, and onMouseLeave
 *
 * @example
 * ```tsx
 * function InteractiveButton({ onClick, children }) {
 *   const handlers = useInteractiveSound({ onClick });
 *   return <button {...handlers}>{children}</button>;
 * }
 * ```
 */
export function useInteractiveSound(options?: {
  onClick?: (event?: React.MouseEvent) => void;
  onMouseEnter?: (event?: React.MouseEvent) => void;
  onMouseLeave?: (event?: React.MouseEvent) => void;
}): InteractiveSoundHandlers {
  const clickHandlers = useClickSound(options?.onClick);
  const hoverHandlers = useHoverSound(
    options?.onMouseEnter,
    options?.onMouseLeave
  );

  return useMemo(
    () => ({
      ...clickHandlers,
      ...hoverHandlers,
    }),
    [clickHandlers, hoverHandlers]
  );
}

// ============================================================================
// Specialized Sound Hooks
// ============================================================================

/**
 * useSwitchSound - Returns a function to play the switch/toggle sound
 *
 * @param callback - Optional callback to run alongside the sound
 * @returns Function that plays switch sound and runs callback
 *
 * @example
 * ```tsx
 * function Toggle({ onChange }) {
 *   const handleChange = useSwitchSound(onChange);
 *   return <input type="checkbox" onChange={handleChange} />;
 * }
 * ```
 */
export function useSwitchSound(
  callback?: (event?: React.ChangeEvent | React.MouseEvent) => void
): (event?: React.ChangeEvent | React.MouseEvent) => void {
  const soundContext = useSoundOptional();

  return useCallback(
    (event?: React.ChangeEvent | React.MouseEvent) => {
      soundContext?.playSound("switch");
      callback?.(event);
    },
    [soundContext, callback]
  );
}

/**
 * useSuccessSound - Returns a function to play the success sound
 *
 * @param callback - Optional callback to run alongside the sound
 * @returns Function that plays success sound and runs callback
 *
 * @example
 * ```tsx
 * function Form() {
 *   const playSuccess = useSuccessSound();
 *
 *   const handleSubmit = async (data) => {
 *     await saveData(data);
 *     playSuccess();
 *   };
 * }
 * ```
 */
export function useSuccessSound(
  callback?: () => void
): () => void {
  const soundContext = useSoundOptional();

  return useCallback(() => {
    soundContext?.playSound("success");
    callback?.();
  }, [soundContext, callback]);
}

/**
 * useErrorSound - Returns a function to play the error sound
 *
 * @param callback - Optional callback to run alongside the sound
 * @returns Function that plays error sound and runs callback
 *
 * @example
 * ```tsx
 * function Form() {
 *   const playError = useErrorSound();
 *
 *   const handleError = (error) => {
 *     console.error(error);
 *     playError();
 *   };
 * }
 * ```
 */
export function useErrorSound(
  callback?: () => void
): () => void {
  const soundContext = useSoundOptional();

  return useCallback(() => {
    soundContext?.playSound("error");
    callback?.();
  }, [soundContext, callback]);
}

// ============================================================================
// Hook for Sound Status
// ============================================================================

/**
 * useSoundStatus - Check if sounds are enabled without throwing
 *
 * @returns Object with isSoundEnabled boolean (false if outside provider)
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isSoundEnabled } = useSoundStatus();
 *
 *   return (
 *     <span>Sounds are {isSoundEnabled ? "on" : "off"}</span>
 *   );
 * }
 * ```
 */
export function useSoundStatus(): { isSoundEnabled: boolean } {
  const soundContext = useSoundOptional();

  return useMemo(
    () => ({
      isSoundEnabled: soundContext?.isSoundEnabled ?? false,
    }),
    [soundContext?.isSoundEnabled]
  );
}
