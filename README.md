# 🚀 Meetly Backend API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white" alt="TypeORM" />
</p>

<p align="center">
  <strong>A powerful and scalable backend API for the Meetly platform</strong><br>
  Built with modern technologies for seamless meeting scheduling and management<br>
  <strong>🚀 Live API: <a href="https://meetly-backend-api.onrender.com">https://meetly-backend-api.onrender.com</a></strong>
</p>

---

## ✨ Features

🎯 **Core Functionality**

- User authentication and authorization with JWT
- Meeting scheduling and management
- Availability management with flexible time slots
- Event type creation and configuration
- Calendar integrations (Google Calendar)
- Real-time notifications and updates

🔐 **Security & Auth**

- JWT-based authentication
- Google OAuth integration
- Passport.js middleware
- Secure password hashing with bcrypt
- CORS protection

📊 **Database & Performance**

- PostgreSQL with TypeORM
- Database migrations and seeding
- Optimized queries and relationships
- Data validation with class-validator

🔧 **Developer Experience**

- TypeScript for type safety
- Hot reload in development
- Comprehensive error handling
- Structured logging
- Environment-based configuration

---

## 🚀 Live Deployment

**Production API**: [https://meetly-backend-api.onrender.com](https://meetly-backend-api.onrender.com)

### Quick API Test

```bash
# Health Check
curl https://meetly-backend-api.onrender.com

# Expected Response:
{
  "message": "Meetly Backend API is running successfully!",
  "status": "healthy",
  "environment": "production",
  "timestamp": "2025-08-15T15:33:47.655Z"
}
```

### Live API Endpoints

- **Base URL**: `https://meetly-backend-api.onrender.com/api`
- **Health Check**: `GET https://meetly-backend-api.onrender.com/`
- **Authentication**: `POST /api/auth/login`
- **Google OAuth**: `GET /api/auth/google`
- **Events**: `GET/POST /api/event`
- **Meetings**: `GET/POST /api/meeting`
- **Availability**: `GET/POST /api/availability`
- **Integrations**: `GET/POST /api/integration`

### Deployment Info

- **Platform**: Render.com
- **Region**: Oregon, USA
- **Database**: Supabase PostgreSQL (AP-South-1)
- **SSL**: Enabled (HTTPS)
- **Auto-Deploy**: Connected to GitHub

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React)       │◄──►│   (Express)     │◄──►│  (PostgreSQL)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  External APIs  │
                    │ (Google, etc.)  │
                    └─────────────────┘
```

---

## 🛠️ Tech Stack

| Category            | Technology        | Purpose                             |
| ------------------- | ----------------- | ----------------------------------- |
| **Runtime**         | Node.js           | JavaScript runtime environment      |
| **Language**        | TypeScript        | Type-safe JavaScript development    |
| **Framework**       | Express.js        | Web application framework           |
| **Database**        | PostgreSQL        | Relational database                 |
| **ORM**             | TypeORM           | Database object-relational mapping  |
| **Authentication**  | Passport.js + JWT | User authentication & authorization |
| **Validation**      | class-validator   | Data validation and transformation  |
| **Security**        | bcrypt            | Password hashing                    |
| **API Integration** | Google APIs       | Calendar and meeting integrations   |

---

## 📁 Project Structure

```
backend/
├── 📄 package.json          # Dependencies and scripts
├── 📄 tsconfig.json         # TypeScript configuration
└── src/
    ├── 📁 @types/           # Custom type definitions
    ├── 📁 config/           # Configuration files
    │   ├── app.config.ts    # Application settings
    │   ├── database.config.ts # Database connection
    │   ├── oauth.config.ts  # OAuth settings
    │   └── passport.config.ts # Authentication config
    ├── 📁 controllers/      # Route controllers
    │   ├── auth.controller.ts
    │   ├── event.controller.ts
    │   ├── meeting.controller.ts
    │   └── ...
    ├── 📁 database/         # Database related files
    │   ├── 📁 entities/     # TypeORM entities
    │   ├── 📁 migrations/   # Database migrations
    │   └── database.ts      # Database initialization
    ├── 📁 middlewares/      # Express middlewares
    ├── 📁 routes/           # API route definitions
    ├── 📁 services/         # Business logic layer
    └── 📁 utils/            # Utility functions
