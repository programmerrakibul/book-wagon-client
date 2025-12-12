# 📚 BookWagon

A modern, full-stack online bookstore platform built with React, offering a
seamless book browsing and purchasing experience with role-based access control.

## 🌐 Live URL

[BookWagon Live Site](https://your-live-url-here.com)

## 📖 Purpose

BookWagon is designed to provide a comprehensive online bookstore solution where
users can browse, purchase, and manage books. The platform supports three user
roles (Admin, Librarian, and Member) with distinct functionalities, making it
suitable for both individual readers and book management professionals.

## ✨ Key Features

### For All Users

- 🔐 **Authentication System** - Secure login/registration with Firebase
  Authentication
- 📚 **Book Browsing** - Browse extensive book collection with search and
  filtering
- 🔍 **Advanced Search** - Search books by title, author, or category
- 📖 **Book Details** - View comprehensive book information with reviews
- 💬 **Comments & Reviews** - Read and post book reviews
- ❤️ **Wishlist** - Save favorite books for later
- 🛒 **Shopping Cart** - Easy order placement with secure checkout
- 📱 **Responsive Design** - Fully optimized for mobile, tablet, and desktop

### For Members

- 📦 **Order Management** - Track order status and history
- 💳 **Payment Integration** - Secure payment processing with Stripe
- 🧾 **Invoice History** - View all payment invoices
- 👤 **Profile Management** - Update personal information
<!-- - 📊 **Dashboard** - Personal overview with statistics -->

### For Librarians

- ➕ **Add Books** - Add new books to the collection
- ✏️ **Edit Books** - Update book information
- 📚 **My Books** - Manage personal book inventory
- 📦 **Order Management** - View and manage orders for their books
- 📊 **Analytics** - Track sales and performance metrics

### For Admins

- 👥 **User Management** - Manage user roles and permissions
- 📚 **Book Management** - Full control over all books in the system
- 📦 **Order Oversight** - Monitor all orders across the platform
<!-- - 📊 **Dashboard** - Comprehensive analytics and statistics -->
- 🔧 **System Configuration** - Platform-wide settings management

## 🛠️ NPM Packages Used

### Core Dependencies

- **react** (^19.2.0) - UI library
- **react-dom** (^19.2.0) - React DOM rendering
- **react-router** (^7.10.1) - Client-side routing
- **vite** (^7.2.4) - Build tool and dev server

### UI & Styling

- **@mui/material** (^7.3.6) - Material-UI components for tables
- **daisyui** (^5.5.8) - Tailwind CSS component library
- **tailwindcss** (^4.1.17) - Utility-first CSS framework
- **react-icons** (^5.5.0) - Icon library
- **swiper** (^12.0.3) - Modern slider/carousel
<!-- - **framer-motion** - Animation library
- **gsap** - Animation library for advanced effects -->

### Data Management

- **@tanstack/react-query** (^5.90.12) - Data fetching and caching
- **axios** (^1.13.2) - HTTP client
- **react-hook-form** (^7.68.0) - Form validation and management

### Authentication & Backend

- **firebase** (^12.6.0) - Authentication and backend services

### UI Enhancements

- **date-fns** (^4.1.0) - Date formatting and manipulation
- **sonner** (^2.0.7) - Toast notifications
- **sweetalert2** (^11.26.4) - Beautiful alert modals
<!-- - **react-spinners** (^0.17.0) - Loading spinners -->
- **react-leaflet** (^5.0.0-rc.2) - Interactive maps
- **leaflet** (^1.9.4) - Map library

### Development Tools

- **eslint** (^9.39.1) - Code linting
- **@vitejs/plugin-react** (^5.1.1) - React plugin for Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/programmerrakibul/book-wagon-client.git
cd book-wagon-client
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your environment
   variables

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=your_backend_api_url
```

4. Start the development server

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## 🎨 Design Features

- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Dark Mode Support** - DaisyUI theme system
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliant components
- **Performance Optimized** - Code splitting and lazy loading

## 🔒 Security Features

- Firebase Authentication
- Protected routes based on user roles
- Secure API endpoints
- Input validation and sanitization
- XSS protection

## 👨‍💻 Author

**Your Name**

- GitHub: [@programmerrakibul](https://github.com/programmerrakibul)
- Email: rakibul00206@gmail.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Material-UI for beautiful components
- DaisyUI for the component library
- All open-source contributors

---

Made with ❤️ by Md. Rakibul Islam
