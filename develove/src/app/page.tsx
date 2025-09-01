"use client";

import { useState, useEffect } from "react";
import { Installer } from "@/components/Installer";
import { ChatView } from "@/components/ChatView";

export default function Home() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if installer is already installed
    const checkInstallation = async () => {
      try {
        const response = await fetch('/api/check-installation');
        const { installed } = await response.json();
        setIsInstalled(installed);
      } catch (error) {
        console.error('Error checking installation:', error);
        setIsInstalled(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkInstallation();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
          <h2 className="text-white text-xl mt-4">Loading Develove...</h2>
        </div>
      </div>
    );
  }

  if (!isInstalled) {
    return <Installer onInstall={() => setIsInstalled(true)} />;
  }

  return <ChatView />;
}