```

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** 12+ database

### Installation

1. **Clone and navigate to backend**

   ```bash
   git clone https://github.com/ItisSubham/Meetly-Backend-API
   cd Meetly-Backend-API
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

🎉 **Server will be running at `http://localhost:8000`**

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend root:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/meetly

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Google OAuth & APIs
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/api/auth/google/callback

# Frontend
FRONTEND_ORIGIN=http://localhost:3000
FRONTEND_INTEGRATION_URL=http://localhost:3000/integrations
```

---

## 📊 Database

### Entities

| Entity              | Description                    |
| ------------------- | ------------------------------ |
| **User**            | User accounts and profiles     |
| **Event**           | Event types and configurations |
| **Meeting**         | Scheduled meetings             |
| **Availability**    | User availability patterns     |
| **DayAvailability** | Daily availability slots       |
| **Integration**     | External service integrations  |

### Database Operations

```bash
# Generate new migration
npm run db:generate

# Run pending migrations
npm run db:migrate

# Revert last migration
npm run db:revert

# Drop database schema
npm run db:drop
```

---

## 🚦 API Routes

### Authentication Routes

```
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
GET    /api/auth/me          # Get current user
GET    /api/auth/google      # Google OAuth login
```

### Event Management

```
GET    /api/event           # Get user events
POST   /api/event           # Create new event
PUT    /api/event/:id       # Update event
DELETE /api/event/:id       # Delete event
```

### Meeting Management

```
GET    /api/meeting         # Get meetings
POST   /api/meeting         # Schedule meeting
PUT    /api/meeting/:id     # Update meeting
DELETE /api/meeting/:id     # Cancel meeting
```

### Availability Management

```
GET    /api/availability    # Get availability
POST   /api/availability    # Set availability
PUT    /api/availability/:id # Update availability
```

### Integrations

```
GET    /api/integration     # Get integrations
POST   /api/integration     # Add integration
DELETE /api/integration/:id # Remove integration
```

---

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication:

1. **Register/Login** → Receive JWT token
2. **Include token** in `Authorization: Bearer <token>` header
3. **Protected routes** validate token automatically

### Google OAuth Flow

1. Frontend redirects to `/api/auth/google`
2. User authorizes on Google
3. Google redirects to callback with code
4. Backend exchanges code for tokens
5. User data stored, JWT returned

---

## 🔗 Integrations

### Supported Integrations

- **Google Calendar** - Calendar sync and meeting creation
- **Google Meet** - Video meeting links
- **Microsoft Outlook** - Calendar integration (planned)
- **Zoom** - Video conferencing (planned)

### Adding New Integrations

1. Create integration entity
2. Add OAuth configuration
3. Implement service methods
4. Add API routes
5. Update frontend integration page

---

## 📝 Scripts

| Script                | Description                              |
| --------------------- | ---------------------------------------- |
| `npm run dev`         | Start development server with hot reload |
| `npm run build`       | Build TypeScript to JavaScript           |
| `npm start`           | Start production server                  |
| `npm run db:generate` | Generate new database migration          |
| `npm run db:migrate`  | Run pending migrations                   |
| `npm run db:revert`   | Revert last migration                    |
| `npm run db:drop`     | Drop database schema                     |

---

## 🧪 Development

### Code Style & Standards

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

### Error Handling

The API uses a centralized error handling system:

```typescript
// Custom error classes
throw new BadRequestException("Invalid input");
throw new UnauthorizedException("Access denied");
throw new NotFoundException("Resource not found");
```

### Middleware Stack

1. **CORS** - Cross-origin resource sharing
2. **Body Parser** - JSON/URL-encoded parsing
3. **Passport** - Authentication
4. **Validation** - Request validation
5. **Error Handler** - Centralized error handling

---

<div align="center">
  <p>Made with ❤️ for seamless meeting scheduling</p>
  <p>
    <a href="#-table-of-contents">⬆️ Back to top</a>
  </p>
</div>
