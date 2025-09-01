#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🚀 Develove Installer Starting...\n');

function runCommand(command, description) {
  console.log(`📦 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed successfully!\n`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return false;
  }
}

function checkOllama() {
  try {
    execSync('ollama --version', { stdio: 'pipe' });
    console.log('✅ Ollama is already installed!\n');
    return true;
  } catch (error) {
    return false;
  }
}

function installOllama() {
  const platform = os.platform();
  
  if (platform === 'linux' || platform === 'darwin') {
    console.log('📥 Installing Ollama...');
    const success = runCommand(
      'curl -fsSL https://ollama.ai/install.sh | sh',
      'Installing Ollama'
    );
    
    if (success) {
      // Add Ollama to PATH for current session
      const homeDir = os.homedir();
      const shell = process.env.SHELL || '/bin/bash';
      
      if (shell.includes('bash')) {
        process.env.PATH = `${homeDir}/.local/bin:${process.env.PATH}`;
      } else if (shell.includes('zsh')) {
        process.env.PATH = `${homeDir}/.local/bin:${process.env.PATH}`;
      }
    }
    
    return success;
  } else if (platform === 'win32') {
    console.log('❌ Windows installation not supported in this script.');
    console.log('Please install Ollama manually from: https://ollama.ai/download');
    return false;
  } else {
    console.log(`❌ Unsupported platform: ${platform}`);
    return false;
  }
}

function downloadModel() {
  console.log('🤖 Downloading AI coding model...');
  
  // Try CodeLlama first, fallback to Llama2
  const models = ['codellama:7b', 'llama2:7b'];
  
  for (const model of models) {
    console.log(`📥 Trying to download ${model}...`);
    const success = runCommand(`ollama pull ${model}`, `Downloading ${model}`);
    if (success) {
      console.log(`✅ Successfully downloaded ${model}!`);
      return model;
    }
  }
  
  console.log('❌ Failed to download any model');
  return null;
}

function startServer() {
  console.log('🚀 Starting Ollama server...');
  
  // Check if server is already running
  try {
    execSync('curl -s http://localhost:11434/api/tags', { stdio: 'pipe' });
    console.log('✅ Ollama server is already running!\n');
    return true;
  } catch (error) {
    // Server not running, start it
    console.log('🔄 Starting Ollama server in background...');
    
    try {
      // Start server in background
      const child = execSync('ollama serve', { 
        stdio: 'pipe',
        detached: true 
      });
      
      // Wait a moment for server to start
      setTimeout(() => {
        try {
          execSync('curl -s http://localhost:11434/api/tags', { stdio: 'pipe' });
          console.log('✅ Ollama server started successfully!\n');
        } catch (error) {
          console.log('⚠️  Server may still be starting up...');
        }
      }, 3000);
      
      return true;
    } catch (error) {
      console.log('❌ Failed to start Ollama server');
      return false;
    }
  }
}

function createFlagFile() {
  const flagPath = path.join(process.cwd(), '.develove-installed');
  const timestamp = new Date().toISOString();
  
  try {
    fs.writeFileSync(flagPath, timestamp);
    console.log('✅ Installation flag created');
    return true;
  } catch (error) {
    console.log('❌ Failed to create installation flag');
    return false;
  }
}

function main() {
  console.log('🎯 Develove Installation Process\n');
  
  // Step 1: Check/Install Ollama
  if (!checkOllama()) {
    if (!installOllama()) {
      console.log('❌ Installation failed at Ollama step');
      process.exit(1);
    }
  }
  
  // Step 2: Download Model
  const model = downloadModel();
  if (!model) {
    console.log('❌ Installation failed at model download step');
    process.exit(1);
  }
  
  // Step 3: Start Server
  if (!startServer()) {
    console.log('❌ Installation failed at server start step');
    process.exit(1);
  }
  
  // Step 4: Create flag file
  createFlagFile();
  
  console.log('🎉 Develove Installation Complete!');
  console.log('\n📋 Next Steps:');
  console.log('1. Start the development server: npm run dev');
  console.log('2. Open http://localhost:3000 in your browser');
  console.log('3. Start creating amazing projects with AI!');
  console.log('\n💡 Tips:');
  console.log('- The Ollama server runs on http://localhost:11434');
  console.log('- You can manage models with: ollama list');
  console.log('- To stop the server: pkill ollama');
  console.log('\n🚀 Happy coding with Develove!');
}

// Run the installer
main();