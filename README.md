# CipherSQLStudio

A SQL learning platform where users can practice SQL queries with assignments and AI-powered hints.

## Technology Stack

- **Frontend**: React + Vite - Fast development and modern UI
- **Backend**: Node.js + Express - RESTful API server
- **Databases**: 
  - MongoDB - User authentication and assignment storage
  - PostgreSQL - SQL query executin and sample data
- **AI Integration**: OpenRouter API - Contextual hint generation
- **Editor**: Monaco Editor - Professional SQL code editor

### Prerequisites
- Node.js
- MongoDB
- PostgreSQL

### PostgreSQL Setup

1. Create a PostgreSQL database:
```bash
createdb database_name
```

2. Run the SQL schema file to create tables:
```bash
psql -d database_name -f ciphersqlstudio/backend/src/db/postgres.sql
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd ciphersqlstudio/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with required variables

4. Start the server:
```bash
npm start
```

The server will automatically populate sample data on startup.

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd ciphersqlstudio/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=your_database_name
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
LLM_API_KEY=your_openrouter_api_key
FRONTEND_URL=http://localhost:5173
```

## Features

- User authentication with JWT
- Interactive SQL editor
- Real-time query execution
- AI-powered hints
- Sample data viewer
- Guest mode for quick practice
