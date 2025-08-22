# Next Gadget - Modern E-commerce Store

A cutting-edge e-commerce platform built with Next.js 15, featuring a complete shopping experience for tech gadgets with authentication, product management, and responsive design.

## Live
[Next-Gadget](https://next-gadget-six.vercel.app/)

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with dark/light mode toggle
- **Authentication**: NextAuth.js with Google OAuth and credentials
- **Product Management**: Full CRUD operations for products
- **Shopping Cart**: Add to cart and checkout functionality
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance**: Optimized with Next.js 15 App Router
- **SEO Friendly**: Server-side rendering and meta tags

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **UI Components**: Custom component library
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd next-gadget
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   ```

4. **Database Setup**
   - Make sure MongoDB is running
   - Update the MONGODB_URI with your connection string

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📁 Route Summary

### Public Routes
- `/` - Homepage with featured products
- `/products` - All products listing with pagination
- `/products/[id]` - Individual product details
- `/login` - User authentication
- `/register` - User registration
- `/about` - About page
- `/contact` - Contact information

### Protected Routes (Authentication Required)
- `/dashboard` - User dashboard
- `/add-product` - Add new product (Admin)
- `/edit-product/[id]` - Edit existing product (Admin)
- `/profile` - User profile management
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/orders` - Order history

### API Routes
- `/api/auth/[...nextauth]` - Authentication endpoints
- `/api/products` - Product CRUD operations
- `/api/users` - User management
- `/api/orders` - Order processing
- `/api/upload` - Image upload handling

## 🎨 Customization

### Adding New Pages
1. Create a new folder in `/app` with `page.jsx`
2. Add any necessary components in the folder
3. Update the navigation component if needed

### Styling
- Uses Tailwind CSS for styling
- Custom components in `/components`
- Responsive breakpoints: sm, md, lg, xl, 2xl

### Database Models
- User model with authentication details
- Product model with inventory management
- Order model with transaction history
- Review model for product ratings

