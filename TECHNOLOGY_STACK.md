# Kinnren Technology Stack

## Frontend Technologies

### Core Framework & Language
- **React 18** - Modern React with functional components and hooks
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server

### Routing & State Management
- **Wouter** - Lightweight client-side routing library
- **TanStack Query (React Query v5)** - Server state management and data fetching
- **React Hook Form** - Efficient form handling with minimal re-renders

### UI Framework & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern, accessible React component library
- **Radix UI** - Headless UI primitives for complex components
- **Lucide React** - Beautiful icon library
- **React Icons** - Additional icon sets including company logos

### UI Components Used
- Cards, Buttons, Inputs, Dialogs, Sheets
- Avatars, Badges, Tooltips, Toasts
- Form components with validation
- Navigation and layout components
- Theme provider for dark/light mode

## Backend Technologies

### Server Framework
- **Express.js** - Fast, minimal web framework for Node.js
- **Node.js** - JavaScript runtime environment

### Database & ORM
- **PostgreSQL** - Robust relational database
- **Drizzle ORM** - Type-safe database toolkit
- **Neon Database** - Serverless PostgreSQL for production

### Authentication & Security
- **Replit Auth (OpenID Connect)** - OAuth-based authentication
- **Passport.js** - Authentication middleware
- **Express Session** - Session management
- **connect-pg-simple** - PostgreSQL session store

### Development Tools
- **tsx** - TypeScript execution environment
- **Drizzle Kit** - Database migration and introspection tool

## Development & Build Tools

### Package Management
- **npm** - Node.js package manager
- **package.json** - Dependency and script management

### Code Quality & Types
- **TypeScript** - Static type checking
- **@types packages** - Type definitions for JavaScript libraries
- **ESBuild** - Fast JavaScript bundler (via Vite)

### Development Workflow
- **Hot Module Replacement (HMR)** - Live code updates during development
- **Workflow automation** - Automated server restart and build processes

## Key Features Implemented

### Authentication System
- Google and Apple OAuth integration
- Session-based authentication with PostgreSQL storage
- Protected routes and authentication guards
- Login/logout functionality with proper redirects

### UI/UX Features
- Responsive design for all device sizes
- Dark/light theme support with custom color themes
- Logo color extraction for brand consistency
- Toast notifications for user feedback
- Loading states and skeleton screens

### Family Platform Features
- Family tree visualization and management
- Photo sharing with album organization
- Event planning and RSVP system
- Real-time chat messaging
- Family outings booking system
- Private family social networking

### Database Schema
- Users, families, and family memberships
- Photos, albums, and media management
- Events and RSVP tracking
- Chat messages and communication
- Posts, reactions, and comments
- Notifications system

## Architecture Patterns

### Frontend Architecture
- Component-based architecture with reusable UI components
- Custom hooks for business logic and state management
- Protected routes with authentication guards
- Centralized API client with error handling

### Backend Architecture
- RESTful API design with Express routes
- Repository pattern with storage abstraction
- Session-based authentication with database persistence
- Database schema with proper relationships and constraints

### Development Best Practices
- Type-safe development with TypeScript
- Component composition over inheritance
- Separation of concerns between UI and business logic
- Consistent error handling and user feedback
- Responsive design with mobile-first approach

## Environment & Deployment

### Environment Variables
- Database connection strings
- Authentication secrets and tokens
- Session management configuration
- Development/production environment flags

### Database Management
- Schema versioning with Drizzle migrations
- Automated database pushing for development
- Proper indexing and relationships
- Session storage in PostgreSQL

This technology stack provides a modern, scalable foundation for the Kinnren family social networking platform with emphasis on type safety, performance, and user experience.