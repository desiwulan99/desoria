# Desoria

Desoria is an e-commerce web application developed as part of the Hands-On Task 2 assignment. Inspired by Shopee, it provides a simple and intuitive shopping experience with features such as product search, category filtering, sorting, and product details, powered by the SISTECH E-Commerce API.

## Tech Stack

- **React** 19.2.7 - UI library
- **Vite** 8.1.1 - Build tool and dev server
- **React Router** 7.18.1 - Client-side routing
- **Lucide React** 0.400.0 - Icon library
- **TypeScript** - Type safety
- **ESLint** - Code quality and consistency

## Features

Aligned with the 6 required frontend concepts from the Hands-On Task 2 brief:

1. **Fetch data from the API**, all requests go through `src/services/api.js` using native `fetch()`, with a `response.ok` check before parsing the JSON.
2. **Data mapping**, the product list, cart items, and skeleton loaders are all rendered using `.map()`.
3. **Search, filter, and sort**, search by product name, filter by category/store/brand, and sort by price (low↔high) and name (A-Z / Z-A), all derived from the API data using `useMemo`.
4. **Conditional UI states**, loading (skeleton), error (with a retry button), and empty state (with a reset-filter button) are handled explicitly and separately on every page that fetches data.
5. **Product detail**, the `/product/:id` page fetches a single product via `fetchProductById()`.
6. **Reusable components**, `Button`, `ProductCard`, `SearchBar`, `EmptyState`, `ErrorState`, `SkeletonLoader`, `Navbar`, and `SidebarCart` are reused across multiple pages.

## API Endpoints Used

Base URL: `https://sistech-ecommerce-api.leficullen.xyz/api`

| Endpoint | Used for |
|---|---|
| `GET /products` | Displaying all products on the homepage |
| `GET /products/:id` | Displaying a single product's detail |
| `GET /stores` | Filtering products by store |
| `GET /brands` | Filtering products by brand |
| `GET /categories` | Filtering products by category |

## A Note on the API

The SISTECH API provided for this hands-on is **read-only** (it only exposes `GET` endpoints — there is no endpoint for creating, updating, or deleting data). Because of this, the **checkout** feature in this app is simulated entirely on the client side using React state via `CartContext` (adding items, updating quantities, removing items, and clearing the cart on checkout), without sending a POST request to any external server.

## Running the Project

```bash
# install dependencies
npm install

# start the development server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

## Folder Structure

```
DESORIA/
├── dist/
├── node_modules/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── logo-d.png
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SidebarCart.jsx
│   │   └── SkeletonLoader.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── CartPage.jsx
│   │   ├── DetailPage.jsx
│   │   └── HomePage.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── format.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

## Deliverables

- **Deployed website:** [_(add your deployment link here)_](https://github.com/desiwulan99/desoria)
- **GitHub repository:** [_(add your public repo link here)_](https://desoria.vercel.app/)