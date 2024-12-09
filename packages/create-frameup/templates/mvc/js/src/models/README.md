# 📦 Models Folder - README Guide

## Purpose
The **models** folder is responsible for defining the structure of the data in your application. It serves as the blueprint for how data is organized, validated, and interacted with in your database. Models represent the entities in your application, such as users, products, or orders, and define their attributes, relationships, and validation rules.

## Structure
The models folder typically contains files for each model, which represent the different entities in your system. Each file corresponds to a table or collection in the database, depending on the database type used.

### Example Structure:
```
models/
  userModel.js
  productModel.js
  orderModel.js
```

## Responsibilities
- **Define Data Schema**: Models are used to define the schema or structure of the data, such as attributes and their data types.
- **Data Validation**: Ensure that the data being stored adheres to specific rules or constraints.
- **Database Interaction**: Provide methods to create, read, update, and delete data (CRUD operations).
- **Relationships**: Define relationships between different entities, such as `one-to-many` or `many-to-many`.

## Example Models
### Mongoose (MongoDB) Example (`userModel.js`)
```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('User', userSchema);

```

### Sequelize (PostgreSQL or MySQL) Example (`productModel.js`)
```js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
  tableName: 'products',
});

export default Product;
```

## Best Practices
1. **Use Consistent Naming**: Use consistent and descriptive names for models and attributes to maintain clarity across the codebase.
2. **Define Relationships**: Explicitly define relationships such as associations in Sequelize (`belongsTo`, `hasMany`) or references in Mongoose to maintain data integrity.
3. **Validation**: Use built-in validation where possible (e.g., `required`, `unique`) and add custom validation for more complex requirements.
4. **Separate Concerns**: Keep your models focused on data structure and validation. Business logic should be handled in services, not in the model itself.
5. **Use Environment Variables**: When connecting to the database, use environment variables for sensitive information such as credentials.

## Summary
- The models folder is used to define the structure and behavior of your data.
- Mongoose models work with MongoDB and are used to define collections and schemas, while Sequelize models work with SQL databases like PostgreSQL and MySQL to define tables and relationships.
- Following best practices for models helps keep your codebase clean, maintainable, and secure.

By organizing models correctly, you ensure that your application's data layer is robust, scalable, and easy to manage.
