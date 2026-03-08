export { AnimatedSection } from "./animated-section";
export { StaggerContainer, StaggerItem } from "./stagger-container";
export {
  PressEffect,
  HoverLift,
  HoverScale,
  HoverGlow,
  InteractiveCard,
  RippleButton,
  PulseIndicator,
  TypingIndicator,
} from "./micro-interactions";

// Framer Motion based animations
export { PageTransition, PageTransitionWrapper, LoadingBar, useLoading } from "./page-transition";
export {
  ScrollReveal,
  FadeUp,
  FadeIn,
  ScaleIn,
  SlideLeft,
  SlideRight,
} from "./scroll-reveal";
export {
  TextReveal,
  CharacterReveal,
  WordReveal,
  LineReveal,
  HeadingReveal,
} from "./text-reveal";

// Canvas-based animations
export { ParticleField } from "./particle-field";

// Lottie animations
export {
  LottieAnimation,
  type LottieAnimationData,
  type LottieAnimationRef,
  type LottieAnimationProps,
} from "./lottie-animation";
export {
  LottieLoader,
  LottieLoaderOverlay,
  LottieLoaderInline,
  type LottieLoaderSize,
  type LottieLoaderProps,
} from "./lottie-loader";
export {
  useLottieAnimation,
  useReducedMotion,
  useLottieSequence,
  type UseLottieAnimationOptions,
  type UseLottieAnimationReturn,
} from "./use-lottie-animation";
