"use client";

import { useState } from 'react';
import { User, Bot, Copy, Check } from 'lucide-react';
import { Message } from '@/store/store';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <div className={`flex space-x-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          message.role === 'user' 
            ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
            : 'bg-gradient-to-r from-green-500 to-teal-500'
        }`}>
          {message.role === 'user' ? (
            <User className="h-4 w-4 text-white" />
          ) : (
            <Bot className="h-4 w-4 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col space-y-2 ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-2xl px-4 py-3 max-w-full ${
            message.role === 'user'
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
          }`}>
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>

          {/* Code Block */}
          {message.code && (
            <div className="w-full max-w-full">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                  <span className="text-sm text-gray-300 font-medium">
                    {message.language?.toUpperCase() || 'CODE'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(message.code!)}
                    className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-4">
                  <SyntaxHighlighter
                    language={message.language || 'javascript'}
                    style={tomorrow}
                    customStyle={{
                      margin: 0,
                      background: 'transparent',
                      fontSize: '14px',
                    }}
                  >
                    {message.code}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          )}

          {/* Timestamp */}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}