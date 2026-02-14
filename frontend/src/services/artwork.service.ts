/**
 * Artwork Service
 * Centralized logic for artwork-related API calls.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const artworkService = {
    /**
     * Get all artworks with optional filters
     */
    async getAll(filters?: any) {
        const query = filters ? `?${new URLSearchParams(filters)}` : '';
        const response = await fetch(`${API_URL}/api/artworks${query}`, {
            credentials: 'include',
        });
        return response.json();
    },

    /**
     * Get a single artwork by ID
     */
    async getById(id: string) {
        const response = await fetch(`${API_URL}/api/artworks/${id}`, {
            credentials: 'include',
        });
        return response.json();
    },

    /**
     * Create a new artwork
     */
    async create(data: any) {
        const response = await fetch(`${API_URL}/api/artworks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        return response.json();
    },

    /**
     * Update an existing artwork
     */
    async update(id: string, data: any) {
        const response = await fetch(`${API_URL}/api/artworks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        return response.json();
    },

    /**
     * Delete an artwork
     */
    async delete(id: string) {
        const response = await fetch(`${API_URL}/api/artworks/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        return response.json();
    }
};
