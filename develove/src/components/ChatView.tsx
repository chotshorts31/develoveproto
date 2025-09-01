"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, MessageSquare } from 'lucide-react';
import { useStore } from '@/store/store';
import { ChatCard } from './ChatCard';
import { Editor } from './Editor';

export function ChatView() {
  const { chats, currentChatId, createChat, setCurrentChat } = useStore();
  const router = useRouter();
  const [showCreatePrompt, setShowCreatePrompt] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState('');

  const handleCreateChat = () => {
    if (newChatTitle.trim()) {
      const chatId = createChat(newChatTitle);
      setCurrentChat(chatId);
      router.push(`/chat/${chatId}`);
      setNewChatTitle('');
      setShowCreatePrompt(false);
    }
  };

  const handleChatClick = (chatId: string) => {
    setCurrentChat(chatId);
    router.push(`/chat/${chatId}`);
  };

  if (currentChatId) {
    return <Editor />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Develove
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Your AI-powered development workspace
            </p>
          </div>
          <button
            onClick={() => setShowCreatePrompt(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Project</span>
          </button>
        </div>

        {/* Create Chat Prompt */}
        {showCreatePrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Create New Project
              </h3>
              <input
                type="text"
                value={newChatTitle}
                onChange={(e) => setNewChatTitle(e.target.value)}
                placeholder="Enter project name..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateChat()}
              />
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={handleCreateChat}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg font-semibold"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreatePrompt(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chats Grid */}
        {chats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {chats.map((chat) => (
              <ChatCard
                key={chat.id}
                chat={chat}
                onClick={() => handleChatClick(chat.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 max-w-md mx-auto shadow-lg">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No projects yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start your first AI-powered development project
              </p>
              <button
                onClick={() => setShowCreatePrompt(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                Create Your First Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}