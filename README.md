# Interactive Frontend Milestone

This project is an interactive React frontend demonstrating the core user interface and flows for Taqueria Cinco de Mayo. There is no backend for this milestone; data is mocked in the frontend.

## Getting Started

1. Clone your fork of the template repository.
2. Navigate into the `frontend` folder:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Vite will start on `http://localhost:5173`. All source code and React components live in `src/`.

> The `backend` folder is ignored for this milestone.

## Thinking in React

- Static UI first: all pages were built as React components with hard-coded markup.
- Converted to stateful components: menus, forms, dropdowns now use React state.
- Interactivity added after the static layout was complete.

## Make It Interactive (6 pts)

- **Buttons and links** use React handlers for logical navigation and actions.
- **LocalStorage** is used to persist form inputs and cart contents until browser reload.
- **Dropdowns**, **toggles**, and **expanding sections** update on click and close on outside click.
- **Image uploads** are simulated by using placeholder images imported as assets.
- No crashes or unresponsive behavior—edge-case handling is implemented on all handlers.

## Subpages (6 pts)

- React Router defines three main routes:
  - `/` → Home
  - `/catering` → Services (catering form)
  - `/menu` → Menu
  - `*` → 404 Not Found
- Links and back/forward buttons work as expected.
- URL hashes scroll to anchors (e.g. “About”) without full page reload.

## Forms (6 pts)

- All `<label>` elements use `htmlFor`.
- `useId()` and consistent `id` attributes generate unique identifiers.
- The catering form uses a single `useState` object and `onChange` handlers.
- Validation prevents submission until all required fields are filled.
- Submission triggers a loading spinner and notification message.

## Minimum Viable Product (6 pts)

- Mock data: menus, reviews, carousel images, and sample items are hard-coded or fetched via a simulated delay.
- Guest can add menu items to cart, adjust quantities, and see totals update in real time.
- Catering form accepts input and displays a confirmation message.
- Language toggle persists selection across subpages until reload.
- Dark mode toggle persists in `document.documentElement` class until reload.

## Other Requirements

- **React framework**: All UI is implemented in React + TypeScript. No vanilla-JS jQuery.
- **Responsive design**: Tailwind breakpoints (`sm`, `md`, `lg`) ensure layouts adapt to mobile, tablet, and desktop without horizontal scrollbars.
- **Accessibility**:
  - Semantic HTML (`<nav>`, `<main>`, `<section>`, `<button>`, etc.)
  - `aria-label` used on interactive elements (e.g. language toggle, skip links).
  - Keyboard focus styles and `cursor: pointer` on buttons.
- **Dark mode**: Toggle in settings modal and fixed language switcher; all components adapt via `dark:` variants.
- **Usability**: Components are self-documented and navigable; consistent design tokens are used for spacing and colors.

## Submission

1. Commit and push all changes to your public GitHub repository.
2. In Canvas, submit the repository URL.
3. Ensure that the `frontend` folder contains your working Vite/React app.

---

### Rubric Alignment

| Criterion                         | How It’s Met                                                      |
| --------------------------------- |----------------------------------------------------------------- |
| MVP and functionality (6 pts)     | Mocked data, cart, forms, navigation flows, language toggle      |
| Interactivity (6 pts)             | State updates, persistent LocalStorage, no crashes               |
| Technical requirements (6 pts)    |  Responsive layouts, accessibility considerations, dark mode       |                                                               |
