# 📝 Mega-Blog

A modern, full-featured blog application built with React and Appwrite backend-as-a-service. This project demonstrates a complete blog platform with user authentication, post management, rich text editing, and image handling.

![Blog Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![Appwrite](https://img.shields.io/badge/Appwrite-Backend-red)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## ✨ Features

### 🔐 Authentication System
- **User Registration** - Sign up with email and password
- **Secure Login/Logout** - JWT-based authentication via Appwrite
- **Protected Routes** - Authentication required for post management
- **User Session Management** - Persistent login state

### 📄 Blog Management
- **Create Posts** - Rich text editor with TinyMCE integration
- **Edit Posts** - Full CRUD operations for authenticated users
- **Delete Posts** - Remove posts with confirmation
- **Image Upload** - Support for post featured images
- **Post Status** - Active/inactive post management

### 🎨 User Experience
- **Clean UI** - Modern design with Tailwind CSS
- **Loading States** - Smooth user experience with proper loading indicators
- **Error Handling** - Graceful error messages and fallbacks
- **Image Optimization** - Proper image handling and fallbacks
- **SEO-Friendly** - Clean URLs and proper HTML structure

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **React Router v6** - Client-side routing and navigation
- **Redux Toolkit** - State management for authentication
- **React Hook Form** - Form handling and validation
- **Tailwind CSS** - Utility-first CSS framework
- **TinyMCE** - Rich text editor for blog content
- **Vite** - Fast build tool and development server

### Backend & Services
- **Appwrite** - Backend-as-a-Service platform
  - Authentication service
  - Database management
  - File storage and management
  - Real-time capabilities

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Git** - Version control

## 📁 Project Structure

```
megablog/
├── public/                 # Static assets
├── src/
│   ├── appwrite/          # Appwrite services
│   │   ├── auth.js        # Authentication service
│   │   └── config.js      # Database and storage service
│   ├── components/        # Reusable React components
│   │   ├── Header.jsx     # Navigation header
│   │   ├── Footer.jsx     # Site footer
│   │   ├── Login.jsx      # Login form
│   │   ├── Signup.jsx     # Registration form
│   │   ├── Postform.jsx   # Post creation/editing form
│   │   ├── Postcard.jsx   # Post preview card
│   │   ├── Button.jsx     # Reusable button component
│   │   ├── Input.jsx      # Form input component
│   │   ├── Select.jsx     # Dropdown select component
│   │   ├── RTE.jsx        # Rich text editor wrapper
│   │   ├── Container.jsx  # Layout container
│   │   ├── Logo.jsx       # Brand logo component
│   │   ├── Logout.jsx     # Logout button
│   │   └── Authlayout.jsx # Protected route wrapper
│   ├── pages/             # Page components
│   │   ├── home.jsx       # Homepage with post listings
│   │   ├── login.jsx      # Login page
│   │   ├── signup.jsx     # Registration page
│   │   ├── addpost.jsx    # Create new post page
│   │   ├── editpost.jsx   # Edit existing post page
│   │   ├── post.jsx       # Individual post view
│   │   └── allpost.jsx    # All posts listing page
│   ├── store/             # Redux store configuration
│   │   ├── store.js       # Store setup
│   │   └── authSlice.js   # Authentication state slice
│   ├── conf/              # Configuration files
│   │   └── conf.js        # Environment variables
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Application entry point
├── .env                   # Environment variables (not in repo)
├── .env.example           # Environment variables template
└── package.json           # Dependencies and scripts
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Appwrite account and project

### 1. Clone the Repository
```bash
git clone https://github.com/Shreyas-Mohan/Mega-Blog.git
cd Mega-Blog
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

### 4. Appwrite Setup
1. Create an Appwrite project
2. Set up database with a collection for posts
3. Configure storage bucket for images
4. Set up authentication settings
5. Update environment variables with your Appwrite credentials

### 5. TinyMCE Setup
1. Get a free API key from [TinyMCE](https://www.tiny.cloud/)
2. Add the API key to your environment variables

### 6. Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:5173`


## 📞 Support

If you have any questions or need help with the project, feel free to open an issue in the GitHub repository

---

⭐ If you found this project helpful, please consider giving it a star on GitHub!