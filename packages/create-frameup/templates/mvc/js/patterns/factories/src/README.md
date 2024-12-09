# Factory Pattern - README Guide

## Purpose
The **Factory Pattern** is a creational design pattern that provides a way to create objects without specifying their concrete classes. It encapsulates the object creation logic, making the code more modular, reusable, and easy to extend.

## Use Cases
- When the exact type of object required is determined at runtime.
- When the creation logic is complex and needs to be centralized.
- When you want to decouple the instantiation process from the client code.

## Structure
The Factory Pattern involves a factory class or method that creates and returns instances of specific classes based on input parameters or conditions.

### Example Structure:
```
src/
  factories/
    vehicleFactory.js
  models/
    car.js
    bike.js
    truck.js
  services/
    vehicleService.js
```

## Responsibilities
- **Factory**: Encapsulates the object creation logic and decides which class to instantiate based on input.
- **Product**: Represents the objects created by the factory (e.g., `Car`, `Bike`, `Truck`).
- **Client**: Uses the factory to create objects without needing to know the details of their creation.

## Example Implementation

### Product Classes (`car.js`, `bike.js`, `truck.js`)

#### `car.js`
```js
class Car {
  constructor(make, model) {
    this.type = 'Car';
    this.make = make;
    this.model = model;
  }

  drive() {
    console.log(`Driving a car: ${this.make} ${this.model}`);
  }
}

export default Car;
```

#### `bike.js`
```js
class Bike {
  constructor(brand) {
    this.type = 'Bike';
    this.brand = brand;
  }

  ride() {
    console.log(`Riding a bike: ${this.brand}`);
  }
}

export default Bike;
```

#### `truck.js`
```js
class Truck {
  constructor(capacity) {
    this.type = 'Truck';
    this.capacity = capacity;
  }

  load() {
    console.log(`Loading a truck with capacity: ${this.capacity} tons`);
  }
}

export default Truck;
```

### Factory (`vehicleFactory.js`)
```js
import Car from '../models/car.js';
import Bike from '../models/bike.js';
import Truck from '../models/truck.js';

class VehicleFactory {
  static createVehicle(type, options) {
    switch (type) {
      case 'car':
        return new Car(options.make, options.model);
      case 'bike':
        return new Bike(options.brand);
      case 'truck':
        return new Truck(options.capacity);
      default:
        throw new Error('Invalid vehicle type');
    }
  }
}

export default VehicleFactory;
```

### Client Code (`vehicleService.js`)
```js
import VehicleFactory from '../factories/vehicleFactory.js';

const car = VehicleFactory.createVehicle('car', { make: 'Toyota', model: 'Corolla' });
car.drive();

const bike = VehicleFactory.createVehicle('bike', { brand: 'Yamaha' });
bike.ride();

const truck = VehicleFactory.createVehicle('truck', { capacity: 10 });
truck.load();
```

## Best Practices
1. **Encapsulation**: Keep the object creation logic within the factory to maintain separation of concerns.
2. **Validation**: Add validation for input parameters to ensure proper instantiation.
3. **Extendability**: Make it easy to extend the factory with new product types by using polymorphism or configuration files.
4. **Error Handling**: Include error handling in the factory to manage invalid or unsupported product types.

## Summary
- The Factory Pattern centralizes object creation logic and hides the complexity from the client.
- It makes your code more modular, maintainable, and easier to extend.
- Use factories when you need to manage object creation dynamically or based on runtime input.

This implementation with ES6 demonstrates how to create a factory for vehicles, making it easier to manage and extend your application.
