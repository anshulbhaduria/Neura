# Product Dashboard

A modern, responsive e-commerce product dashboard application built with React, Redux Toolkit, and Material-UI. It features product listing, searching, filtering, sorting, product details, and a favorites management system.

---

## Technologies Used

- **Frontend:** React, Vite, Redux Toolkit, React Redux, Material-UI (MUI), React Router DOM, Axios
- **Testing:** Vitest, @testing-library/react, @testing-library/jest-dom, jsdom
- **Linting:** ESLint

---

## Setup & Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js) or Yarn

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/product-dashboard.git](https://github.com/your-username/product-dashboard.git)
    cd product-dashboard
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or if you use yarn
    # yarn install
    ```

### Configuration Notes

- **Vitest:** Test configuration is handled in `vite.config.js` with `globals: true` and `environment: 'jsdom'`.
- **Test Setup:** Global test setup (e.g., `@testing-library/jest-dom` matchers) is in `src/setupTests.js`.
- **ESLint:** Your `.eslintrc.js` is configured to recognize global test variables (`describe`, `it`, `expect`, `vi`) within files named `*.test.jsx` or `*.spec.jsx`.
- **Test File Naming:** Remember to name your React component test files with the `.jsx` extension (e.g., `ProductCard.test.jsx`) to ensure proper JSX parsing.

---

## 🚀 Running the Application

To start the development server:

````bash
npm run dev
# or if you use yarn
# yarn dev

```bash
To execute the unit tests:
npm test
# or if you use yarn
# yarn test
````
