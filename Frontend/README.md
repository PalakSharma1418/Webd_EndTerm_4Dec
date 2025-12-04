# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

1. Frontend

React – For building UI components.

Vite – Modern frontend build tool, faster than Create React App, with native ES modules support.

JavaScript / TypeScript – Project language (TS is optional but recommended).

JSX / TSX – For component templates.

2. Styling

CSS / SCSS / SASS – Standard styling options.

Tailwind CSS – Utility-first CSS framework (commonly used with Vite).

PostCSS – CSS transformations and plugins.

CSS Modules – Scoped component-specific CSS (optional).

3. State Management

React Context API – Built-in global state management.

Redux / Redux Toolkit – Popular choice for larger apps.

Zustand / Jotai / Recoil – Lightweight alternatives.

4. Routing

React Router v6+ – Client-side routing for single-page applications.

5. API / Networking

Axios / Fetch API – For HTTP requests.

React Query / TanStack Query – Data fetching and caching (optional).

6. Build & Tooling

Vite – Bundler and dev server.

ESLint – Linting for JS/TS.

Prettier – Code formatting.

Husky / lint-staged – Git hooks for pre-commit checks.
