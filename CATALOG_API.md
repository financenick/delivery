# Catalog API Contract

## Categories

```ts
type CategoryDto = {
  id: string
  slug: string
  name: string
  sortOrder: number
  isActive: boolean
}
```

Notes:
- `id` is a stable identifier used by the frontend for navigation and grouping.
- `slug` is a human-readable identifier for admin URLs and future SEO-friendly routes.
- `sortOrder` controls the display order in the category bar and sections.
- `isActive` allows hiding categories without deleting them from the database.

## Products

```ts
type ProductDto = {
  id: string
  slug: string
  name: string
  description: string | null
  details: string | null
  weight: string
  price: number
  badge: string | null
  imageUrl: string | null
  categoryId: string
  sortOrder: number
  isActive: boolean
}
```

Notes:
- `categoryId` must reference an existing category.
- `price` is returned as an integer in rubles.
- `imageUrl` should be a direct URL to an image file; the API should not embed image binaries in JSON.
- `description`, `details`, `badge`, and `imageUrl` are nullable to simplify admin filling.
- `sortOrder` controls the order inside a category.
- `isActive` allows disabling a product without deleting it.

## Endpoints

- `GET /categories`
- `GET /products`

Current frontend behavior:
- If `VITE_API_BASE_URL` is configured, the app requests `${VITE_API_BASE_URL}/categories` and `${VITE_API_BASE_URL}/products`.
- If the API is unavailable, the app falls back to mock data.
