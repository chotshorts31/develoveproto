"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { RefreshCw, ExternalLink, Play } from 'lucide-react';

interface PreviewProps {
  code: string;
  language: string;
}

export function Preview({ code, language }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createHTMLDocument = (code: string, lang: string) => {
    if (lang.toLowerCase() === 'html') {
      return code;
    }

    if (lang.toLowerCase() === 'css') {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <style>
${code}
    </style>
</head>
<body>
    <div class="container">
        <h1>CSS Preview</h1>
        <p>This is a preview of your CSS styles.</p>
        <div class="example-box">
            <h2>Example Content</h2>
            <p>This box demonstrates your CSS styling.</p>
        </div>
    </div>
</body>
</html>`;
    }

    if (lang.toLowerCase() === 'javascript' || lang.toLowerCase() === 'js') {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Preview</title>
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
        .output {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            min-height: 100px;
        }
        button {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 5px;
        }
        button:hover {
            background: rgba(255, 255, 255, 0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>JavaScript Preview</h1>
        <p>Check the console for output and interact with the buttons below:</p>
        
        <div class="output" id="output">
            <p>Output will appear here...</p>
        </div>
        
        <div>
            <button onclick="runCode()">Run Code</button>
            <button onclick="clearOutput()">Clear Output</button>
        </div>
    </div>

    <script>
        // Override console.log to display in the output div
        const originalLog = console.log;
        const outputDiv = document.getElementById('output');
        
        console.log = function(...args) {
            originalLog.apply(console, args);
            const message = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            
            const p = document.createElement('p');
            p.textContent = message;
            p.style.margin = '5px 0';
            p.style.fontFamily = 'monospace';
            p.style.fontSize = '14px';
            outputDiv.appendChild(p);
        };

        function clearOutput() {
            outputDiv.innerHTML = '<p>Output cleared...</p>';
        }

        function runCode() {
            clearOutput();
            try {
                // Execute the user's code
                ${code}
            } catch (error) {
                console.error('Error:', error.message);
            }
        }

        // Auto-run code when page loads
        window.addEventListener('load', runCode);
    </script>
</body>
</html>`;
    }

    if (lang.toLowerCase() === 'react' || lang.toLowerCase() === 'jsx') {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Preview</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
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
        .App {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>React Preview</h1>
        <div id="root"></div>
    </div>

    <script type="text/babel">
        ${code}
        
        // Render the component
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>`;
    }

    // Default HTML template
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
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
        pre {
            background: rgba(0, 0, 0, 0.3);
            padding: 20px;
            border-radius: 10px;
            overflow-x: auto;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Code Preview</h1>
        <p>Language: ${lang}</p>
        <pre><code>${code}</code></pre>
    </div>
</body>
</html>`;
  };

  const refreshPreview = useCallback(() => {
    if (!iframeRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const htmlContent = createHTMLDocument(code, language);
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      iframeRef.current.src = url;
      
      iframeRef.current.onload = () => {
        setIsLoading(false);
        URL.revokeObjectURL(url);
      };
      
      iframeRef.current.onerror = () => {
        setError('Failed to load preview');
        setIsLoading(false);
      };
    } catch {
      setError('Error creating preview');
      setIsLoading(false);
    }
  }, [code, language]);

  useEffect(() => {
    refreshPreview();
  }, [code, language, refreshPreview]);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Preview Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">Live Preview</h3>
          {isLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={refreshPreview}
            disabled={isLoading}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors disabled:opacity-50"
            title="Refresh Preview"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => window.open(iframeRef.current?.src, '_blank')}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            title="Open in New Tab"
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 relative">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900/20">
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
              <button
                onClick={refreshPreview}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        
        {!code.trim() && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            <div className="text-center">
              <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Start coding to see the preview
              </p>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
          title="Code Preview"
        />
      </div>
    </div>
  );
}