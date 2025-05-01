# GIVA - Jewelry E-commerce Website

This is a jewelry e-commerce website inspired by Giva.co.

## Features

### Shopping Experience
- Browse products by category
- View detailed product information
- Add products to cart
- Add products to wishlist
- Share products with friends

### Product Display
- Image gallery with navigation
- Product specifications
- Customer reviews
- Related products suggestions

### UI/UX Features
- Loading screens for initial visits
- Skeleton loading components for dynamic content
- Responsive design for all device sizes
- Smooth transitions and animations

## Tech Stack

- Next.js
- React
- TypeScript
- Redux for state management
- TailwindCSS for styling

## Loading States

The website features different types of loading states:

1. **First Visit Global Loading**: Shows a loading screen with a progress bar when a user visits the site for the first time.

2. **Skeleton Loading Components**: Displays placeholder UI while content is being loaded, providing a smoother user experience. Different skeleton components are used for:
   - Product cards
   - Product detail pages
   - Category displays

To reset the first visit experience (for testing):
```js
// Run in browser console
localStorage.removeItem('hasVisitedBefore');
```

## Development

### Setup

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm run start
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
