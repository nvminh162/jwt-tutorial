# JWT Tutorial Backend

A Node.js backend application with JWT authentication using TypeScript, Express, and Prisma.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nvminh162/jwt-tutorial.git
cd jwt-tutorial/jwt-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file with the following values:

```env
PORT=8080
NODE_ENV=development

JWT_SECRET=7200fc04-28ed-4d83-a691-03f5803e45e4
JWT_EXPIRES_IN=365d

DATABASE_URL="mysql://root:root@localhost:3306/jwt-tutorial"
```

5. Setup database:
```bash
npx prisma generate

npm prisma migrate dev --name init-dbs
```

6. Start the development server:
```bash
npm run dev
```

The server will start on http://localhost:8080

## 📁 Project Structure

```
src/
├── app.ts              # Main application file
├── config/             # Configuration files
│   ├── client.ts       # Client configuration
│   ├── constants.ts    # Application constants
│   ├── db.ts          # Database configuration
│   └── seed.ts        # Database seeding data
├── controllers/        # Route controllers
│   └── api.controller.ts
├── middleware/         # Custom middleware
│   └── jwt.middleware.ts
├── routes/            # API routes
│   └── api.ts
├── services/          # Business logic
│   ├── api.service.ts
│   ├── auth.service.ts
│   └── user.service.ts
└── validation/        # Input validation schemas
    ├── product.schema.ts
    └── register.schema.ts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Seed database with initial data

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 8080 |
| `NODE_ENV` | Environment mode | development |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRES_IN` | JWT expiration time | 365d |
| `DATABASE_URL` | MySQL connection string | Required |

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **TypeScript** - Programming language
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **MySQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

### Protected Endpoints

- `GET /api/users` - Get all users (requires authentication)
- `GET /api/users/:id` - Get user by ID (requires authentication)

## 🚨 Important Notes

- Make sure MySQL server is running before starting the application
- The JWT secret provided above is for development purposes only
- For production, use a strong, randomly generated JWT secret
- Don't commit your actual `.env` file to version control

## 📝 License

This project is for educational purposes.

## 👨‍💻 Author

- [@nvminh162](https://facebook.com/nvminh162)
