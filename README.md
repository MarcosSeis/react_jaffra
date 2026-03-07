# 🛒 Next.js E-Commerce Demo

This project is a small e-commerce application built with **Next.js**, designed as a technical assessment.
It demonstrates a clean architecture approach, modular UI design, state management, and unit testing.

The application allows users to browse products, view details, manage a shopping cart, and simulate checkout.

---

# 🚀 Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Zustand** – global UI state
- **Jest** – unit testing
- **CSS Modules** – styling
- **FakeStore API** – product data source

---

# 🧱 Architecture

The project follows a **Clean Architecture inspired structure** that separates business logic from infrastructure and UI.

```
src/
 ├─ domain
 │   ├─ entities
 │   ├─ repositories
 │   └─ use-cases
 │
 ├─ application
 │   ├─ hooks
 │   └─ services
 │
 ├─ infrastructure
 │   ├─ api
 │   ├─ mappers
 │   └─ repositories
 │
 ├─ presentation
 │   ├─ components
 │   │   ├─ atoms
 │   │   ├─ molecules
 │   │   ├─ organisms
 │   │   └─ templates
 │   └─ layouts
 │
 └─ store
```

### Layer responsibilities

**Domain**

Contains the core business logic:

- Entities
- Repository interfaces
- Use cases

No framework or external dependency is used here.

---

**Application**

Coordinates the domain logic.

Includes:

- Application services
- React hooks used by the UI

This layer connects UI interactions with domain use cases.

---

**Infrastructure**

Handles external systems such as APIs.

Includes:

- API clients
- Repository implementations
- Data mappers

This layer translates external data into domain entities.

---

**Presentation**

Responsible for UI rendering.

The UI is organized using **Atomic Design**:

```
atoms → basic UI elements
molecules → composed components
organisms → feature sections
templates → page layouts
```

---

**Store**

Global UI state is handled using **Zustand**.

The store manages shared UI state such as:

- cart state
- cart totals
- cart item count

Business logic remains in the domain layer.

---

# 🛍 Features

### Product Browsing

- Product grid
- Product details page
- Category filter
- Search by product name

---

### Cart Management

- Add product to cart
- Remove product
- Update quantity
- Cart totals calculation
- Cart item counter in header
- Cart persistence using localStorage

---

### Checkout

- Simulated checkout modal
- Clears cart after confirmation

---

### UX Improvements

- Skeleton loading for product grid
- Retry button for API errors
- Add-to-cart animation
- Responsive layout
- Accessible contrast improvements

---

# 🧠 State Management

Global state is managed with **Zustand**.

Only **UI state** is stored globally, including:

```
cart
cart totals
item count
```

All business operations still go through:

```
services → use cases → repositories
```

This keeps business logic independent from the UI layer.

---

# 🧪 Testing

Unit tests are implemented with **Jest**.

The testing strategy focuses on **business logic** rather than UI rendering.

Tested layers:

```
✔ Domain use cases
✔ Application services
✔ Infrastructure mappers
```

Example coverage includes:

- cart operations
- product retrieval
- quantity updates
- error propagation

Run tests:

```
npm run test
```

---

# ⚙️ Running the Project

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

# 🧾 Scripts

```
npm run dev       # start development server
npm run build     # production build
npm run start     # start production server
npm run test      # run tests
npm run test:watch
```

---

# 🤖 Use of AI Tools

AI tools were used to assist during development for:

- scaffolding project structure
- generating initial boilerplate code
- suggesting refactoring improvements
- assisting with documentation

All generated code was **reviewed and manually adjusted** to ensure it follows the architectural decisions and project requirements.

---

# 📈 Possible Future Improvements

Potential enhancements for a production environment:

- Server-side caching
- Pagination for products
- Authentication and user accounts
- Order history
- E2E testing with Playwright or Cypress
- Performance optimizations

---

# 📌 Summary

This project demonstrates:

- Clean Architecture principles
- Atomic Design component structure
- Modern React state management
- Testable business logic
- Scalable frontend structure

The goal was to build a maintainable and extensible solution while keeping UI logic separate from domain logic.
