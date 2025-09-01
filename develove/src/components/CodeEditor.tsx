"use client";

import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (code: string) => void;
}

export function CodeEditor({ code, language, onChange }: CodeEditorProps) {
  const getLanguage = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'javascript':
      case 'js':
        return 'javascript';
      case 'typescript':
      case 'ts':
        return 'typescript';
      case 'python':
      case 'py':
        return 'python';
      case 'react':
      case 'jsx':
        return 'javascript';
      case 'tsx':
        return 'typescript';
      default:
        return 'html';
    }
  };

  const getDefaultCode = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'html':
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to My Website</h1>
        <p>This is a beautiful website created with Develove!</p>
    </div>
</body>
</html>`;
      case 'css':
        return `/* Your CSS styles here */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

p {
    font-size: 1.2rem;
    opacity: 0.9;
}`;
      case 'javascript':
      case 'js':
        return `// Your JavaScript code here
console.log('Hello from Develove!');

// Example function
function greet(name) {
    return \`Hello, \${name}! Welcome to Develove.\`;
}

// Example event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully!');
});`;
      case 'react':
      case 'jsx':
        return `import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Develove</h1>
        <p>Start building amazing React applications!</p>
      </header>
    </div>
  );
}

export default App;`;
      default:
        return code || '// Start coding here...';
    }
  };

  return (
    <div className="h-full">
      <Editor
        height="100%"
        defaultLanguage={getLanguage(language)}
        value={code || getDefaultCode(language)}
        onChange={(value) => onChange(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: 'on',
          tabCompletion: 'on',
        }}
      />
    </div>
  );
}