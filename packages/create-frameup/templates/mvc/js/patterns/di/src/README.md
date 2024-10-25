# Dependency Injection (DI) Pattern - README Guide

## Purpose
The **Dependency Injection (DI)** pattern is a design pattern used to manage the dependencies of a class. Instead of the class itself instantiating its dependencies, they are provided from the outside, typically by a container or by passing them through constructors or setters. This pattern helps promote loose coupling, improves testability, and makes code more modular and easier to maintain.

In an MVC architecture, dependency injection is useful for passing dependencies like services or DAOs into controllers or other services, keeping the relationships between components more flexible and reducing direct dependencies.

## Structure
Dependency Injection is typically implemented using constructors, setters, or frameworks. In JavaScript, it is common to manually inject dependencies via constructors.

### Example Structure:
```
services/
  userService.js
controllers/
  userController.js
```

## Responsibilities
- **Inject Dependencies**: Provide dependencies to a class or function from an external source, instead of instantiating them internally.
- **Promote Reusability**: Make components reusable by decoupling them from specific implementations of their dependencies.
- **Improve Testability**: Inject mock dependencies during testing to ensure that units of code can be tested in isolation.

## Example DI Implementation (`userController.js`)
```js
// userService.js
class UserService {
  constructor(userDao) {
    this.userDao = userDao;
  }

  async getAllUsers() {
    return await this.userDao.getAllUsers();
  }
}

module.exports = UserService;
```

```js
// userController.js
class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get users' });
    }
  }
}

module.exports = UserController;
```

```js
// main.js (Dependency Injection Setup)
const UserDao = require('./dao/userDao');
const UserService = require('./services/userService');
const UserController = require('./controllers/userController');

// Inject dependencies
const userDao = new UserDao();
const userService = new UserService(userDao);
const userController = new UserController(userService);

// Use `userController` in your routes or wherever necessary
```

### Explanation
- **UserService**: The service receives a DAO object (`userDao`) as a dependency through its constructor. This keeps the service decoupled from a specific DAO implementation, making it easier to replace or mock `userDao` in the future.
- **UserController**: The controller receives the `userService` as a dependency, allowing the controller to focus on handling requests and delegating business logic to the service.
- **Main Setup**: In `main.js`, dependencies are manually instantiated and injected into their consumers. This way, the components are unaware of how their dependencies are created.

## Best Practices
1. **Constructor Injection**: Prefer using constructors to inject dependencies as it makes the class requirements explicit and ensures that the class cannot be instantiated without them.
2. **Avoid Hardcoding**: Do not instantiate dependencies directly inside classes. This ensures that classes remain flexible, reusable, and easy to test.
3. **Decouple Logic**: By injecting dependencies, you decouple logic from implementations. This allows you to easily replace dependencies if the implementation changes (e.g., swapping out a DAO for a mock during testing).
4. **Test-Friendly**: Inject mock dependencies during testing to isolate the unit being tested and control its environment.
5. **Dependency Containers**: In larger projects, consider using a dependency injection container or library to manage dependencies automatically, which helps keep the code clean and maintainable.

## Summary
- Dependency Injection (DI) provides a way to manage dependencies from the outside, promoting loose coupling and making code easier to maintain and test.
- DI helps services, controllers, and other components focus on their specific responsibilities without worrying about how their dependencies are instantiated.
- Following best practices with DI helps improve the flexibility, reusability, and testability of the application, making it easier for junior developers to understand and work with complex projects.

By using Dependency Injection, your application becomes more modular, flexible, and test-friendly, enabling better maintenance and scalability.
