"use client";

import { useEffect, useRef, useCallback, RefObject } from "react";

/**
 * Focus Trap Hook for Modals and Dialogs
 * Traps keyboard focus within a container element for accessibility.
 * Essential for modal dialogs to meet WCAG 2.1 AA requirements.
 *
 * @example
 * function Modal({ isOpen, onClose }) {
 *   const { containerRef, firstFocusableRef } = useFocusTrap(isOpen);
 *
 *   return (
 *     <div ref={containerRef} role="dialog" aria-modal="true">
 *       <button ref={firstFocusableRef} onClick={onClose}>Close</button>
 *       <p>Modal content here</p>
 *     </div>
 *   );
 * }
 */

interface UseFocusTrapOptions {
    /** Whether to restore focus to the previously focused element when trap is deactivated */
    restoreFocus?: boolean;
    /** Whether to auto-focus the first focusable element */
    autoFocus?: boolean;
    /** Callback when escape key is pressed */
    onEscape?: () => void;
}

interface UseFocusTrapReturn {
    /** Ref to attach to the container element */
    containerRef: RefObject<HTMLDivElement | null>;
    /** Ref for the first focusable element (optional, for custom focus) */
    firstFocusableRef: RefObject<HTMLElement | null>;
}

const FOCUSABLE_SELECTORS = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    'audio[controls]',
    'video[controls]',
    'summary',
].join(',');

export function useFocusTrap(
    isActive: boolean,
    options: UseFocusTrapOptions = {}
): UseFocusTrapReturn {
    const { restoreFocus = true, autoFocus = true, onEscape } = options;

    const containerRef = useRef<HTMLDivElement>(null);
    const firstFocusableRef = useRef<HTMLElement>(null);
    const previouslyFocusedRef = useRef<HTMLElement | null>(null);

    const getFocusableElements = useCallback(() => {
        if (!containerRef.current) return [];
        return Array.from(
            containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
        ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
    }, []);

    // Handle Tab key navigation
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (!isActive || !containerRef.current) return;

        // Handle Escape key
        if (event.key === 'Escape' && onEscape) {
            event.preventDefault();
            onEscape();
            return;
        }

        // Only trap Tab key
        if (event.key !== 'Tab') return;

        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        // Shift+Tab on first element -> go to last
        if (event.shiftKey && activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
            return;
        }

        // Tab on last element -> go to first
        if (!event.shiftKey && activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
            return;
        }

        // If focus is outside container, bring it back
        if (!containerRef.current.contains(activeElement as Node)) {
            event.preventDefault();
            firstElement.focus();
        }
    }, [isActive, getFocusableElements, onEscape]);

    // Set up focus trap
    useEffect(() => {
        if (!isActive) return;

        // Store currently focused element for restoration
        if (restoreFocus) {
            previouslyFocusedRef.current = document.activeElement as HTMLElement;
        }

        // Auto-focus first element or custom ref
        if (autoFocus) {
            requestAnimationFrame(() => {
                if (firstFocusableRef.current) {
                    firstFocusableRef.current.focus();
                } else {
                    const focusableElements = getFocusableElements();
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                }
            });
        }

        // Add keyboard listener
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);

            // Restore focus when trap is deactivated
            if (restoreFocus && previouslyFocusedRef.current) {
                previouslyFocusedRef.current.focus();
            }
        };
    }, [isActive, autoFocus, restoreFocus, getFocusableElements, handleKeyDown]);

    return { containerRef, firstFocusableRef };
}

interface FocusTrapProps {
    /** Whether the focus trap is active */
    active: boolean;
    /** Children to render inside the trap */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
    /** Called when escape key is pressed */
    onEscape?: () => void;
    /** Whether to restore focus when deactivated */
    restoreFocus?: boolean;
    /** Whether to auto-focus first element */
    autoFocus?: boolean;
    /** ARIA role for the container */
    role?: string;
    /** ARIA label for the container */
    ariaLabel?: string;
    /** ID of the element that labels the container */
    ariaLabelledBy?: string;
    /** Whether this is a modal dialog */
    ariaModal?: boolean;
}

/**
 * Focus Trap Component
 * Wrapper component that traps focus within its children.
 *
 * @example
 * <FocusTrap
 *   active={isModalOpen}
 *   onEscape={closeModal}
 *   role="dialog"
 *   ariaLabel="Confirmation dialog"
 *   ariaModal
 * >
 *   <div className="modal">
 *     <h2>Are you sure?</h2>
 *     <button onClick={closeModal}>Cancel</button>
 *     <button onClick={confirm}>Confirm</button>
 *   </div>
 * </FocusTrap>
 */
export function FocusTrap({
    active,
    children,
    className = "",
    onEscape,
    restoreFocus = true,
    autoFocus = true,
    role,
    ariaLabel,
    ariaLabelledBy,
    ariaModal,
}: FocusTrapProps) {
    const { containerRef } = useFocusTrap(active, {
        restoreFocus,
        autoFocus,
        onEscape,
    });

    return (
        <div
            ref={containerRef}
            className={className}
            role={role}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-modal={ariaModal}
        >
            {children}
        </div>
    );
}
