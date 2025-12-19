/**
 * Builder for Product-related payloads
 * Keeps test data creation clean and reusable
 */

export const buildCreateProductPayload = (overrides = {}) => {
    return {
        title: "BMW Pencil",
        price: 10,
        description: "Premium quality pencil",
        category: "stationery",
        brand: "BMW",
        stock: 100,
        ...overrides
    };
};

export const buildUpdateProductPayload = (overrides = {}) => {
    return {
        title: "Updated Product Title",
        ...overrides
    };
};
