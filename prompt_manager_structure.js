/**
 * Example data structure for the prompt manager
 * This serves as a guide for how prompts should be structured
 * in the extension's database
 */

// Example of user's saved prompts
const userPromptsExample = [
  {
    id: "prompt-1",
    title: "Análisis detallado de código",
    content: "Actúa como un experto en desarrollo de software. Analiza el siguiente código, identifica posibles bugs, problemas de rendimiento y sugiere mejoras siguiendo las mejores prácticas: \n\n```\n[CÓDIGO AQUÍ]\n```",
    category: "Programación",
    aiModel: "GPT-4",
    tags: ["código", "análisis", "debugging"],
    dateCreated: "2025-06-15T10:30:00Z",
    dateModified: "2025-07-01T14:22:00Z",
    isPublic: false
  },
  {
    id: "prompt-2",
    title: "Generador de planes de estudio",
    content: "Crea un plan de estudio detallado para aprender [TEMA] desde cero hasta un nivel avanzado. Incluye recursos recomendados (libros, cursos online, videos), ejercicios prácticos, y una estimación de tiempo para cada etapa del aprendizaje.",
    category: "Educación",
    aiModel: "Claude",
    tags: ["educación", "planificación", "aprendizaje"],
    dateCreated: "2025-05-20T09:15:00Z",
    dateModified: "2025-05-20T09:15:00Z",
    isPublic: true,
    publicStats: {
      upvotes: 42,
      views: 156,
      copies: 28
    }
  },
  {
    id: "prompt-3",
    title: "Asistente de escritura creativa",
    content: "Eres un mentor de escritura creativa. Ayúdame a desarrollar una historia con el siguiente concepto: [CONCEPTO]. Proporciona sugerencias para personajes, trama, ambientación y estilo narrativo. Luego, ayúdame a elaborar un esquema detallado capítulo por capítulo.",
    category: "Escritura",
    aiModel: "GPT-4",
    tags: ["creatividad", "narrativa", "ficción"],
    dateCreated: "2025-07-10T16:45:00Z",
    dateModified: "2025-07-12T11:30:00Z",
    isPublic: true,
    publicStats: {
      upvotes: 17,
      views: 89,
      copies: 12
    }
  }
];

// Example of public prompts from the community
const publicPromptsExample = [
  {
    id: "public-1",
    title: "Comprehensive Research Assistant",
    content: "I want you to act as a research assistant. Your task is to help me explore the topic of [TOPIC] in depth. Please provide: 1) A brief overview of the topic, 2) Key concepts and terminology, 3) Major debates or controversies, 4) Recent developments, 5) Leading experts and their contributions, 6) Recommended resources for further study. Make your response informative, balanced, and well-structured.",
    category: "Research",
    aiModel: "GPT-4",
    tags: ["research", "academic", "learning"],
    author: "ResearchPro",
    datePublished: "2025-06-05T08:20:00Z",
    language: "English",
    stats: {
      upvotes: 328,
      views: 1205,
      copies: 189
    }
  },
  {
    id: "public-2",
    title: "Análisis DAFO empresarial",
    content: "Actúa como un consultor estratégico de negocios. Realiza un análisis DAFO (Debilidades, Amenazas, Fortalezas, Oportunidades) detallado para una empresa con las siguientes características: [DESCRIPCIÓN DE LA EMPRESA]. Para cada cuadrante del DAFO, proporciona al menos 5 puntos relevantes y explica su impacto potencial en el negocio.",
    category: "Business",
    aiModel: "Claude",
    tags: ["estrategia", "negocios", "análisis"],
    author: "EstrategaDigital",
    datePublished: "2025-05-18T14:30:00Z",
    language: "Spanish",
    stats: {
      upvotes: 156,
      views: 720,
      copies: 98
    }
  },
  {
    id: "public-3",
    title: "Gemini Code Refactoring Expert",
    content: "You are an expert code refactoring assistant. I'll provide you with code that works but needs improvement. Your task is to refactor it following these steps:\n\n1. Identify code smells and potential issues\n2. Suggest a refactoring plan\n3. Provide the refactored code with explanations\n4. Highlight improvements in readability, performance, and maintainability\n\nHere's the code to refactor:\n\n```\n[CODE HERE]\n```",
    category: "Programming",
    aiModel: "Gemini",
    tags: ["coding", "refactoring", "best practices"],
    author: "CodeCraftsman",
    datePublished: "2025-07-01T11:15:00Z",
    language: "English",
    stats: {
      upvotes: 215,
      views: 890,
      copies: 142
    }
  }
];

// Example of prompt categories
const promptCategoriesExample = [
  {
    id: "writing",
    name: "Escritura",
    icon: "pen"
  },
  {
    id: "programming",
    name: "Programación",
    icon: "code"
  },
  {
    id: "business",
    name: "Negocios",
    icon: "briefcase"
  },
  {
    id: "education",
    name: "Educación",
    icon: "graduation-cap"
  },
  {
    id: "research",
    name: "Investigación",
    icon: "search"
  },
  {
    id: "creativity",
    name: "Creatividad",
    icon: "paint-brush"
  },
  {
    id: "productivity",
    name: "Productividad",
    icon: "tasks"
  }
];

// Example of AI models supported
const aiModelsExample = [
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "OpenAI",
    icon: "openai-logo"
  },
  {
    id: "gpt-3.5",
    name: "GPT-3.5",
    provider: "OpenAI",
    icon: "openai-logo"
  },
  {
    id: "claude",
    name: "Claude",
    provider: "Anthropic",
    icon: "anthropic-logo"
  },
  {
    id: "claude-instant",
    name: "Claude Instant",
    provider: "Anthropic",
    icon: "anthropic-logo"
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    icon: "google-logo"
  },
  {
    id: "gemini-ultra",
    name: "Gemini Ultra",
    provider: "Google",
    icon: "google-logo"
  },
  {
    id: "llama-3",
    name: "Llama 3",
    provider: "Meta",
    icon: "meta-logo"
  },
  {
    id: "mistral",
    name: "Mistral",
    provider: "Mistral AI",
    icon: "mistral-logo"
  }
];