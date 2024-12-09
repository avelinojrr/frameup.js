# 🗄️ Database Folder - README Guide

## Purpose
The **database** folder is responsible for managing all database-related operations. It includes configurations, connections, and utilities for handling various database systems. This folder is designed to support direct database connections as well as integrations with ORMs (like Sequelize and Prisma) and ODMs (like Mongoose).

## Responsibilities
- **Database Configuration**: Define and manage connection settings for multiple database types.
- **Connection Management**: Centralize the logic for establishing and maintaining database connections.
- **Modularity**: Provide separate implementations for different databases and tools (e.g., MongoDB, PostgreSQL).
- **Compatibility**: Support both direct connections and integration with ORMs/ODMs.

## Structure
Organize files and subdirectories based on database types and tools.

### Example Structure:
```
src/
  database/
    mongodb/
      connection.js
    postgresql/
      connection.js
    orm/
      sequelize.js
      prisma.js
    odm/
      mongoose.js
```

## Example Implementations

### MongoDB Connection (Without ODM)
#### `mongodb/connection.js`
```js
import { MongoClient } from 'mongodb';
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

export const db = client.db(process.env.MONGO_DB_NAME);
```

### PostgreSQL Connection (Without ORM)
#### `postgresql/connection.js`
```js
import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB_NAME,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.error('Failed to connect to PostgreSQL:', error);
    process.exit(1);
  }
};

export default pool;
```

### MongoDB Connection with Mongoose (ODM)
#### `odm/mongoose.js`
```js
import mongoose from 'mongoose';
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB using Mongoose');
  } catch (error) {
    console.error('Failed to connect to MongoDB with Mongoose:', error);
    process.exit(1);
  }
};

export default connectDB;
```

### PostgreSQL Connection with Sequelize (ORM)
#### `orm/sequelize.js`
```js
import { Sequelize } from 'sequelize';
require('dotenv').config();

const sequelize = new Sequelize(process.env.PG_DB_NAME, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  dialect: 'postgres',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL using Sequelize');
  } catch (error) {
    console.error('Failed to connect to PostgreSQL with Sequelize:', error);
    process.exit(1);
  }
};

export default connectDB;
```

### PostgreSQL Connection with Prisma (ORM)
#### `orm/prisma.js`
```js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to PostgreSQL using Prisma');
  } catch (error) {
    console.error('Failed to connect to PostgreSQL with Prisma:', error);
    process.exit(1);
  }
};

export default connectDB;
```

## Best Practices
1. **Environment Variables**: Use `.env` files to store sensitive information like database credentials.
2. **Centralized Connections**: Keep connection logic centralized for better maintainability.
3. **Error Handling**: Always include proper error handling for database connections.
4. **Testable Code**: Write modular and testable code to mock connections during testing.
5. **Support Multiple Databases**: Provide implementations for different databases to make the application more flexible.

## Summary
- The `database` folder centralizes database-related logic and supports multiple configurations.
- It includes examples for MongoDB and PostgreSQL, with and without ORMs/ODMs.
- Proper structure and modularity make the database layer scalable and easy to maintain.

This guide ensures that your application's database logic is robust, flexible, and adheres to best practices.
