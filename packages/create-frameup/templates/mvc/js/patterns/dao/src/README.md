# DAO (Data Access Object) Pattern - README Guide

## Purpose
The **Data Access Object (DAO)** pattern is used to separate the persistence logic of your application from the business logic. The DAO pattern provides an abstract interface to the database, enabling the separation of low-level data access operations from higher-level business services. This helps maintain a clean architecture and makes it easier to replace or modify the database without affecting other parts of the application.

In an MVC architecture, the DAO layer is responsible for interacting directly with the database, while controllers and services use the DAO to perform CRUD operations.

## Structure
The DAO pattern involves creating a class or set of classes that interact with the database, using models to perform CRUD operations. The DAO is typically used by the service layer to manage data interactions in a clean and modular way.

### Example Structure:
```
dao/
  userDAO.js
  productDAO.js
```

## Responsibilities
- **Abstract Database Operations**: Provide methods for interacting with the database that abstract away the underlying queries.
- **CRUD Operations**: Create, Read, Update, and Delete data for specific entities using models.
- **Separation of Concerns**: Keep data access separate from business logic and presentation logic, ensuring clean and modular code.

## Example DAO (`userDAO.js`)
```js
// userDAO.js
import User from '../models/UserModel.js';

class UserDao {
  // Get all users from the database
  async getAllUsers() {
    try {
      return await User.find();
    } catch (error) {
      throw new Error('Error retrieving users: ' + error.message);
    }
  }

  // Get a user by ID
  async getUserById(userId) {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw new Error('Error retrieving user: ' + error.message);
    }
  }

  // Create a new user
  async createUser(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  // Update an existing user
  async updateUser(userId, updateData) {
    try {
      return await User.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  // Delete a user
  async deleteUser(userId) {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
}

export default new UserDao();
```

### Explanation
- **Get All Users**: Retrieves all users from the database.
- **Get User By ID**: Retrieves a specific user by their ID.
- **Create User**: Creates a new user with the given data.
- **Update User**: Updates an existing user by their ID.
- **Delete User**: Deletes a user by their ID.

The DAO methods provide a clean interface for interacting with the database, making it easier to manage the persistence logic independently of the rest of the application.

## Best Practices
1. **Single Responsibility**: Each DAO should focus on managing a specific model/entity (e.g., `User`, `Product`). This makes the code more organized and easier to maintain.
2. **Error Handling**: Always handle errors appropriately and provide meaningful error messages to make debugging easier.
3. **No Business Logic**: DAOs should not contain business logic; they are purely responsible for interacting with the database. Keep business logic in the service layer.
4. **Reusable Methods**: Write reusable methods that can be called by different services as needed to prevent duplication of data access logic.
5. **Consistent Naming**: Use clear and consistent naming for methods to make it easy for developers to understand the purpose of each function (e.g., `getAllUsers`, `createUser`).

## Summary
- The DAO pattern provides an abstraction for interacting with the database, helping keep data access logic separate from business logic.
- DAOs manage CRUD operations for specific entities, providing a clean interface for services to interact with the data.
- Following best practices ensures that DAOs are easy to use, maintain, and test, which helps developers, especially juniors, understand the application’s data access structure.

By using the DAO pattern, your application becomes more modular, making it easier to maintain, extend, and test in the future.
