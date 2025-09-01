"use client";

import { useState } from 'react';
import { Download, Code, Zap, Globe, CheckCircle } from 'lucide-react';
import { useStore } from '@/store/store';
import toast from 'react-hot-toast';

interface InstallerProps {
  onInstall: () => void;
}

export function Installer({ onInstall }: InstallerProps) {
  const [isInstalling, setIsInstalling] = useState(false);
  const [installStep, setInstallStep] = useState(0);
  const { setInstalled, setServerRunning } = useStore();

  const installSteps = [
    {
      title: 'Download Ollama',
      description: 'Installing Ollama for local AI processing',
      icon: Download,
    },
    {
      title: 'Download Model',
      description: 'Downloading the latest coding model',
      icon: Code,
    },
    {
      title: 'Start Server',
      description: 'Starting the local AI server',
      icon: Zap,
    },
    {
      title: 'Ready to Code',
      description: 'Develove is ready to create amazing websites',
      icon: Globe,
    },
  ];

  const handleInstall = async () => {
    setIsInstalling(true);
    
    try {
      // Step 1: Download Ollama
      setInstallStep(0);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Step 2: Download Model
      setInstallStep(1);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Step 3: Start Server
      setInstallStep(2);
      const response = await fetch('/api/install', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Installation failed');
      }
      
      // Step 4: Complete
      setInstallStep(3);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setInstalled(true);
      setServerRunning(true);
      toast.success('Develove installed successfully!');
      onInstall();
      
    } catch (error) {
      console.error('Installation error:', error);
      toast.error('Installation failed. Please try again.');
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full">
              <Code className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Develove</h1>
          <p className="text-xl text-white/80 mb-4">
            The World&apos;s First Unlimited AI Website Developer
          </p>
          <p className="text-white/60">
            Create unlimited projects and queries with local AI processing
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-white/5 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-3">How it works</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500/20 p-2 rounded-full">
                  <Download className="h-4 w-4 text-purple-300" />
                </div>
                <span className="text-white/80">Download the installer once</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <Zap className="h-4 w-4 text-blue-300" />
                </div>
                <span className="text-white/80">Ollama runs locally on your machine</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <Globe className="h-4 w-4 text-green-300" />
                </div>
                <span className="text-white/80">No API keys needed - completely free</span>
              </div>
            </div>
          </div>

          {isInstalling && (
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Installation Progress</h3>
              <div className="space-y-4">
                {installSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === installStep;
                  const isCompleted = index < installStep;
                  
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        isCompleted ? 'bg-green-500/20' : 
                        isActive ? 'bg-blue-500/20' : 'bg-white/10'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4 text-green-300" />
                        ) : (
                          <Icon className={`h-4 w-4 ${
                            isActive ? 'text-blue-300' : 'text-white/40'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          isCompleted ? 'text-green-300' :
                          isActive ? 'text-blue-300' : 'text-white/60'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-sm text-white/40">{step.description}</p>
                      </div>
                      {isActive && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-300"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={handleInstall}
            disabled={isInstalling}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
          >
            {isInstalling ? 'Installing...' : 'Install Develove'}
          </button>
          
          {!isInstalling && (
            <p className="text-white/40 text-sm mt-4">
              This will download and install Ollama locally on your machine
            </p>
          )}
        </div>
      </div>
    </div>
  );
}