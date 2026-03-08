import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api-client";
import type {
  Service,
  ServiceCategory,
  TrainingCategory,
  TrainingProgram,
} from "@/types";

// =============================================================================
// Query Keys
// =============================================================================

export const serviceKeys = {
  all: ["services"] as const,
  lists: () => [...serviceKeys.all, "list"] as const,
  list: (filters?: ServiceFilters) => [...serviceKeys.lists(), filters] as const,
  details: () => [...serviceKeys.all, "detail"] as const,
  detail: (id: string) => [...serviceKeys.details(), id] as const,
  bySlug: (slug: string) => [...serviceKeys.all, "slug", slug] as const,
  categories: () => [...serviceKeys.all, "categories"] as const,
  category: (id: string) => [...serviceKeys.categories(), id] as const,
  training: () => [...serviceKeys.all, "training"] as const,
  trainingCategory: (id: string) => [...serviceKeys.training(), id] as const,
};

// =============================================================================
// Types
// =============================================================================

export interface ServiceFilters {
  search?: string;
  categoryId?: string;
  page?: number;
  pageSize?: number;
}

export interface ServicesResponse {
  services: Service[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ServiceCategoriesResponse {
  categories: ServiceCategory[];
  total: number;
}

export interface TrainingCategoriesResponse {
  categories: TrainingCategory[];
  total: number;
}

// =============================================================================
// Services Hooks
// =============================================================================

/**
 * Fetch all services with optional filters
 */
export function useServices(filters?: ServiceFilters) {
  return useQuery({
    queryKey: serviceKeys.list(filters),
    queryFn: () =>
      apiGet<ServicesResponse>("/services", {
        page: filters?.page,
        pageSize: filters?.pageSize,
        search: filters?.search,
        categoryId: filters?.categoryId,
      }),
  });
}

/**
 * Fetch a single service by ID
 */
export function useService(id: string) {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: () => apiGet<Service>(`/services/${id}`),
    enabled: !!id,
  });
}

/**
 * Fetch a single service by slug
 */
export function useServiceBySlug(slug: string) {
  return useQuery({
    queryKey: serviceKeys.bySlug(slug),
    queryFn: () => apiGet<Service>(`/services/slug/${slug}`),
    enabled: !!slug,
  });
}

/**
 * Fetch all service categories
 */
export function useServiceCategories() {
  return useQuery({
    queryKey: serviceKeys.categories(),
    queryFn: () => apiGet<ServiceCategoriesResponse>("/services/categories"),
  });
}

/**
 * Fetch a single service category by ID
 */
export function useServiceCategory(id: string) {
  return useQuery({
    queryKey: serviceKeys.category(id),
    queryFn: () => apiGet<ServiceCategory>(`/services/categories/${id}`),
    enabled: !!id,
  });
}

// =============================================================================
// Training Hooks
// =============================================================================

/**
 * Fetch all training categories
 */
export function useTrainingCategories() {
  return useQuery({
    queryKey: serviceKeys.training(),
    queryFn: () => apiGet<TrainingCategoriesResponse>("/training/categories"),
  });
}

/**
 * Fetch a single training category by ID
 */
export function useTrainingCategory(id: string) {
  return useQuery({
    queryKey: serviceKeys.trainingCategory(id),
    queryFn: () => apiGet<TrainingCategory>(`/training/categories/${id}`),
    enabled: !!id,
  });
}

/**
 * Fetch training programs by category
 */
export function useTrainingPrograms(categoryId?: string) {
  return useQuery({
    queryKey: [...serviceKeys.training(), "programs", categoryId] as const,
    queryFn: () =>
      apiGet<TrainingProgram[]>("/training/programs", {
        categoryId,
      }),
  });
}
