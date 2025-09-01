"use client";

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStore } from '@/store/store';
import { Editor } from '@/components/Editor';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const { chats, setCurrentChat } = useStore();
  
  const chatId = params.id as string;
  const chat = chats.find(c => c.id === chatId);

  useEffect(() => {
    if (chatId && chat) {
      setCurrentChat(chatId);
    } else if (chatId && !chat) {
      // Chat doesn't exist, redirect to home
      router.push('/');
    }
  }, [chatId, chat, setCurrentChat, router]);

  if (!chat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return <Editor />;
}