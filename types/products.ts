export interface ProductFeature {
    icon: string;
    title: string;
    description: string;
}

export interface ProductUseCase {
    title: string;
    description: string;
}

export interface Product {
    id: string;
    name: string;
    tagline: string;
    description: string;
    features: ProductFeature[];
    useCases: ProductUseCase[];
    valuePropositions: string[];
    image: string;
    accentColor: string;
}

export interface ProductPreview {
    id: string;
    name: string;
    tagline: string;
    shortDescription: string;
    image: string;
    slug: string;
}
