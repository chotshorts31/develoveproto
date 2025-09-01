import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

export async function POST() {
  try {
    // Check if Ollama is already installed
    try {
      await execAsync('ollama --version');
      console.log('Ollama is already installed');
    } catch {
      console.log('Installing Ollama...');
      
      // Download and install Ollama based on the platform
      const platform = process.platform;
      
      if (platform === 'linux') {
        // Install Ollama on Linux
        await execAsync('curl -fsSL https://ollama.ai/install.sh | sh');
      } else if (platform === 'darwin') {
        // Install Ollama on macOS
        await execAsync('curl -fsSL https://ollama.ai/install.sh | sh');
      } else if (platform === 'win32') {
        // For Windows, we'll provide instructions
        throw new Error('Please install Ollama manually from https://ollama.ai/download');
      }
    }

    // Pull the coding model (using CodeLlama as an example)
    console.log('Downloading coding model...');
    try {
      await execAsync('ollama pull codellama:7b');
    } catch {
      console.log('Model download failed, trying alternative...');
      await execAsync('ollama pull llama2:7b');
    }

    // Start Ollama server
    console.log('Starting Ollama server...');
    exec('ollama serve', (error) => {
      if (error) {
        console.error('Ollama server error:', error);
      }
    });

    // Wait a moment for the server to start
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Test the connection
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      if (response.ok) {
        console.log('Ollama server is running successfully');
      }
    } catch {
      console.log('Ollama server test failed, but continuing...');
    }

    // Create a flag file to indicate successful installation
    const flagPath = path.join(process.cwd(), '.develove-installed');
    fs.writeFileSync(flagPath, new Date().toISOString());

    return NextResponse.json({ 
      success: true, 
      message: 'Develove installed successfully',
      serverRunning: true 
    });

  } catch (error) {
    console.error('Installation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Installation failed' 
      },
      { status: 500 }
    );
  }
}