// =============================================================================
// Blog System Types
// =============================================================================
// Frontend types for the blog system, based on backend blog entities

// -----------------------------------------------------------------------------
// Enums
// -----------------------------------------------------------------------------

export enum BlogPostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

// -----------------------------------------------------------------------------
// Core Blog Types
// -----------------------------------------------------------------------------

export interface BlogAuthor {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  role?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogCategory {
  id: string;
  parentId?: string | null;
  name: string;
  slug: string;
  color?: string;
  sortOrder?: number;
  isActive?: boolean;
  parent?: BlogCategory | null;
  children?: BlogCategory[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPost {
  id: string;
  authorId: string;
  categoryId?: string | null;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  featuredImage?: string | null;
  status: BlogPostStatus;
  publishedAt?: string | null;
  viewsCount: number;
  readingTime?: number;
  author?: BlogAuthor;
  category?: BlogCategory | null;
  tags?: BlogTag[];
  createdAt?: string;
  updatedAt?: string;
}

// -----------------------------------------------------------------------------
// Preview/List Types
// -----------------------------------------------------------------------------

export interface BlogPostPreview {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  publishedAt?: string | null;
  readingTime?: number;
  author?: BlogAuthor;
  category?: BlogCategory | null;
  tags?: BlogTag[];
}

export interface BlogCategoryPreview {
  id: string;
  name: string;
  slug: string;
  postCount?: number;
}

export interface BlogTagPreview {
  id: string;
  name: string;
  slug: string;
  postCount?: number;
}

// -----------------------------------------------------------------------------
// Component Props Types
// -----------------------------------------------------------------------------

export interface BlogPostCardProps {
  post: BlogPostPreview;
  showAuthor?: boolean;
  showCategory?: boolean;
  showTags?: boolean;
}

export interface BlogPostGridProps {
  posts: BlogPostPreview[];
  layout?: 'grid' | 'list';
  showPagination?: boolean;
}

export interface BlogCategoryListProps {
  categories: BlogCategoryPreview[];
  activeSlug?: string;
}

export interface BlogTagCloudProps {
  tags: BlogTagPreview[];
  maxTags?: number;
}

// -----------------------------------------------------------------------------
// API Response Types
// -----------------------------------------------------------------------------

export interface BlogPostsResponse {
  posts: BlogPostPreview[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface BlogCategoriesResponse {
  categories: BlogCategory[];
  total: number;
}

export interface BlogTagsResponse {
  tags: BlogTag[];
  total: number;
}

// -----------------------------------------------------------------------------
// Filter/Query Types
// -----------------------------------------------------------------------------

export interface BlogPostFilters {
  categorySlug?: string;
  tagSlug?: string;
  authorId?: string;
  status?: BlogPostStatus;
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'publishedAt' | 'viewsCount' | 'title';
  sortOrder?: 'asc' | 'desc';
}

// -----------------------------------------------------------------------------
// BlogGrid Component Types
// -----------------------------------------------------------------------------

export type BlogSortOption = 'latest' | 'popular' | 'trending';
export type BlogViewMode = 'grid' | 'list';

export interface BlogGridProps {
  posts: BlogPost[];
  categories: BlogCategory[];
  showFilters?: boolean;
  showFeatured?: boolean;
  initialCategory?: string;
  className?: string;
}

export interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'compact' | 'featured' | 'list';
  showAuthor?: boolean;
  showCategory?: boolean;
  showReadingTime?: boolean;
  showViews?: boolean;
  className?: string;
}
