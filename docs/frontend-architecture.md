# Frontend Architecture & Standards

This document describes the architecture, standards, and best practices for the Employee Management Web App frontend.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Zustand (global state)
- Zod (runtime validation)
- React Testing Library & Vitest (testing)

## Structure

- `src/app/` - Pages and main app logic
- `src/components/` - Feature components
- `src/components/ui/` - Reusable UI components
- `src/types/` - Type definitions and schemas
- `src/store/` - Zustand global state
- `docs/` - Documentation

## Key Practices

- Functional components and hooks
- Strict TypeScript typing
- Zod for runtime validation
- Error boundaries for graceful error handling
- Responsive and dark mode styling with Tailwind
- Accessibility: semantic HTML, ARIA roles, color contrast
- Unit tests for all components and pages
- Global state via Zustand
- Async data with Suspense and loading states

## Extending

- Add new features as modular components
- Document new business logic in `docs/`
- Add new types in `src/types/`
- Add new UI elements in `src/components/ui/`

## Testing

- Use Vitest and React Testing Library
- Follow AAA (Arrange, Act, Assert) pattern
- Mock API calls and external dependencies

## Error Handling

- Use ErrorBoundary for global errors
- Validate API responses with Zod

## Accessibility

- Use semantic HTML and ARIA attributes
- Ensure keyboard navigation and color contrast

## Contact

For questions, see the main README or contact the project maintainer.
