export type UserRole = 'ADMIN' | 'ARTIST' | 'BUYER';

export interface User {
    id: string;
    _id?: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    profileImage?: string;
    bio?: string;
}

export type ArtworkStatus = 'listed' | 'sold' | 'hidden';

export interface Artwork {
    _id: string;
    id?: string;
    title: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    artistId: string | { _id: string; name: string };
    status: ArtworkStatus;
    createdAt: string;
    updatedAt?: string;
    // Computed / convenience
    artistName?: string;
    image?: string;
    medium?: string;
    year?: number;
    tags?: string[];
    views?: number;
}

// Helper to normalize artwork from API response
export function normalizeArtwork(artwork: any): Artwork {
    return {
        ...artwork,
        id: artwork._id || artwork.id,
        image: artwork.imageUrl || artwork.image,
        artistName:
            typeof artwork.artistId === 'object' && artwork.artistId?.name
                ? artwork.artistId.name
                : artwork.artistName || 'Unknown Artist',
    };
}

export interface OrderItem {
    artworkId: string;
    title: string;
    price: number;
    image: string;
}

export interface Order {
    _id?: string;
    id?: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    createdAt: string;
}

export interface Collection {
    id: string;
    userId: string;
    name: string;
    artworkIds: string[];
    isPublic: boolean;
}
