# Utils Folder - README Guide

## Purpose
The **utils** (utilities) folder is used to store reusable utility functions and helper modules that are used throughout the application. These are general-purpose functions that don't belong to any specific entity but provide common functionalities that can be shared across various parts of the codebase. Keeping utilities in their own folder helps maintain a clean and organized structure, reducing redundancy and improving code reusability.

## Structure
The utils folder can contain multiple helper functions, categorized based on their use. Each utility should ideally handle one task, making it easy to import and use as needed.

### Example Structure:
```
utils/
  dateUtils.js
  validationUtils.js
  encryptionUtils.js
  fileUtils.js
```

## Responsibilities
- **Reusable Code**: Store generic functions that can be reused across multiple files, such as data formatting, encryption, validation, or file handling.
- **Avoid Redundancy**: Provide a single source of truth for utility functions to avoid code duplication.
- **Simplify Code**: Use helper functions to keep the main business logic and controllers clean, simple, and focused on their core responsibilities.

## Example Utilities
### Date Utility (`dateUtils.js`)
```js
// dateUtils.js

// Function to format a date into 'YYYY-MM-DD' format
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Function to get the current date in 'YYYY-MM-DD' format
const getCurrentDate = () => {
  return formatDate(new Date());
};

module.exports = {
  formatDate,
  getCurrentDate,
};
```

### Validation Utility (`validationUtils.js`)
```js
// validationUtils.js

// Function to validate an email address
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate if a field is not empty
const isNotEmpty = (value) => {
  return value && value.trim() !== '';
};

module.exports = {
  validateEmail,
  isNotEmpty,
};
```

### Encryption Utility (`encryptionUtils.js`)
```js
// encryptionUtils.js

const bcrypt = require('bcrypt');

// Function to hash a plain text password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Function to compare a plain text password with a hash
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};
```

## Best Practices
1. **Single Responsibility**: Each utility should handle a specific task. This keeps utility functions simple and easy to test.
2. **Reusability**: Keep utilities generic so they can be reused across different parts of the application without modification.
3. **No Side Effects**: Utility functions should not produce side effects. They should take input and return output without altering any state outside their scope.
4. **Consistent Naming**: Use descriptive and consistent naming conventions for utility functions to ensure that they are easy to understand and use.
5. **Testing**: Utility functions should be well-tested, as they are used across the application and any bugs can have a wide impact.

## Summary
- The utils folder contains reusable helper functions that provide shared functionality throughout the application.
- Utilities help keep business logic and controllers clean, focusing on common tasks like formatting, encryption, and validation.
- Following best practices ensures that utility functions are reusable, reliable, and contribute to an organized codebase.

By organizing utilities in a dedicated folder, you make your application easier to maintain and extend, helping developers, especially juniors, to quickly find and reuse code instead of duplicating efforts.
