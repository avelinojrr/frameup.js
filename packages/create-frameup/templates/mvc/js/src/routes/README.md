# 🚏 Routes Folder - README Guide

## Purpose
The **routes** folder is responsible for defining and organizing the API endpoints for the application. It maps incoming HTTP requests to their corresponding controllers and middleware, ensuring a clean separation of routing logic from business logic and data manipulation.

## Responsibilities
- **Route Definition**: Define application routes and associate them with appropriate HTTP methods (GET, POST, PUT, DELETE, etc.).
- **Controller Binding**: Connect routes to their respective controller methods.
- **Middleware Integration**: Apply middleware for authentication, validation, or other request-level operations.
- **Modularity**: Organize routes by feature or domain for better maintainability.

## Structure
Organize route files by feature or domain. For instance, if the application has users, products, and orders, create separate route files for each.

### Example Structure:
```
src/
  routes/
    userRoutes.js
    productRoutes.js
    orderRoutes.js
```

## Example Implementation

### User Routes (`userRoutes.js`)
```js
import express from 'express';
import UserController from '../controllers/userController.js';
import validateUser from '../middleware/validateUser.js';

const router = express.Router();

// Define routes for user-related operations
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', validateUser, UserController.createUser);
router.put('/:id', validateUser, UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
```

### Middleware Example (`validateUser.js`)
```js
const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  next();
};

export default validateUser;
```

### Main Router Integration (`index.js`)
```js
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Register routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

export default app;
```

## Best Practices
1. **Separation of Concerns**: Keep routing logic in route files, and delegate request handling to controllers.
2. **Use Middleware**: Apply middleware for validation, authentication, or logging to maintain cleaner route definitions.
3. **Organize by Domain**: Group routes by feature or domain for better readability and maintainability.
4. **RESTful API Design**: Follow REST principles to make APIs intuitive and consistent (e.g., use appropriate HTTP methods for CRUD operations).
5. **Error Handling**: Use a centralized error-handling middleware to manage route-specific errors efficiently.

## Summary
- The routes folder organizes and defines the API endpoints of your application.
- Routes map HTTP requests to controllers and optionally integrate middleware for additional processing.
- Following best practices ensures that the routing logic remains clean, maintainable, and scalable.

This structure and approach make the routing layer efficient and well-organized for any MVC-based application.
