# Develove - Unlimited AI Website Developer

Develove is the world's first unlimited AI Website developer, allowing anyone to make as many projects and queries as possible. With local AI processing powered by Ollama, you can create professional websites and applications without any API keys or usage limits.

## 🚀 Features

- **Unlimited AI Development**: Create as many projects as you want with no restrictions
- **Local AI Processing**: Powered by Ollama for complete privacy and no API costs
- **Real-time Preview**: Live preview with StackBlitz-style web containers
- **Professional Code Editor**: Monaco Editor with syntax highlighting and IntelliSense
- **Multiple Language Support**: HTML, CSS, JavaScript, React, TypeScript, and more
- **Chat Interface**: Natural language conversations with AI to build your projects
- **Project Management**: Organize and manage multiple projects with ease
- **One-time Installation**: Install once and use forever

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Code Editor**: Monaco Editor
- **AI Backend**: Ollama with CodeLlama model
- **Real-time Preview**: Custom iframe-based preview system
- **UI Components**: Lucide React icons, Framer Motion

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd develove
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Install Develove**
   - Click the "Install Develove" button on the welcome screen
   - The installer will automatically download and set up Ollama
   - A coding model will be downloaded (CodeLlama 7B)
   - The local AI server will start automatically

## 🎯 How It Works

### The Installer System

Develove uses a unique installer system that:

1. **Downloads Ollama**: Automatically installs Ollama on your system
2. **Downloads AI Model**: Pulls the CodeLlama 7B model for coding assistance
3. **Starts Local Server**: Launches Ollama server on localhost:11434
4. **One-time Setup**: After installation, everything runs locally

### AI-Powered Development

1. **Create Projects**: Start new projects with descriptive names
2. **Chat with AI**: Describe what you want to build in natural language
3. **Real-time Code Generation**: AI generates professional, working code
4. **Live Preview**: See your code running in real-time
5. **Iterative Development**: Keep chatting to refine and improve your code

### Code/Preview Ratio

The editor features a 40:60 split:
- **Left 40%**: Chat interface for AI conversations
- **Right 60%**: Code editor and live preview with tabs

## 🎨 Features in Detail

### Project Management
- Create unlimited projects
- Edit project titles
- Delete projects
- View project statistics (message count, last updated)
- Persistent storage with Zustand

### AI Chat Interface
- Natural language conversations
- Context-aware responses
- Code generation with syntax highlighting
- Copy-to-clipboard functionality
- Message history preservation

### Code Editor
- Monaco Editor integration
- Syntax highlighting for multiple languages
- IntelliSense and autocomplete
- Dark theme
- Real-time code updates

### Live Preview
- Real-time iframe-based preview
- Support for HTML, CSS, JavaScript, React
- Interactive JavaScript execution
- Console output display
- Refresh and external link options

### Installation System
- Cross-platform Ollama installation
- Automatic model downloading
- Server status monitoring
- Installation progress tracking
- Error handling and fallbacks

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: Custom Ollama server URL
OLLAMA_SERVER_URL=http://localhost:11434

# Optional: Custom model name
OLLAMA_MODEL=codellama:7b
```

### Customization

You can customize various aspects of Develove:

1. **AI Model**: Change the model in `/src/app/api/chat/route.ts`
2. **UI Theme**: Modify Tailwind classes in components
3. **Preview System**: Extend the preview functionality in `/src/components/Preview.tsx`
4. **Code Templates**: Add new language templates in `/src/components/CodeEditor.tsx`

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js
   - Deploy with default settings

3. **Install Ollama on Server**
   - Add a build script to install Ollama
   - Configure environment variables
   - Set up the AI model

### Docker Deployment

```dockerfile
FROM node:18-alpine

# Install Ollama
RUN apk add --no-cache curl
RUN curl -fsSL https://ollama.ai/install.sh | sh

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/develove/issues) page
2. Ensure Ollama is running: `ollama serve`
3. Verify the model is downloaded: `ollama list`
4. Check the browser console for errors

## 🎉 Acknowledgments

- [Ollama](https://ollama.ai/) for local AI processing
- [CodeLlama](https://github.com/facebookresearch/codellama) for the coding model
- [Next.js](https://nextjs.org/) for the framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

**Develove** - The future of AI-powered development is here, and it's unlimited! 🚀
