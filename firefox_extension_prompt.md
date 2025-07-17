# Prompt for Generating an AI Tools Firefox Extension

## Context and Overview

You are an expert developer specializing in browser extensions and UX design. I need you to generate complete code for a Firefox extension called "AIFox" with two main features:

1. An interactive sidebar panel showcasing the top 300 AI applications organized by category
2. A comprehensive prompt manager for saving, editing, sharing, and discovering AI prompts

The extension should follow Firefox's Manifest V3 standards, have a clean, responsive design, and be ready for manual installation (sideloading).

## Extension Requirements

### 1. AI Applications Index Feature

- Create a sidebar panel that displays a categorized index of 300 top AI applications
- Categories should include: Writing, Images, Code, Audio, Video, Assistants, Open-Source, Business, Education, etc.
- Each application entry should contain:
  - Name
  - Brief description (1-2 sentences)
  - Direct link to the application
  - Category tags
  - Optional: pricing model (Free, Freemium, Paid)
- Implement search and filtering functionality by name, category, and tags
- Include a responsive, collapsible category navigation system
- Store application data locally using browser storage APIs

### 2. Prompt Manager Feature

- Create a system for users to:
  - Save their own prompts with title, content, category, and target AI model
  - Edit and delete saved prompts
  - Organize prompts with tags and categories
  - Search through their prompt library
- Implement a public prompt discovery system:
  - Browse prompts shared by other users
  - Filter by category, AI model (GPT, Claude, Gemini, etc.), and language
  - Sort by popularity, recency, or relevance
- Add a prompt sharing mechanism:
  - Allow users to publish their prompts to the public repository
  - Generate shareable links for specific prompts
  - Include upvoting/rating system for community curation
- Ensure compatibility with multiple AI platforms (OpenAI, Anthropic, Google, etc.)

### 3. UI/UX Requirements

- Design a clean, modern interface following Firefox's design language
- Implement a responsive layout that works well within the sidebar panel constraints
- Create intuitive navigation between the AI applications index and prompt manager
- Use appropriate visual hierarchy, typography, and spacing
- Include light and dark mode support that respects browser settings
- Ensure accessibility compliance (keyboard navigation, screen reader support, etc.)

### 4. Technical Requirements

- Develop using Firefox's Manifest V3 specification
- Structure the extension with proper separation of concerns (HTML, CSS, JS)
- Implement efficient data storage using browser.storage APIs
- Handle authentication for the prompt sharing system securely
- Ensure the extension works offline for basic functionality
- Optimize performance for the sidebar panel
- Include proper error handling and user feedback

## Project Structure

Generate a complete project with the following structure:

```
aifox/
├── manifest.json
├── background.js
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── sidebar/
│   ├── sidebar.html
│   ├── sidebar.css
│   └── sidebar.js
├── components/
│   ├── ai-apps-index/
│   │   ├── ai-apps-index.js
│   │   ├── ai-apps-index.css
│   │   └── categories.js
│   ├── prompt-manager/
│   │   ├── prompt-manager.js
│   │   ├── prompt-manager.css
│   │   ├── prompt-editor.js
│   │   └── prompt-discovery.js
│   └── shared/
│       ├── storage.js
│       ├── ui-components.js
│       └── utils.js
├── data/
│   ├── ai-applications.js
│   └── default-prompts.js
└── icons/
    ├── icon-16.png
    ├── icon-32.png
    ├── icon-48.png
    └── icon-128.png
```

## Implementation Details

### Manifest.json

Create a manifest.json file following Firefox's Manifest V3 specification with:
- Appropriate permissions (storage, tabs, etc.)
- Sidebar action configuration
- Background script registration
- Content security policy
- Icons and extension metadata

### Data Storage

- Implement local storage for user's saved prompts
- Create a mock API interface for the public prompt repository
- Include a starter dataset of 300 AI applications covering various categories
- Design a data structure that allows efficient filtering and searching

### UI Components

- Design modular, reusable UI components for:
  - Application cards
  - Category navigation
  - Search and filter interfaces
  - Prompt editor
  - Prompt cards
  - Settings panels
- Implement responsive layouts using CSS Grid and Flexbox
- Create smooth transitions and animations for UI interactions

### JavaScript Functionality

- Implement all required features with clean, well-documented JavaScript
- Use modern ES6+ syntax and features
- Create proper event handling for user interactions
- Implement efficient search and filtering algorithms
- Design a robust state management approach for the application

### Installation Instructions

Include detailed instructions for:
- Loading the extension in Firefox Developer Edition
- Debugging common issues
- Testing the extension's functionality
- Packaging the extension for distribution

## Additional Requirements

- Include comprehensive comments explaining complex logic
- Implement error handling for all user interactions and API calls
- Ensure the code follows best practices for browser extension development
- Make the extension lightweight and performant
- Include placeholder data that demonstrates the functionality without requiring backend services

## Output Format

Generate all necessary files with complete, functional code that can be directly used to create the extension. Include any necessary explanations as code comments rather than separate documentation.

The final output should be a complete, ready-to-install Firefox extension that meets all the requirements specified above.