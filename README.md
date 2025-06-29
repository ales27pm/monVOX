# monVOX - Privacy-First AI Assistant

<div align="center">

![monVOX Logo](https://img.shields.io/badge/monVOX-Privacy--First%20AI-blue?style=for-the-badge)

**A secure, on-device AI assistant built with React Native and Expo**

[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React Native](https://img.shields.io/badge/React%20Native-0.79.2-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~53.0.9-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-~5.8.3-blue.svg)](https://www.typescriptlang.org/)

</div>

## 🌟 Overview

monVOX is a privacy-first AI assistant designed to keep all your data secure and local. Built with React Native and Expo, it offers a native iOS experience while maintaining complete data privacy through on-device processing and biometric security.

### 🎯 Key Principles
- **Privacy by Design**: Your data never leaves your device
- **Security First**: Biometric authentication and encrypted storage  
- **Native Experience**: Follows Apple's Human Interface Guidelines
- **Open Source**: Transparent and auditable codebase

## ✨ Features

### 🔐 **Security & Privacy**
- **🔒 Biometric Authentication**: Face ID/Touch ID protection
- **📱 On-Device Processing**: All AI computations happen locally
- **🛡️ Encrypted Storage**: SQLite databases with encryption
- **📋 Audit Logging**: Complete security event tracking
- **⚡ Emergency Wipe**: Panic button for instant data deletion

### 🤖 **AI Capabilities**  
- **💬 Streaming Conversations**: Real-time token-by-token responses
- **🧠 Contextual Memory**: Intelligent conversation history
- **🇫🇷 French Canadian**: Native French language support
- **🔊 Text-to-Speech**: Optional voice output
- **🔄 Multi-Model Support**: Anthropic Claude, OpenAI GPT-4, Grok

### 📱 **User Experience**
- **🚀 Interactive Onboarding**: Step-by-step setup flow
- **🎨 Native iOS Design**: Apple HIG compliant interface
- **📊 Memory Explorer**: Browse and search conversation history
- **⚙️ Advanced Settings**: Complete privacy control dashboard
- **🌙 Dark Mode Support**: Adaptive theming (coming soon)

## 🏗️ Architecture

### **Project Structure**
```
monVOX/
├── src/
│   ├── services/          # Core business logic
│   │   ├── AuthenticationService.ts    # Biometric authentication
│   │   ├── AssistantService.ts         # AI conversation management
│   │   ├── LLMProvider.ts             # AI model abstraction layer
│   │   ├── MemoryService.ts           # Local data storage
│   │   ├── AuditService.ts            # Security audit logging
│   │   ├── FeatureFlagService.ts      # Feature flag management
│   │   ├── PerformanceMonitor.ts      # Performance tracking
│   │   └── SecretsManager.ts          # Secure credentials management
│   ├── screens/           # UI screens
│   │   ├── OnboardingScreen.tsx       # Welcome & setup
│   │   ├── ChatScreen.tsx             # Main conversation UI
│   │   ├── SettingsScreen.tsx         # Privacy controls
│   │   └── DeveloperSettingsScreen.tsx # Advanced debugging
│   ├── components/        # Reusable UI components
│   ├── state/            # Zustand state management
│   ├── types/            # TypeScript type definitions
│   └── api/              # AI service integrations
├── specialenv/           # Secure environment variables
└── scripts/              # Build and security scripts
```

### **Technology Stack**

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | React Native 0.79.2 | Cross-platform mobile development |
| **Platform** | Expo ~53.0.9 | Development and build tooling |
| **Language** | TypeScript ~5.8.3 | Type-safe development |
| **Styling** | NativeWind + Tailwind CSS | Utility-first styling |
| **State** | Zustand + AsyncStorage | State management with persistence |
| **Database** | SQLite (expo-sqlite) | Local encrypted storage |
| **Authentication** | expo-local-authentication | Biometric security |
| **Navigation** | React Navigation v7 | Native stack navigation |
| **AI Models** | Anthropic, OpenAI, Grok | Multi-provider AI support |

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ or Bun
- iOS Simulator (for development)
- Xcode (for iOS builds)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/ales27pm/monVOX.git
   cd monVOX
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   bun run start
   # or
   npm run start
   ```

4. **Run on iOS**
   ```bash
   # iOS Simulator
   bun run ios
   
   # Or press 'i' in the Expo CLI
   ```

### **Development Setup**

The app comes with pre-configured API keys for development. For production deployment, you'll need to:

1. **Configure AI API Keys** (optional for demo)
   ```bash
   # Add to specialenv/.env
   EXPO_PUBLIC_VIBECODE_ANTHROPIC_API_KEY=your_key_here
   EXPO_PUBLIC_VIBECODE_OPENAI_API_KEY=your_key_here
   EXPO_PUBLIC_VIBECODE_GROK_API_KEY=your_key_here
   ```

2. **Run Security Check**
   ```bash
   bun run security-check
   ```

## 🔧 Configuration

### **Feature Flags**
monVOX uses a comprehensive feature flag system for trunk-based development:

```typescript
// Core AI Features
LOCAL_LLM: false,              // On-device model processing
STREAMING_RESPONSES: true,     // Real-time response streaming
CONTEXT_MEMORY: true,          // Conversation memory

// Privacy & Security  
STRICT_LOCAL_MODE: true,       // Force on-device processing
ENHANCED_ENCRYPTION: true,     // Advanced encryption
AUDIT_LOGGING: true,          // Security audit trail

// Development
DEBUG_MODE: __DEV__,          // Debug logging
MOCK_AUTHENTICATION: __DEV__, // Demo biometrics
```

### **Environment Configuration**
```bash
# Development
EXPO_PUBLIC_ENVIRONMENT=development

# Production  
EXPO_PUBLIC_ENVIRONMENT=production
EXPO_PUBLIC_API_BASE_URL=https://api.vibecode.com
```

## 🛡️ Security Model

### **Multi-Layered Security**

1. **Authentication Layer**
   - Biometric authentication (Face ID/Touch ID)
   - Session management with automatic timeout
   - Multi-factor authentication for sensitive operations

2. **Data Protection**
   - AES-256 encryption for stored data  
   - Secure keychain storage for credentials
   - Memory-safe data handling

3. **Network Security**
   - Certificate pinning for API calls
   - Request signing and validation
   - No data transmission in strict local mode

4. **Audit & Compliance**
   - Complete audit trail of all operations
   - Security event logging and alerting
   - Compliance with privacy regulations

### **Privacy Features**
- **Zero Data Collection**: No analytics or telemetry
- **Local Processing**: All AI inference on-device
- **Encrypted Storage**: Full database encryption
- **Audit Transparency**: Complete operation logging
- **User Control**: Granular privacy settings

## 📊 Performance

### **Benchmarks**
- **Cold Start**: < 2 seconds average
- **Response Time**: < 500ms for local operations
- **Memory Usage**: Optimized for mobile constraints
- **Battery Impact**: Minimal background processing

### **Monitoring**
Built-in performance monitoring tracks:
- API response times
- Memory usage patterns
- Battery consumption
- User interaction metrics

## 🧪 Testing

### **Quality Assurance**
```bash
# Type checking
bunx tsc --noEmit

# Security verification
bun run security-check

# Performance testing
bun run test:performance
```

### **Test Coverage**
- Unit tests for core services
- Integration tests for AI workflows
- Security penetration testing
- Performance benchmarking

## 🤝 Contributing

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run security checks
5. Submit a pull request

### **Code Standards**
- TypeScript for type safety
- ESLint + Prettier for formatting
- Conventional commits for changelog
- Security-first development practices

### **Areas for Contribution**
- Additional AI model integrations
- Enhanced privacy features
- Performance optimizations
- Accessibility improvements
- Localization support

## 📈 Roadmap

### **Near Term (Q1 2025)**
- [ ] Android support
- [ ] Voice input capabilities
- [ ] Enhanced memory search
- [ ] Plugin architecture

### **Medium Term (Q2 2025)**
- [ ] On-device model training
- [ ] Advanced automation
- [ ] Multi-language support
- [ ] Encrypted sync options

### **Long Term (2025+)**
- [ ] Web interface
- [ ] Desktop applications
- [ ] Enterprise features
- [ ] Federation protocols

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original Swift implementation inspiration
- React Native and Expo communities
- Privacy-focused development principles
- Open source AI model providers

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ales27pm/monVOX/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ales27pm/monVOX/discussions)
- **Security**: Contact maintainers privately for security issues

---

<div align="center">

**monVOX - Your privacy is not negotiable**

Made with ❤️ for privacy-conscious users

</div>