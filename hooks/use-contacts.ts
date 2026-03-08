import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/lib/api-client";

// =============================================================================
// Query Keys
// =============================================================================

export const contactKeys = {
  all: ["contacts"] as const,
  submissions: () => [...contactKeys.all, "submissions"] as const,
  submission: (id: string) => [...contactKeys.submissions(), id] as const,
};

// =============================================================================
// Types
// =============================================================================

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  source?: string;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  id?: string;
}

export interface QuoteRequestData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceType: string;
  budget?: string;
  timeline?: string;
  description: string;
}

export interface DemoRequestData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  companySize?: string;
  productInterest: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}

export interface NewsletterData {
  email: string;
  name?: string;
  interests?: string[];
}

// =============================================================================
// Contact Mutations
// =============================================================================

/**
 * Submit contact form
 */
export function useContactForm() {
  return useMutation({
    mutationFn: (data: ContactFormData) =>
      apiPost<ContactSubmissionResponse>("/contact/submit", data),
  });
}

/**
 * Submit quote request
 */
export function useQuoteRequest() {
  return useMutation({
    mutationFn: (data: QuoteRequestData) =>
      apiPost<ContactSubmissionResponse>("/contact/quote", data),
  });
}

/**
 * Submit demo request
 */
export function useDemoRequest() {
  return useMutation({
    mutationFn: (data: DemoRequestData) =>
      apiPost<ContactSubmissionResponse>("/contact/demo", data),
  });
}

/**
 * Subscribe to newsletter
 */
export function useNewsletterSignup() {
  return useMutation({
    mutationFn: (data: NewsletterData) =>
      apiPost<ContactSubmissionResponse>("/newsletter/subscribe", data),
  });
}

/**
 * Unsubscribe from newsletter
 */
export function useNewsletterUnsubscribe() {
  return useMutation({
    mutationFn: (email: string) =>
      apiPost<ContactSubmissionResponse>("/newsletter/unsubscribe", { email }),
  });
}

// =============================================================================
// Support Request Hooks
// =============================================================================

export interface SupportRequestData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  issueType: string;
  priority: "low" | "medium" | "high" | "urgent";
  subject: string;
  description: string;
  productId?: string;
}

/**
 * Submit support request
 */
export function useSupportRequest() {
  return useMutation({
    mutationFn: (data: SupportRequestData) =>
      apiPost<ContactSubmissionResponse>("/support/request", data),
  });
}

// =============================================================================
// Feedback Hooks
// =============================================================================

export interface FeedbackData {
  type: "bug" | "feature" | "improvement" | "other";
  subject: string;
  description: string;
  email?: string;
  rating?: number;
  page?: string;
}

/**
 * Submit feedback
 */
export function useFeedback() {
  return useMutation({
    mutationFn: (data: FeedbackData) =>
      apiPost<ContactSubmissionResponse>("/feedback/submit", data),
  });
}
