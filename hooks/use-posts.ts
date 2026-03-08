import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGet, apiPost } from "@/lib/api-client";
import type {
  BlogPost,
  BlogPostPreview,
  BlogPostsResponse,
  BlogPostFilters,
  BlogCategoriesResponse,
  BlogTagsResponse,
} from "@/types";

// =============================================================================
// Query Keys
// =============================================================================

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (filters: BlogPostFilters) => [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (slug: string) => [...postKeys.details(), slug] as const,
  categories: () => [...postKeys.all, "categories"] as const,
  tags: () => [...postKeys.all, "tags"] as const,
  related: (slug: string) => [...postKeys.all, "related", slug] as const,
};

// =============================================================================
// Posts Hooks
// =============================================================================

/**
 * Fetch all posts with optional filters
 */
export function usePosts(filters?: BlogPostFilters) {
  return useQuery({
    queryKey: postKeys.list(filters || {}),
    queryFn: () =>
      apiGet<BlogPostsResponse>("/blog/posts", {
        page: filters?.page,
        pageSize: filters?.pageSize,
        categorySlug: filters?.categorySlug,
        tagSlug: filters?.tagSlug,
        search: filters?.search,
        sortBy: filters?.sortBy,
        sortOrder: filters?.sortOrder,
      }),
  });
}

/**
 * Fetch a single post by slug
 */
export function usePost(slug: string) {
  return useQuery({
    queryKey: postKeys.detail(slug),
    queryFn: () => apiGet<BlogPost>(`/blog/posts/${slug}`),
    enabled: !!slug,
  });
}

/**
 * Fetch related posts for a given post
 */
export function useRelatedPosts(slug: string, limit = 3) {
  return useQuery({
    queryKey: postKeys.related(slug),
    queryFn: () =>
      apiGet<BlogPostPreview[]>(`/blog/posts/${slug}/related`, { limit }),
    enabled: !!slug,
  });
}

/**
 * Fetch all blog categories
 */
export function useCategories() {
  return useQuery({
    queryKey: postKeys.categories(),
    queryFn: () => apiGet<BlogCategoriesResponse>("/blog/categories"),
  });
}

/**
 * Fetch all blog tags
 */
export function useTags() {
  return useQuery({
    queryKey: postKeys.tags(),
    queryFn: () => apiGet<BlogTagsResponse>("/blog/tags"),
  });
}

// =============================================================================
// Mutations
// =============================================================================

interface NewsletterSubscription {
  email: string;
  name?: string;
}

/**
 * Subscribe to newsletter
 */
export function useNewsletterSubscription() {
  return useMutation({
    mutationFn: (data: NewsletterSubscription) =>
      apiPost<{ success: boolean }>("/newsletter/subscribe", data),
    onSuccess: () => {
      // Optionally invalidate related queries
    },
  });
}

/**
 * Increment post view count
 */
export function useIncrementPostViews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) =>
      apiPost<{ viewsCount: number }>(`/blog/posts/${slug}/view`),
    onSuccess: (data, slug) => {
      // Update the post in cache with new view count
      queryClient.setQueryData<BlogPost>(postKeys.detail(slug), (old) => {
        if (old) {
          return { ...old, viewsCount: data.viewsCount };
        }
        return old;
      });
    },
  });
}
