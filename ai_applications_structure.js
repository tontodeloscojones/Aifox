/**
 * Example data structure for AI applications
 * This serves as a guide for how the AI applications should be structured
 * in the extension's database
 */

const aiApplicationsExample = [
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
    id: "descript",
    name: "Descript",
    description: "All-in-one audio/video editing platform with AI features like text-based editing and voice cloning.",
    url: "https://www.descript.com",
    category: "Audio",
    tags: ["audio editing", "video editing", "transcription", "voice cloning"],
    pricing: "Freemium",
    popularity: 85
  }
];

/**
 * Example categories structure
 */
const categoriesExample = [
  {
    id: "assistants",
    name: "Assistants",
    description: "General-purpose AI assistants and chatbots",
    icon: "robot"
  },
  {
    id: "writing",
    name: "Writing",
    description: "Tools for content creation, editing, and enhancement",
    icon: "edit"
  },
  {
    id: "images",
    name: "Images",
    description: "Image generation, editing, and enhancement tools",
    icon: "image"
  },
  {
    id: "code",
    name: "Code",
    description: "Programming assistants and code generation tools",
    icon: "code"
  },
  {
    id: "audio",
    name: "Audio",
    description: "Voice synthesis, audio editing, and music generation",
    icon: "music"
  },
  {
    id: "video",
    name: "Video",
    description: "Video generation, editing, and enhancement tools",
    icon: "video"
  },
  {
    id: "open-source",
    name: "Open Source",
    description: "Open-source AI models and applications",
    icon: "github"
  },
  {
    id: "business",
    name: "Business",
    description: "AI tools for productivity, analytics, and business operations",
    icon: "briefcase"
  },
  {
    id: "education",
    name: "Education",
    description: "Learning tools and educational AI applications",
    icon: "graduation-cap"
  }
];