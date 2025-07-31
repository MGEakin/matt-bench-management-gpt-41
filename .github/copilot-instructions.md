## GitHub Copilot Instructions

This file provides custom instructions to help Copilot generate higher-quality code for 
a Next.js + Tailwind project.

---
description: 'Next.js + Tailwind development standards and instructions'
applyTo: '/*.tsx, /*.ts, /*.jsx, /*.js, /*.css'
---

# Next.js + Tailwind Development Instructions

Instructions for high-quality Next.js applications with Tailwind CSS styling and TypeScript.

## Project Context

- Latest Next.js (App Router)
- TypeScript for type safety
- Tailwind CSS for styling

## General Principles

- Clean Code: Prioritize readability, maintainability, and reusability.
- Conciseness: Aim for concise and expressive code.
- Descriptive Naming: Use clear and descriptive names for variables, functions, components, and files (e.g., `getUserProfile`, `ProductCard`, `useAuth`).
- DRY (Don't Repeat Yourself): Extract reusable logic into functions, custom hooks, or components.
- Modularization: Break down complex problems and features into smaller, manageable units (components, functions, utilities).
- TypeScript First: All new code should be written in TypeScript, leveraging its type safety features.
- Testable Code: Design code to be easily testable.
- Testing Code: All webpages should be thoroughly tested using JEST.
- Package Management: This project uses npm for managing dependencies. All package installations and scripts should use `npm` or `yarn`.
- Documentation: All principal documentation should be created in the `docs` folder.

### General Guidelines

- Co-locate logic that change together
- Group code by feature, not by type
- Separate UI, logic, and data fetching
- Typesafety across the whole stack – db-server-client. If a type changes, everywhere using it should be aware.
- Clear product logic vs product infrastructure separation
- Design code such that it is easy to replace and delete
- Minimize places/number of changes to extend features
- Functions / APIs should do one thing well. One level of abstraction per function
- Minimize API interface and expose only what's necessary
- Favor pure functions, it makes logic easy to test
- Long, clear names over short, vague names, even at the cost of verbosity

## Development Standards

### Architecture
- App Router with server and client components
- Group routes by feature/domain
- Implement proper error boundaries
- Use React Server Components by default
- Leverage static optimization where possible

### TypeScript
- Strict mode enabled
- Clear type definitions
- Proper error handling with type guards
- Zod for runtime type validation

### Styling
- Use TypeScript for all new code
- Prefer functional components with hooks over class components
- Use proper typing for all props and state
- Follow the single responsibility principle
- Keep components small and focused
- Use descriptive naming for variables, functions, and components
- Write unit tests for all new components and features using Jest and React Testing Library
- Tailwind CSS with consistent color palette
- Responsive design patterns
- Dark mode support
- Follow container queries best practices
- Maintain semantic HTML structure

## Component Structure
- Place components in `src/components/`
- UI components go in `src/components/ui/`
- Pages go in `src/app/(routes)/`
- Types go in `src/types/`
- Store and utilities go in `src/lib/`

## State Management
- Use React Server Components for server-side state management
- Use Zustand for global client-side state
- Use React hooks for component-local state
- Follow immutability principles and normalize state structure
- Implement proper loading and error states
- Use optimistic updates where appropriate
- Keep state management logic separated by concern
- Minimize client-side state when possible

### Data Fetching
- Server Components for direct database queries
- React Suspense for loading states
- Proper error handling and retry logic
- Cache invalidation strategies

### Security
- Input validation and sanitization
- Proper authentication checks
- CSRF protection
- Rate limiting implementation
- Secure API route handling

## Performance
- Optimize React performance:
  - Use proper dependency arrays in hooks
  - Implement strategic memoization with useMemo and useCallback
  - Keep re-renders minimal and predictable
- Optimize assets and loading:
  - Use next/image for automatic image optimization
  - Implement next/font for optimal font loading
  - Add appropriate loading states and suspense boundaries
- Optimize bundle size and delivery:
  - Enable route prefetching for faster navigation
  - Implement proper code splitting
  - Monitor and optimize bundle size
  - Use dynamic imports for large dependencies
  - Leverage static generation where possible

## Testing
- Write tests using Vitest and React Testing Library
- Test component rendering and user interactions
- Mock external dependencies and API calls
- Follow AAA (Arrange, Act, Assert) pattern in tests

## Error Handling
- Use proper error boundaries
- Handle edge cases gracefully
- Provide meaningful error messages to users
- Log errors appropriately

## Accessibility
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Maintain proper color contrast

## Documentation
- Add JSDoc comments for functions and components
- Document complex logic and business rules
- Keep README.md up to date
- Document API endpoints and data structures

## Implementation Process
1. Plan component hierarchy
2. Define types and interfaces
3. Implement server-side logic
4. Build client components
5. Add proper error handling
6. Implement responsive styling
7. Add loading states
8. Write tests
9. Review and refactor code
10. Run linter and formatter