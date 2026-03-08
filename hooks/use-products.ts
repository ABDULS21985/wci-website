import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api-client";
import type { Product, ProductPreview } from "@/types";

// =============================================================================
// Query Keys
// =============================================================================

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters?: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  bySlug: (slug: string) => [...productKeys.all, "slug", slug] as const,
};

// =============================================================================
// Types
// =============================================================================

export interface ProductFilters {
  search?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

export interface ProductsResponse {
  products: ProductPreview[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// =============================================================================
// Products Hooks
// =============================================================================

/**
 * Fetch all products with optional filters
 */
export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () =>
      apiGet<ProductsResponse>("/products", {
        page: filters?.page,
        pageSize: filters?.pageSize,
        search: filters?.search,
        category: filters?.category,
      }),
  });
}

/**
 * Fetch all product previews (lightweight list)
 */
export function useProductPreviews() {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: () => apiGet<ProductPreview[]>("/products/previews"),
  });
}

/**
 * Fetch a single product by ID
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => apiGet<Product>(`/products/${id}`),
    enabled: !!id,
  });
}

/**
 * Fetch a single product by slug
 */
export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: productKeys.bySlug(slug),
    queryFn: () => apiGet<Product>(`/products/slug/${slug}`),
    enabled: !!slug,
  });
}

/**
 * Fetch featured products
 */
export function useFeaturedProducts(limit = 4) {
  return useQuery({
    queryKey: [...productKeys.all, "featured", limit] as const,
    queryFn: () => apiGet<ProductPreview[]>("/products/featured", { limit }),
  });
}
