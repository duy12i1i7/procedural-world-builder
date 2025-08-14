# Contributing to Procedural World Builder

Thank you for your interest in contributing to the Procedural World Builder project! 🎉

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/procedural-world-builder.git
   cd procedural-world-builder
   ```
3. **Install dependencies**:
   ```bash
   npm run install:all
   ```
4. **Set up environment variables**:
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   # Edit the .env files with your API keys
   ```
5. **Start development server**:
   ```bash
   npm run dev
   ```

## 📝 How to Contribute

### 🐛 Bug Reports
- Use the GitHub issue tracker
- Include steps to reproduce
- Provide system information (OS, Node.js version, browser)
- Include error messages and screenshots if applicable

### ✨ Feature Requests
- Open an issue with the "enhancement" label
- Describe the feature and its use case
- Explain why it would be valuable to users

### 🔧 Code Contributions

#### Before You Start
- Check existing issues and PRs to avoid duplicates
- Discuss major changes in an issue first
- Follow the existing code style and conventions

#### Development Workflow
1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Write clean, documented code
   - Follow existing patterns and conventions
   - Add tests for new functionality

3. **Test your changes**:
   ```bash
   npm run test        # Run tests
   npm run lint        # Check code style
   npm run build       # Ensure build works
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create PR**:
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub.

## 📋 Code Style Guidelines

### JavaScript/React
- Use ES6+ features
- Prefer functional components with hooks
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Follow existing component structure

### CSS
- Use Tailwind CSS utility classes
- Keep custom CSS minimal
- Use CSS variables for theming
- Ensure responsive design

### API Development
- Use RESTful conventions
- Validate all inputs with Joi
- Include proper error handling
- Document new endpoints in API.md

## 🧪 Testing Guidelines

### Frontend Tests
- Write tests for components using React Testing Library
- Test user interactions and edge cases
- Mock external dependencies

### Backend Tests
- Write unit tests for services and utilities
- Test API endpoints with integration tests
- Mock external APIs (OpenAI, Azure)

### 3D/Three.js Tests
- Test scene generation logic
- Verify object positioning and scaling
- Test animation calculations

## 📚 Documentation

- Update README.md for user-facing changes
- Update API.md for new endpoints
- Add inline code comments for complex logic
- Include examples in documentation

## 🎯 Pull Request Guidelines

### PR Title Format
- `feat: add new feature`
- `fix: resolve issue with X`
- `docs: update documentation`
- `refactor: improve code structure`
- `test: add tests for X`

### PR Description
Include:
- What changes were made
- Why the changes were necessary
- How to test the changes
- Screenshots for UI changes
- Breaking changes (if any)

### Review Process
- All PRs require at least one review
- Address review feedback promptly
- Keep PRs focused and reasonably sized
- Ensure CI checks pass

## 🌟 Recognition

Contributors will be:
- Listed in the project contributors
- Mentioned in release notes for significant contributions
- Invited to join the core team for outstanding contributions

## 📞 Getting Help

- **Discord**: [Join our community]
- **GitHub Issues**: For bug reports and feature requests
- **Email**: [project-email] for private inquiries

## 📋 Areas We Need Help With

### High Priority
- [ ] Unit and integration tests
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Accessibility improvements

### Medium Priority
- [ ] Additional 3D primitives and materials
- [ ] More animation presets
- [ ] Advanced camera controls
- [ ] Export format options

### Low Priority
- [ ] Themes and customization
- [ ] Plugin system
- [ ] Collaborative editing
- [ ] VR/AR support

## 🤝 Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Expected Behavior
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior
- Harassment of any kind
- Discriminatory language or actions
- Personal attacks or trolling
- Publishing private information without permission
- Any conduct that could reasonably be considered inappropriate

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Procedural World Builder! 🚀✨
