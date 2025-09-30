# RentingSystem

![MIT License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/python-3.10%2B-blue)
![Django](https://img.shields.io/badge/backend-Django%205.0-blue)
![React](https://img.shields.io/badge/frontend-React-blue)

A full-stack apartment rental platform built for graduation, featuring a robust Django REST API backend and a modern React frontend. The system supports user registration, apartment management, secure authentication, and rich documentation. Designed for real-world deployment, it was previously hosted on AWS for public access during development.

---

**Author:** [Mohamed Said](https://github.com/mohamedsaid5/)

**Project Repository:** [Graduation-Project---Renting-System-API](https://github.com/mohamedsaid5/Graduation-Project---Renting-System-API)

---

## Demo
- **Mobile App Demo:**
  - [Download/View mobile-app-demo.mp4](./mobile-app-demo.mp4)
  - (If the file is too large for GitHub preview, you can download it to view.)

## Documentation
- **Project Report:** [Renting system document.pdf](./Renting%20system%20document.pdf)
- **Presentation Slides:** [Renting System_presentation.pptx](./Renting%20System_presentation.pptx)

## API Documentation
- **OpenAPI/Swagger:** [http://localhost:8000/api/docs/swagger/](http://localhost:8000/api/docs/swagger/)
- **ReDoc:** [http://localhost:8000/api/docs/redoc/](http://localhost:8000/api/docs/redoc/)
- **Schema (OpenAPI):** [http://localhost:8000/api/schema/](http://localhost:8000/api/schema/)

---

## Backend Features & API

### Summary
The backend is a secure, scalable REST API built with Django and Django REST Framework. It supports:
- Custom user model (student/owner, avatar, phone, address, etc.)
- Token-based authentication
- Apartment CRUD with owner-only permissions
- Apartment photo uploads
- Saved apartments (favorites)
- Password reset and account deactivation
- Filtering, pagination, and multilingual support
- Full OpenAPI documentation (Swagger, ReDoc)
- CORS enabled for frontend/mobile integration

### Main Endpoints
| Endpoint                                 | Method | Description                                 |
|------------------------------------------|--------|---------------------------------------------|
| `/api/auth/register/`                    | POST   | Register a new user                         |
| `/api/auth/login/`                       | POST   | Obtain auth token (login)                   |
| `/api/profile/`                          | GET    | Get user profile                            |
| `/api/profile/update/`                   | PUT    | Update user profile                         |
| `/api/change-password/`                  | POST   | Change password                             |
| `/api/request-reset-password/`           | POST   | Request password reset email                |
| `/api/password-reset/<uidb64>/<token>/`  | POST   | Reset password                              |
| `/api/deactivate-account/`               | POST   | Deactivate user account                     |
| `/api/apartments/`                       | GET    | List apartments (with filters, pagination)  |
| `/api/apartments/owner-apartments/`      | GET    | List apartments owned by user               |
| `/api/apartments/create/`                | POST   | Create new apartment (owners only)          |
| `/api/apartments/<id>/`                  | GET    | Get apartment details                       |
| `/api/apartments/<id>/update/`           | PUT    | Update apartment (owners only)              |
| `/api/apartments/<id>/delete/`           | DELETE | Delete apartment (owners only)              |
| `/api/apartments/<id>/save/`             | POST   | Save apartment to favorites                 |
| `/api/saved_apartments/<id>/remove/`     | POST   | Remove apartment from favorites             |

### Usage Example
Authenticate with your token:
```http
Authorization: Token <your_token>
```

List apartments with filters:
```http
GET /api/apartments/?min_price=1000&max_rooms=3&page=1
```

See [API Documentation](#api-documentation) for full details and try out endpoints interactively.

---

## Frontend
- The frontend source code is located in the [`Renting-System-Frontend/`](./Renting-System-Frontend/) directory.
- **Note:** The `node_modules/` and `build/` folders are excluded from git to keep the repository size manageable.
- To run the frontend locally:
  1. Navigate to the frontend directory:
     ```bash
     cd Renting-System-Frontend
     ```
  2. Install dependencies:
     ```bash
     npm install
     # or
     yarn install
     ```
  3. Start the development server:
     ```bash
     npm start
     # or
     yarn start
     ```

## Features
- User registration and authentication
- Apartment listing and management
- Apartment photo uploads
- User profile with avatar and address
- Apartment saving (favorites)
- Multilingual support (Arabic/English)
- RESTful API with OpenAPI/Swagger and ReDoc documentation
- Token-based authentication
- Pagination and filtering

## Getting Started

### Prerequisites
- Python 3.10+
- pip
- (Optional) virtualenv

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/mohamedsaid5/Graduation-Project---Renting-System-API.git
   cd Graduation-Project---Renting-System-API
   ```
2. **Create and activate a virtual environment (recommended):**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Apply migrations:**
   ```bash
   python manage.py migrate
   ```
5. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

### Usage
- Access the app at `http://127.0.0.1:8000/`
- Register a new user or log in
- Browse, add, or manage apartments

## Project Structure
- `accounts/` — User management and authentication
- `apartments/` — Apartment listing and management
- `RentingSystem/` — Project settings and configuration
- `Renting-System-Frontend/` — Frontend React application

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

For more projects, visit my [GitHub profile](https://github.com/mohamedsaid5/).

---

## Repository Naming
If you want to rename your GitHub repository, choose a clear and descriptive name, such as `renting-system`, `apartment-rental-platform`, or `fci-graduation-renting-system`. To rename:
1. Go to your repository on GitHub.
2. Click on "Settings".
3. Under "Repository name", enter the new name and save.
4. Update any remote URLs in your local git config if needed:
   ```bash
   git remote set-url origin https://github.com/yourusername/new-repo-name.git
   ```
