"use client";

import { useState } from 'react';
import { Clock, MessageSquare, Trash2, Edit3, Code } from 'lucide-react';
import { Chat } from '@/store/store';
import { useStore } from '@/store/store';

interface ChatCardProps {
  chat: Chat;
  onClick: () => void;
}

export function ChatCard({ chat, onClick }: ChatCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(chat.title);
  const { updateChatTitle, deleteChat } = useStore();

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTitle.trim()) {
      updateChatTitle(chat.id, editTitle);
      setIsEditing(false);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      deleteChat(chat.id);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const messageCount = chat.messages.length;
  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {isEditing ? (
            <form onSubmit={handleEdit} className="flex items-center space-x-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                onBlur={() => setIsEditing(false)}
                autoFocus
              />
            </form>
          ) : (
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {chat.title}
            </h3>
          )}
        </div>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <MessageSquare className="h-4 w-4" />
          <span>{messageCount} message{messageCount !== 1 ? 's' : ''}</span>
        </div>

        {chat.currentCode && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Code className="h-4 w-4" />
            <span>{chat.currentLanguage.toUpperCase()}</span>
          </div>
        )}

        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{formatDate(chat.updatedAt)}</span>
        </div>

        {lastMessage && (
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {lastMessage.content}
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-500">
            Created {formatDate(chat.createdAt)}
          </span>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}