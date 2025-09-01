import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  code?: string;
  language?: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  currentCode: string;
  currentLanguage: string;
}

interface DeveloveStore {
  chats: Chat[];
  currentChatId: string | null;
  isInstalled: boolean;
  isServerRunning: boolean;
  
  // Chat actions
  createChat: (title?: string) => string;
  deleteChat: (id: string) => void;
  updateChatTitle: (id: string, title: string) => void;
  setCurrentChat: (id: string) => void;
  
  // Message actions
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (chatId: string, messageId: string, updates: Partial<Message>) => void;
  
  // Code actions
  updateCurrentCode: (chatId: string, code: string, language?: string) => void;
  
  // Installation actions
  setInstalled: (installed: boolean) => void;
  setServerRunning: (running: boolean) => void;
}

export const useStore = create<DeveloveStore>()(
  persist(
    (set) => ({
      chats: [],
      currentChatId: null,
      isInstalled: false,
      isServerRunning: false,

      createChat: (title = 'New Project') => {
        const newChat: Chat = {
          id: crypto.randomUUID(),
          title,
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          currentCode: '',
          currentLanguage: 'html',
        };

        set((state) => ({
          chats: [newChat, ...state.chats],
          currentChatId: newChat.id,
        }));

        return newChat.id;
      },

      deleteChat: (id: string) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== id),
          currentChatId: state.currentChatId === id ? null : state.currentChatId,
        }));
      },

      updateChatTitle: (id: string, title: string) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === id ? { ...chat, title, updatedAt: new Date() } : chat
          ),
        }));
      },

      setCurrentChat: (id: string) => {
        set({ currentChatId: id });
      },

      addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => {
        const newMessage: Message = {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        };

        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [...chat.messages, newMessage],
                  updatedAt: new Date(),
                }
              : chat
          ),
        }));
      },

      updateMessage: (chatId: string, messageId: string, updates: Partial<Message>) => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: chat.messages.map((msg) =>
                    msg.id === messageId ? { ...msg, ...updates } : msg
                  ),
                  updatedAt: new Date(),
                }
              : chat
          ),
        }));
      },

      updateCurrentCode: (chatId: string, code: string, language = 'html') => {
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  currentCode: code,
                  currentLanguage: language,
                  updatedAt: new Date(),
                }
              : chat
          ),
        }));
      },

      setInstalled: (installed: boolean) => {
        set({ isInstalled: installed });
      },

      setServerRunning: (running: boolean) => {
        set({ isServerRunning: running });
      },
    }),
    {
      name: 'develove-store',
      partialize: (state) => ({
        chats: state.chats,
        currentChatId: state.currentChatId,
        isInstalled: state.isInstalled,
      }),
    }
  )
);