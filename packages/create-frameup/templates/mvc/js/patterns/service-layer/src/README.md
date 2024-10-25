# Service Layer Pattern - README Guide

## Purpose
The **Service Layer** pattern is used to organize and manage the business logic of your application in a separate layer. The service layer sits between the controllers and the data access layer (e.g., DAOs), providing a clean and reusable way to implement the core functionality of your application. By using a dedicated service layer, you separate the business rules from the controllers, which allows you to keep your code organized, testable, and maintainable.

In an MVC architecture, the service layer is responsible for implementing all the business logic, while controllers handle HTTP requests and responses, and DAOs handle the persistence logic.

## Structure
The service layer is typically implemented as a set of classes or modules that correspond to different entities or features of your application. Each service is responsible for executing operations related to a particular domain.

### Example Structure:
```
services/
  userService.js
  productService.js
```

## Responsibilities
- **Implement Business Logic**: Encapsulate and execute the core business rules of your application.
- **Coordinate Between Layers**: Interact with the data access layer (e.g., DAOs) and transform data to be consumed by the controller layer.
- **Error Handling**: Manage and centralize error handling for business operations, ensuring consistent behavior.

## Example Service (`userService.js`)
```js
// userService.js
const UserDao = require('../dao/userDao');
const bcrypt = require('bcrypt');

class UserService {
  constructor(userDao) {
    this.userDao = userDao;
  }

  // Get all users
  async getAllUsers() {
    try {
      return await this.userDao.getAllUsers();
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  // Create a new user with password encryption
  async createUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const userToCreate = { ...userData, password: hashedPassword };
      return await this.userDao.createUser(userToCreate);
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  // Get a user by ID
  async getUserById(userId) {
    try {
      const user = await this.userDao.getUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error retrieving user: ' + error.message);
    }
  }

  // Update user details
  async updateUser(userId, updateData) {
    try {
      return await this.userDao.updateUser(userId, updateData);
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  // Delete a user
  async deleteUser(userId) {
    try {
      return await this.userDao.deleteUser(userId);
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
}

module.exports = UserService;
```

### Explanation
- **Dependency Injection**: `UserService` takes a `userDao` instance as a parameter. This makes the service layer decoupled and easy to modify or mock, especially for testing.
- **Password Encryption**: In `createUser()`, the password is hashed before being passed to the `userDao` for persistence. This encapsulates the security logic in one place.
- **Centralized Error Handling**: Errors are caught and thrown with descriptive messages. This makes the error messages consistent across the application.

## Best Practices
1. **Thin Controllers, Thick Services**: Keep the controllers thin by delegating business logic to the service layer. Controllers should only handle HTTP concerns like request parsing and response formatting.
2. **Reusable Business Logic**: Write methods in the service layer that can be reused by different controllers, reducing code duplication.
3. **Single Responsibility**: Each service should handle the business logic for one entity or domain (e.g., user, product), keeping it focused and easy to manage.
4. **Centralized Error Handling**: Use consistent error messages across services, and throw descriptive errors that make debugging easier.
5. **Dependency Injection**: Pass dependencies (e.g., DAOs) into the service constructor to keep services decoupled and testable.

## Summary
- The **Service Layer** pattern helps separate business logic from controllers, making the code more organized, reusable, and maintainable.
- It acts as a bridge between the controller and data access layer, encapsulating all business rules and operations.
- By following best practices, the service layer ensures that your application remains modular, flexible, and easy for junior developers to understand.

Using a dedicated service layer results in a codebase that is well-structured, maintainable, and easy to extend, helping developers, especially juniors, to manage and understand complex business operations effectively.
