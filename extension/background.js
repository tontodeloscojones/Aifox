// Background script for AIFox extension

// Initialize extension on install
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    console.log('AIFox extension installed');
    await initializeStorage();
    createContextMenus();
  }
});

// Initialize storage with default data
async function initializeStorage() {
  const storage = await browser.storage.local.get();
  
  if (!storage.aiApps) {
    // Import default AI applications data
    const defaultData = {
      aiApps: await loadDefaultAIApps(),
      categories: await loadDefaultCategories(),
      userPrompts: [],
      publicPrompts: await loadDefaultPrompts(),
      settings: {
        theme: 'auto',
        defaultView: 'ai-apps',
        syncEnabled: false
      }
    };
    
    await browser.storage.local.set(defaultData);
  }
}

// Create context menus
function createContextMenus() {
  browser.contextMenus.create({
    id: 'open-aifox-sidebar',
    title: 'Open AIFox Sidebar',
    contexts: ['page']
  });
  
  browser.contextMenus.create({
    id: 'open-prompt-manager',
    title: 'Open Prompt Manager',
    contexts: ['selection']
  });
}

// Handle context menu clicks
browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case 'open-aifox-sidebar':
      browser.sidebarAction.open();
      break;
    case 'open-prompt-manager':
      browser.sidebarAction.open();
      // Send message to sidebar to open prompt manager
      browser.runtime.sendMessage({
        action: 'openPromptManager',
        selectedText: info.selectionText
      });
      break;
  }
});

// Handle keyboard shortcuts
browser.commands.onCommand.addListener((command) => {
  switch (command) {
    case '_execute_sidebar_action':
      browser.sidebarAction.open();
      break;
    case 'open_prompt_manager':
      browser.sidebarAction.open();
      browser.runtime.sendMessage({ action: 'openPromptManager' });
      break;
  }
});

// Load default AI applications
async function loadDefaultAIApps() {
  return [
    {
      id: "chatgpt",
      name: "ChatGPT",
      description: "Conversational AI assistant developed by OpenAI, capable of generating human-like text responses.",
      url: "https://chat.openai.com",
      category: "Assistants",
      tags: ["text generation", "conversation", "writing", "coding"],
      pricing: "Freemium",
      popularity: 98
    },
    {
      id: "claude",
      name: "Claude",
      description: "Conversational AI assistant by Anthropic designed to be helpful, harmless, and honest.",
      url: "https://claude.ai",
      category: "Assistants",
      tags: ["text generation", "conversation", "writing", "research"],
      pricing: "Freemium",
      popularity: 90
    },
    {
      id: "midjourney",
      name: "Midjourney",
      description: "AI art generation tool that creates images from textual descriptions using advanced diffusion models.",
      url: "https://www.midjourney.com",
      category: "Images",
      tags: ["image generation", "art", "design", "creativity"],
      pricing: "Paid",
      popularity: 95
    },
    {
      id: "github-copilot",
      name: "GitHub Copilot",
      description: "AI pair programmer that suggests code completions based on context from comments and existing code.",
      url: "https://github.com/features/copilot",
      category: "Code",
      tags: ["coding", "programming", "developer tools", "autocomplete"],
      pricing: "Paid",
      popularity: 92
    },
    {
      id: "descript",
      name: "Descript",
      description: "All-in-one audio/video editing platform with AI features like text-based editing and voice cloning.",
      url: "https://www.descript.com",
      category: "Audio",
      tags: ["audio editing", "video editing", "transcription", "voice cloning"],
      pricing: "Freemium",
      popularity: 85
    }
    // Add more applications here...
  ];
}

// Load default categories
async function loadDefaultCategories() {
  return [
    { id: "assistants", name: "Assistants", description: "General-purpose AI assistants and chatbots", icon: "🤖" },
    { id: "writing", name: "Writing", description: "Tools for content creation, editing, and enhancement", icon: "✍️" },
    { id: "images", name: "Images", description: "Image generation, editing, and enhancement tools", icon: "🖼️" },
    { id: "code", name: "Code", description: "Programming assistants and code generation tools", icon: "💻" },
    { id: "audio", name: "Audio", description: "Voice synthesis, audio editing, and music generation", icon: "🔊" },
    { id: "video", name: "Video", description: "Video generation, editing, and enhancement tools", icon: "🎬" },
    { id: "business", name: "Business", description: "AI tools for productivity, analytics, and business operations", icon: "💼" },
    { id: "education", name: "Education", description: "Learning tools and educational AI applications", icon: "🎓" }
  ];
}

// Load default prompts
async function loadDefaultPrompts() {
  return [
    {
      id: "research-assistant",
      title: "Comprehensive Research Assistant",
      content: "I want you to act as a research assistant. Your task is to help me explore the topic of [TOPIC] in depth. Please provide: 1) A brief overview of the topic, 2) Key concepts and terminology, 3) Major debates or controversies, 4) Recent developments, 5) Leading experts and their contributions, 6) Recommended resources for further study. Make your response informative, balanced, and well-structured.",
      category: "Research",
      aiModel: "GPT-4",
      tags: ["research", "academic", "learning"],
      author: "AIFox Team",
      datePublished: new Date().toISOString(),
      language: "English",
      stats: { upvotes: 0, views: 0, copies: 0 }
    }
  ];
}