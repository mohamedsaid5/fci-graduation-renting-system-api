# RentingSystem

![MIT License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/python-3.10%2B-blue)
![Django](https://img.shields.io/badge/backend-Django%205.0-blue)
![React](https://img.shields.io/badge/frontend-React-blue)

A full-stack apartment rental platform built for graduation, featuring a robust Django REST API backend and a modern React frontend. The system supports user registration, apartment management, secure authentication, and rich documentation. Designed for real-world deployment, it was previously hosted on AWS for public access during development.

---

**Author:** [Mohamed Said](https://github.com/mohamedsaid5/)

**Project Repository:** [fci-graduation-renting-system-api](https://github.com/mohamedsaid5/fci-graduation-renting-system-api)

---

## Demo
[![Watch the demo](https://img.youtube.com/vi/1JAAy1-ocmjRGS3hnjEPkUWG-k7y35-8B/0.jpg)](https://drive.google.com/file/d/1JAAy1-ocmjRGS3hnjEPkUWG-k7y35-8B/view?usp=sharing)

> **Note:** Click the image above to watch the demo video on Google Drive. The video is hosted externally for best viewing and performance.

## Documentation
- **Project Report:** [Renting-System-Document.pdf](./Renting-System-Document.pdf)
- **Presentation Slides:** [Renting-System-presentation.pptx](./Renting-System-presentation.pptx)

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
   git clone https://github.com/mohamedsaid5/fci-graduation-renting-system-api.git
   cd fci-graduation-renting-system-api
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
