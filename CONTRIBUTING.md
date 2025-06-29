# Contributing to monVOX

Thank you for your interest in contributing to monVOX! This document provides guidelines for contributing to this privacy-first AI assistant project.

## 🎯 Our Mission

monVOX is built with privacy and security as core principles. All contributions should align with these values:

- **Privacy by Design**: User data should never leave the device unnecessarily
- **Security First**: All features should be secure by default
- **Transparency**: Code should be auditable and well-documented
- **User Control**: Users should have granular control over their data and privacy

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- iOS development environment (Xcode, iOS Simulator)
- Git

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/monVOX.git
   cd monVOX
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start the development server**
   ```bash
   bun run start
   ```

4. **Run on iOS Simulator**
   ```bash
   bun run ios
   ```

## 📋 Development Guidelines

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check code style
bun run lint

# Fix formatting issues
bun run lint:fix

# Type checking
bun run type-check
```

### Code Standards

- **TypeScript**: All new code should be written in TypeScript
- **Functional Components**: Use React functional components with hooks
- **Error Handling**: Implement comprehensive error handling
- **Security**: Follow secure coding practices
- **Performance**: Consider performance implications of all changes

### File Organization

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── services/       # Business logic and external integrations
├── state/          # State management (Zustand)
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── api/            # API integrations
```

## 🔒 Security Guidelines

### Sensitive Data Handling

- Never commit API keys or secrets to version control
- Use secure storage mechanisms (Keychain, SecureStore)
- Implement proper data encryption
- Follow principle of least privilege

### Authentication & Authorization

- Always validate user permissions
- Implement proper session management
- Use biometric authentication where available
- Provide graceful fallbacks for security features

### Privacy Considerations

- Minimize data collection
- Implement data retention policies
- Provide clear privacy controls
- Ensure GDPR/CCPA compliance

## 🧪 Testing

### Running Tests

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Generate coverage report
bun run test:coverage
```

### Test Types

- **Unit Tests**: For individual functions and components
- **Integration Tests**: For service interactions
- **Security Tests**: For authentication and data protection
- **Performance Tests**: For response times and memory usage

### Writing Tests

- Write tests for all new features
- Include edge cases and error scenarios
- Mock external dependencies
- Test security-sensitive code thoroughly

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code restructuring
test: adding tests
chore: maintenance tasks
security: security improvements
perf: performance improvements
```

Examples:
```
feat(chat): implement streaming responses
fix(auth): resolve biometric fallback issue
security(storage): add encryption for user data
docs(readme): update installation instructions
```

## 🔍 Pull Request Process

### Before Submitting

1. **Run all checks**
   ```bash
   bun run precommit
   ```

2. **Test your changes**
   - Manual testing on iOS
   - Run automated tests
   - Check performance impact

3. **Update documentation**
   - Update README if needed
   - Add inline code comments
   - Update type definitions

### PR Template

Please include:

- **Description**: What changes were made and why
- **Testing**: How the changes were tested
- **Security**: Any security implications
- **Breaking Changes**: Any breaking changes
- **Screenshots**: For UI changes

### Review Process

1. Automated checks must pass
2. Security review for sensitive changes
3. Code review by maintainers
4. Testing by reviewers
5. Final approval and merge

## 🎨 UI/UX Guidelines

### Design Principles

- Follow Apple Human Interface Guidelines
- Maintain consistency with existing design
- Prioritize accessibility
- Provide clear privacy indicators

### Component Guidelines

- Create reusable components
- Implement proper loading states
- Handle error states gracefully
- Support dark mode (when available)

### Accessibility

- Add proper accessibility labels
- Support screen readers
- Ensure sufficient color contrast
- Test with assistive technologies

## 🌍 Internationalization

### Language Support

- French Canadian (primary)
- English (secondary)
- Follow i18n best practices
- Use proper date/time formatting

### Adding Translations

1. Add translation keys to language files
2. Use translation hooks in components
3. Test with different languages
4. Consider text expansion/contraction

## 🚨 Reporting Issues

### Security Issues

**DO NOT** open public issues for security vulnerabilities.

Instead:
1. Email security issues privately to maintainers
2. Include detailed reproduction steps
3. Allow reasonable time for fix before disclosure

### Bug Reports

Include:
- Device and iOS version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos if helpful
- Relevant logs or error messages

### Feature Requests

- Describe the use case
- Explain how it aligns with privacy principles
- Consider implementation complexity
- Discuss potential security implications

## 📈 Performance Guidelines

### Optimization Principles

- Minimize bundle size
- Optimize image assets
- Use lazy loading where appropriate
- Implement proper caching strategies

### Monitoring

- Use performance monitoring tools
- Track key metrics (startup time, memory usage)
- Optimize for older devices
- Consider battery impact

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on the code, not the person

### Communication

- Use clear, professional language
- Provide context for decisions
- Ask questions when unclear
- Share knowledge and resources

## 📚 Resources

### Documentation

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)

### Tools

- [React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
- [Flipper](https://fbflipper.com/) for debugging
- [Reactotron](https://github.com/infinitered/reactotron) for development

### Learning

- [React Native Best Practices](https://github.com/react-native-community/discussions-and-proposals)
- [Mobile Security Guidelines](https://owasp.org/www-project-mobile-security/)
- [Privacy by Design Principles](https://www.ipc.on.ca/wp-content/uploads/resources/7foundationalprinciples.pdf)

## 🙏 Recognition

Contributors will be recognized in:
- README.md acknowledgments
- Release notes for significant contributions
- GitHub contributor graph
- Special mention for security contributions

## 📞 Getting Help

- **GitHub Discussions**: For general questions
- **GitHub Issues**: For bug reports and feature requests
- **Code Review**: For feedback on contributions
- **Documentation**: Check existing docs first

---

Thank you for contributing to monVOX and helping build a more private and secure AI assistant! 🚀