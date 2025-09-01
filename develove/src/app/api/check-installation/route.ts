import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Check if the installation flag file exists
    const flagPath = path.join(process.cwd(), '.develove-installed');
    const isInstalled = fs.existsSync(flagPath);

    // Also check if Ollama is running
    let isServerRunning = false;
    if (isInstalled) {
      try {
        const response = await fetch('http://localhost:11434/api/tags');
        isServerRunning = response.ok;
      } catch {
        console.log('Ollama server not running');
      }
    }

    return NextResponse.json({
      installed: isInstalled,
      serverRunning: isServerRunning,
    });
  } catch (error) {
    console.error('Error checking installation:', error);
    return NextResponse.json({
      installed: false,
      serverRunning: false,
    });
  }
}