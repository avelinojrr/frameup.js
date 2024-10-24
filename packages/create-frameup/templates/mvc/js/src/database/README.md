# Database Folder - README Guide

## Purpose
The **database** folder is dedicated to managing all aspects related to the database layer of your application. This includes database connections, models, migrations, seeders, and any utilities or helpers that facilitate interaction with your database. The goal is to centralize all database-related operations for easier maintenance and scalability.

## Structure
The database folder typically contains files and subfolders to organize database connection logic, model definitions, and optional utilities like migration and seeding scripts.

### Example Structure:
```
database/
  db.js
  models/
    userModel.js
    productModel.js
  migrations/
    20231017_create_users_table.js
    20231018_create_products_table.js
  seeders/
    seedUsers.js
    seedProducts.js
  helpers/
    queryHelper.js
```

## Responsibilities
- **Database Connection**: Establish and manage the connection to the database using a centralized configuration file (`db.js`). This helps ensure that the connection logic is reusable and easy to maintain.
- **Model Definitions**: Define the structure of your data using models. Models represent the tables in your database and define relationships, constraints, and data types.
- **Migrations**: Track changes to the database schema over time, enabling consistent modifications to the database, especially in a team environment.
- **Seeders**: Populate the database with initial data to help in testing and development environments.
- **Helpers and Utilities**: Provide reusable functions that can simplify queries or manage complex database operations.

## Example Database Connection Files

### MongoDB Connection with Mongoose (`db.js`)
```js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### PostgreSQL Connection without ORM (`db.js`)
```js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('PostgreSQL Database connected successfully');
  } catch (error) {
    console.error('PostgreSQL Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };
```

### PostgreSQL Connection with Sequelize (`db.js`)
```js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to PostgreSQL using Sequelize has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
```

### PostgreSQL Connection with Prisma (`db.js`)
```js
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to PostgreSQL using Prisma successfully.');
  } catch (error) {
    console.error('Prisma connection to PostgreSQL failed:', error);
    process.exit(1);
  }
};

module.exports = { prisma, connectDB };
```

## Best Practices
1. **Centralize Connection Logic**: Always use a single file to handle the database connection (`db.js`). This makes it easier to reuse and manage connections.
2. **Use Migrations for Schema Changes**: Make all changes to the database schema via migration files. This makes it easier to track and replicate changes across environments.
3. **Environment Variables for Sensitive Data**: Store database credentials and URIs in environment variables, never in the code itself.
4. **Modularize Models**: Place each model in its own file under a `models/` directory. This helps maintain clear separation of concerns and keeps the codebase organized.
5. **Error Handling**: Include appropriate error handling for database connections and queries to ensure resilience and ease of debugging.

## Summary
- The database folder centralizes all database-related operations, including connection, model definitions, migrations, and seeders.
- Keeping database logic modular and organized helps in maintaining scalability and ease of management.
- Always use environment variables for sensitive data and make schema changes using migrations for consistency.

By adhering to these practices, you ensure that your application's database layer is structured, maintainable, and secure.
