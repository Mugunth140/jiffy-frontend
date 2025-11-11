# Contributing to Jiffy

Thank you for your interest in contributing to Jiffy! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

Be respectful and inclusive in all interactions. We're building a welcoming community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/jiffy-frontend.git`
3. Install dependencies: `npm install --legacy-peer-deps`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### Running the App

```bash
npm start
```

This starts the Expo development server. You can then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan the QR code with Expo Go on your device

### Linting

Before committing, ensure your code passes linting:

```bash
npm run lint
```

### Type Checking

Ensure TypeScript types are correct:

```bash
npx tsc --noEmit
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── services/       # Business logic and data layer
├── navigation/     # Navigation configuration
└── types/          # TypeScript type definitions
```

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define interfaces for all data structures
- Avoid `any` type unless absolutely necessary
- Use strict type checking

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use meaningful component and prop names

### Styling

- Use StyleSheet.create() for all styles
- Follow the existing color palette and spacing system
- Ensure designs work on different screen sizes
- Test on both iOS and Android

### File Naming

- Components: PascalCase (e.g., `TaskItem.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Types: PascalCase (e.g., `Task.ts`)

## Making Changes

### Adding a New Feature

1. Create a new branch from `main`
2. Implement your feature following the existing patterns
3. Update relevant documentation
4. Test on both iOS and Android if possible
5. Submit a pull request

### Fixing a Bug

1. Create an issue describing the bug (if one doesn't exist)
2. Create a branch referencing the issue: `fix/issue-number-description`
3. Fix the bug with minimal changes
4. Add a test to prevent regression (if possible)
5. Submit a pull request referencing the issue

### Example: Adding a New Screen

1. Create screen component in `src/screens/`
2. Add navigation types in `src/navigation/types.ts`
3. Register screen in `src/navigation/AppNavigator.tsx`
4. Update relevant services if needed
5. Test navigation flow

### Example: Adding a New Task Property

1. Update `Task` interface in `src/types/index.ts`
2. Update `StorageService` if storage logic changes
3. Update `TaskManager` to handle the new property
4. Update UI components to display/edit the property
5. Test data persistence

## Pull Request Process

1. Update the README.md or ARCHITECTURE.md if needed
2. Ensure all linting passes
3. Ensure TypeScript compilation succeeds
4. Provide a clear description of changes
5. Reference any related issues
6. Request review from maintainers

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested the changes

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows project style guidelines
- [ ] Lint checks pass
- [ ] TypeScript compilation succeeds
- [ ] Tested on iOS/Android
- [ ] Documentation updated
```

## Commit Messages

Use clear, descriptive commit messages:

- `feat: Add task filtering by priority`
- `fix: Correct task deletion bug`
- `docs: Update README with new features`
- `refactor: Simplify TaskManager logic`
- `style: Fix linting issues`

## Areas for Contribution

### High Priority

- Cloud sync implementation
- Dark mode support
- Task search functionality
- Due date reminders
- Better error handling

### Medium Priority

- Task categories/tags
- Recurring tasks
- Export/import functionality
- Performance optimizations
- Accessibility improvements

### Documentation

- API documentation
- User guides
- Architecture diagrams
- Code examples

## Getting Help

- Open an issue for bug reports or feature requests
- Join discussions in existing issues
- Check ARCHITECTURE.md for technical details

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## Recognition

Contributors will be acknowledged in the project README and release notes.

Thank you for contributing to Jiffy! 🎉
