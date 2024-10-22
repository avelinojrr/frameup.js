# 🔒 Middlewares Folder - README Guide

## Purpose

The **middlewares** folder contains middleware functions that intercept HTTP requests and responses in your application. Middleware functions are crucial for applying logic that is common across different routes, such as authentication, logging, request validation, error handling, and more. The goal is to keep your code modular, reusable, and easier to maintain by offloading shared responsibilities to middleware.

## Structure

The middlewares folder typically contains various middleware functions, each serving a specific purpose, and they are used throughout the application.

> [!TIP]
> This folder is very important for organizing shared logic and ensuring that it is applied consistently across your application.

### Example Structure:

```
middlewares/
  authMiddleware.js
  errorHandler.js
  requestLogger.js
  validationMiddleware.js
```

## Responsibilities

-   **Authentication and Authorization**: Handle user authentication and ensure that only authorized users can access certain endpoints.
-   **Logging**: Log request details such as method, endpoint, and status code for monitoring purposes.
-   **Validation**: Validate request data to ensure that incoming requests contain all necessary fields and conform to expected formats.
-   **Error Handling**: Provide centralized error handling to ensure that any issues are caught and returned to the client in a consistent manner.

> [!NOTE]
> Remember that middleware functions have access to the request (`req`) and response (`res`) objects, allowing them to modify the request, response, or pass control to the next middleware in the chain.

## Example Middleware (`authMiddleware.js`)

```js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const authMiddleware = (req, res, next) => {
	const token = req.header('Authorization').replace('Bearer ', '');
	if (!token) {
		return res
			.status(401)
			.json({ error: 'No token provided, authorization denied' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ error: 'Token is not valid' });
	}
};
```

## Best Practices

1. **Reusable Functions**: Create reusable middleware functions that can be easily plugged into different routes to reduce code duplication.
2. **Centralized Error Handling**: Use a centralized error-handling middleware to ensure consistent and clear error responses across the application.
3. **Order Matters**: Remember that middleware is executed in the order it is registered. Be mindful of the sequence to avoid unintended behaviors.
4. **Third-Party Middleware**: Use third-party middleware like `helmet` for security enhancements and `cors` for enabling Cross-Origin Resource Sharing.
5. **Logging**: Implement request logging to monitor activity and detect issues. Use tools like `morgan` to facilitate logging.

## 📌 Summary

-   The middlewares folder centralizes functions that handle common operations such as authentication, validation, logging, and error handling.
-   Middleware allows you to apply shared logic across multiple routes, keeping your code DRY (Don't Repeat Yourself).
-   Proper middleware organization and usage help ensure a clean, maintainable codebase.

By following these practices, you can create an application that is modular, secure, and easier to maintain over time.
