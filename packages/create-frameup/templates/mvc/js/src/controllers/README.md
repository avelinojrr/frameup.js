# 📋 Controller Folder - README Guide

## Purpose
The **controller** folder is meant to contain all the controllers for your application. Controllers are responsible for handling incoming requests, processing them with the help of services, and returning appropriate responses to the client. This is where you define the application logic that ties together different parts of your application.

## Structure
Controllers are usually organized by resource or feature. For example, if you have a user management feature, you would have a file named `userController.js`. If you have other features like products, orders, etc., you would create separate controllers for each, such as `productController.js`, `orderController.js`, and so on.

> [!TIP]
> The controller layer is responsible for handling HTTP requests, validating input, and returning responses. It should be kept thin, with most of the business logic residing in the service layer.

### Example Structure:
```
controller/
  userController.js
  productController.js
  orderController.js
```

## Responsibilities
- **Routing**: Controllers map HTTP routes to appropriate functions. This typically includes defining what should happen for each endpoint, such as GET, POST, PUT, DELETE requests.
- **Input Validation**: Validate and sanitize incoming request data before processing it further.
- **Processing**: Use the business logic from the service layer to perform operations.
- **Response Handling**: Send a well-structured response to the client, including success or error messages.


## Example Controller (`userController.js`)
```js
import UserService from '../services/userService.js';

// Handles user-related operations
class UserController {
  
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get users' });
    }
  }

  async createUser(req, res) {
    try {
      const userData = req.body;
      const newUser = await UserService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  // More methods (getUserById, updateUser, deleteUser, etc.)
}

export default new UserController();
```

## Best Practices
1. **Keep Controllers Thin**: Controllers should contain minimal logic. Offload complex business logic to services to keep controllers concise and easy to maintain.
2. **Error Handling**: Always include appropriate error handling to catch issues and return a meaningful response.
3. **Validation**: Validate incoming request data, either within the controller or using middleware.
4. **Consistency**: Ensure consistent response formats, such as `{ data: ..., error: ... }`, to make it easier to handle on the client side.

## 📌 Summary
- Controllers are the entry point for handling HTTP requests.
- They validate input, use services for processing, and return appropriate responses.
- Keeping the controller layer thin is essential to maintain a clean architecture.

Make sure to reference the **service** layer for complex logic and use **middleware** for tasks like authentication and input validation to maintain separation of concerns and keep your controllers easy to manage.
