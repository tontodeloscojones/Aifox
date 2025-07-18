# AIFox Firefox Extension

A comprehensive Firefox extension that provides access to the top 300 AI applications and a powerful prompt manager.

## Features

### 🤖 AI Applications Index
- Browse 300+ carefully curated AI applications
- Organized by categories: Writing, Images, Code, Audio, Video, Assistants, Business, Education
- Search and filter functionality
- Direct links to applications
- Popularity ratings and pricing information

### 📝 Prompt Manager
- Create, edit, and organize your personal prompts
- Discover and share prompts with the community
- Support for multiple AI models (GPT-4, Claude, Gemini, etc.)
- Tag-based organization and search
- Import/export functionality

### 🎨 Modern Interface
- Clean, responsive design
- Dark/light mode support
- Sidebar panel for easy access
- Keyboard shortcuts
- Context menu integration

## Installation

### Method 1: Manual Installation (Sideloading)

1. Download the `aifox-extension.xpi` file
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on..."
5. Select the `aifox-extension.xpi` file
6. The extension will be loaded and ready to use

### Method 2: Developer Installation

1. Clone or download this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on..."
5. Navigate to the `extension` folder and select `manifest.json`
6. The extension will be loaded in developer mode

## Usage

### Opening the Extension

- **Sidebar Panel**: Press `Ctrl+Shift+A` or click the AIFox icon in the toolbar
- **Popup**: Click the AIFox icon in the toolbar for quick access
- **Context Menu**: Right-click on any page to access AIFox options

### Navigating the Interface

1. **AI Apps Tab**: Browse and search through AI applications
   - Use the category sidebar to filter by type
   - Search by name, description, or tags
   - Sort by popularity, name, or category
   - Click on any app card to view details or visit the website

2. **Prompts Tab**: Manage your prompts
   - **My Prompts**: View and manage your personal prompts
   - **Discover**: Browse public prompts from the community
   - **Favorites**: Access your favorite prompts

### Creating and Managing Prompts

1. Click the "New Prompt" button in the My Prompts section
2. Fill in the prompt details:
   - Title: A descriptive name for your prompt
   - Category: Select the appropriate category
   - AI Model: Choose the target AI model
   - Tags: Add relevant tags for organization
   - Content: Write your prompt text
   - Visibility: Choose to keep it private or make it public

3. Use the action buttons on prompt cards to:
   - ✏️ Edit the prompt
   - 📋 Copy to clipboard
   - 🔗 Share with others
   - 🗑️ Delete the prompt

### Keyboard Shortcuts

- `Ctrl+Shift+A`: Open/close sidebar panel
- `Ctrl+Shift+P`: Open prompt manager directly
- `Escape`: Close modals and dialogs

## File Structure

```
extension/
├── manifest.json              # Extension manifest
├── background.js              # Background script
├── popup/                     # Popup interface
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── sidebar/                   # Main sidebar interface
│   ├── sidebar.html
│   ├── sidebar.css
│   └── sidebar.js
├── components/                # Modular components
│   ├── ai-apps-index/        # AI applications manager
│   ├── prompt-manager/       # Prompt management
│   └── shared/               # Shared utilities
├── icons/                    # Extension icons
└── data/                     # Default data files
```

## Development

### Prerequisites

- Firefox Developer Edition (recommended)
- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of WebExtensions API

### Building from Source

1. Clone the repository:
   ```bash
   git clone https://github.com/tontodeloscojones/Aifox.git
   cd Aifox
   ```

2. Navigate to the extension directory:
   ```bash
   cd extension
   ```

3. Load in Firefox for development:
   - Open `about:debugging`
   - Click "Load Temporary Add-on"
   - Select `manifest.json`

### Creating a Release Build

1. Navigate to the extension directory
2. Create the XPI file:
   ```bash
   zip -r aifox-extension.xpi .
   ```

## Browser Compatibility

- **Firefox**: 109.0 or later (full support)
- **Firefox ESR**: 102.0 or later (limited support)
- **Firefox for Android**: Not supported (sidebar API limitations)

## Permissions

The extension requests the following permissions:

- `storage`: To save user prompts and settings
- `tabs`: To open AI application links
- `clipboardWrite`: To copy prompts to clipboard
- `contextMenus`: To add context menu options

## Privacy

- All user data is stored locally in the browser
- No data is transmitted to external servers without explicit user action
- Public prompts are shared through a mock API (no real server in this demo)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly in Firefox
5. Submit a pull request

## Support

For issues, questions, or feature requests:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include Firefox version and extension version

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Changelog

### Version 1.0.0
- Initial release
- AI applications index with 300+ apps
- Prompt manager with create, edit, share functionality
- Sidebar and popup interfaces
- Dark/light mode support
- Search and filtering capabilities