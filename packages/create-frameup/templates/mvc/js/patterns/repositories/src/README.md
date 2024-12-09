# Repository Pattern - README Guide

## Purpose
The **Repository Pattern** is used to abstract the data access logic and provide a clean, consistent API for interacting with the data layer. It helps separate business logic from data access logic, making your application more modular and testable.

## Structure
The repository pattern typically involves creating a dedicated repository class for each domain model. These repository classes handle all CRUD (Create, Read, Update, Delete) operations and can also include custom query logic as needed.

### Example Structure:
```
src/
  repositories/
    userRepository.js
    productRepository.js
  models/
    userModel.js
    productModel.js
  services/
    userService.js
  utils/
    database.js
```

## Responsibilities
- **Encapsulation**: Encapsulate all database operations for a specific domain model in a single class.
- **Abstraction**: Provide a clean API for the service layer to interact with the database, hiding the underlying data access logic.
- **Reusability**: Promote reusable and maintainable code by centralizing data operations in one place.
- **Testability**: Simplify unit testing by allowing mocks or stubs to replace repository implementations.

## Example Implementation

### Model Example (`userModel.js`)
```js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
```

### Repository Example (`userRepository.js`)
```js
import UserModel from '../models/userModel.js';

class UserRepository {
  async findAll() {
    return await UserModel.find();
  }

  async findById(id) {
    return await UserModel.findById(id);
  }

  async create(data) {
    return await UserModel.create(data);
  }

  async update(id, data) {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}

export default new UserRepository();
```

### Service Example (`userService.js`)
```js
import UserRepository from '../repositories/userRepository.js';

class UserService {
  async getAllUsers() {
    return await UserRepository.findAll();
  }

  async getUserById(id) {
    return await UserRepository.findById(id);
  }

  async createUser(data) {
    return await UserRepository.create(data);
  }

  async updateUser(id, data) {
    return await UserRepository.update(id, data);
  }

  async deleteUser(id) {
    return await UserRepository.delete(id);
  }
}

export default new UserService();
```

## Best Practices
1. **Single Responsibility**: Keep each repository class focused on one domain model to maintain clarity and separation of concerns.
2. **Avoid Business Logic**: Repositories should only handle data access. Keep business logic in the service layer.
3. **Consistency**: Use consistent naming conventions for repository methods (e.g., `findAll`, `findById`, `create`, `update`, `delete`).
4. **Error Handling**: Ensure proper error handling for all database operations and provide meaningful error messages.
5. **Test Repository Methods**: Write unit tests for repository methods to ensure they perform the expected database operations.

## Summary
- The repository pattern provides a clean abstraction for data access operations.
- It separates data access logic from business logic, improving modularity and testability.
- Use repository classes in the service layer to keep your code organized and maintainable.

By implementing the repository pattern, you can make your application's data access layer more robust and easier to maintain.
