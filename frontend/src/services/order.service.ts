/**
 * Order Service
 * Centralized logic for order-related API calls.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const orderService = {
    /**
     * Create a new order
     */
    async create(data: any) {
        const response = await fetch(`${API_URL}/api/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        return response.json();
    },

    /**
     * Get current user's orders
     */
    async getMyOrders() {
        const response = await fetch(`${API_URL}/api/orders/me`, {
            credentials: 'include',
        });
        return response.json();
    },

    /**
     * Get a specific order by ID
     */
    async getById(id: string) {
        const response = await fetch(`${API_URL}/api/orders/${id}`, {
            credentials: 'include',
        });
        return response.json();
    },

    /**
     * Update order status (Admin/Artist only)
     */
    async updateStatus(id: string, status: string) {
        const response = await fetch(`${API_URL}/api/orders/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ status }),
        });
        return response.json();
    }
};
