# Renting System Frontend

This is the React frontend for the Renting System project, part of a full-stack graduation platform for apartment rentals. It provides a modern, responsive user interface for browsing, searching, and managing apartments, as well as user authentication and profile management.

## Features
- User registration and login
- Browse, search, and filter apartments
- View apartment details and photos
- Save favorite apartments
- User profile management
- Responsive design for desktop and mobile
- Integration with Django REST API backend

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
2. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000) by default.

### Build
To create a production build:
```bash
npm run build
# or
yarn build
```

## Project Structure
- `src/` — Main source code (components, pages, assets, context, etc.)
- `public/` — Static files (index.html, icons, etc.)

## API Integration
- The frontend communicates with the Django backend API (see main project README for endpoints).
- Update API URLs in the code if your backend is running on a different host/port.
- Requires the backend to be running for full functionality.

## License
See the main project [LICENSE](../LICENSE).
