// AIFox Sidebar Main JavaScript

class AIFoxSidebar {
  constructor() {
    this.currentView = 'ai-apps';
    this.currentCategory = 'all';
    this.currentPromptsSection = 'my-prompts';
    this.searchQuery = '';
    this.sortBy = 'popularity';
    
    this.aiAppsManager = null;
    this.promptManager = null;
    
    this.init();
  }
  
  async init() {
    await this.initializeManagers();
    this.setupEventListeners();
    this.setupMessageListener();
    await this.loadInitialData();
    this.showView(this.currentView);
  }
  
  async initializeManagers() {
    // Initialize AI Apps Manager
    this.aiAppsManager = new AIAppsManager();
    await this.aiAppsManager.init();
    
    // Initialize Prompt Manager
    this.promptManager = new PromptManager();
    await this.promptManager.init();
  }
  
  setupEventListeners() {
    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        this.showView(view);
      });
    });
    
    // Search
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.debounceSearch();
    });
    
    searchBtn.addEventListener('click', () => {
      this.performSearch();
    });
    
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.performSearch();
      }
    });
    
    // Sort controls
    document.getElementById('sort-select').addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.aiAppsManager.setSortBy(this.sortBy);
      this.aiAppsManager.renderApps();
    });
    
    // Prompts navigation
    document.querySelectorAll('.prompts-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const section = e.currentTarget.dataset.section;
        this.showPromptsSection(section);
      });
    });
    
    // New prompt button
    document.getElementById('new-prompt-btn').addEventListener('click', () => {
      this.promptManager.openEditor();
    });
    
    // Settings button
    document.getElementById('settings-btn').addEventListener('click', () => {
      this.openSettings();
    });
    
    // Modal close buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        modal.classList.add('hidden');
      });
    });
    
    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    });
  }
  
  setupMessageListener() {
    // Listen for messages from popup and background script
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message.action) {
        case 'openPromptManager':
          this.showView('prompts');
          if (message.selectedText) {
            this.promptManager.openEditorWithText(message.selectedText);
          }
          break;
        case 'openSettings':
          this.openSettings();
          break;
        default:
          break;
      }
    });
  }
  
  async loadInitialData() {
    // Load categories
    await this.aiAppsManager.loadCategories();
    
    // Load AI applications
    await this.aiAppsManager.loadApps();
    
    // Load user prompts
    await this.promptManager.loadUserPrompts();
    
    // Load public prompts
    await this.promptManager.loadPublicPrompts();
  }
  
  showView(viewName) {
    // Update navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
    
    // Update views
    document.querySelectorAll('.view').forEach(view => {
      view.classList.remove('active');
    });
    document.getElementById(`${viewName}-view`).classList.add('active');
    
    this.currentView = viewName;
    
    // Update search placeholder
    const searchInput = document.getElementById('search-input');
    if (viewName === 'ai-apps') {
      searchInput.placeholder = 'Search AI apps...';
    } else {
      searchInput.placeholder = 'Search prompts...';
    }
  }
  
  showPromptsSection(sectionName) {
    // Update navigation
    document.querySelectorAll('.prompts-nav-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    
    // Update sections
    document.querySelectorAll('.prompts-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    this.currentPromptsSection = sectionName;
    
    // Load section data
    switch (sectionName) {
      case 'my-prompts':
        this.promptManager.renderUserPrompts();
        break;
      case 'discover':
        this.promptManager.renderPublicPrompts();
        break;
      case 'favorites':
        this.promptManager.renderFavoritePrompts();
        break;
    }
  }
  
  debounceSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.performSearch();
    }, 300);
  }
  
  performSearch() {
    if (this.currentView === 'ai-apps') {
      this.aiAppsManager.search(this.searchQuery);
    } else {
      this.promptManager.search(this.searchQuery, this.currentPromptsSection);
    }
  }
  
  openSettings() {
    const modal = document.getElementById('settings-modal');
    modal.classList.remove('hidden');
    this.loadSettings();
  }
  
  async loadSettings() {
    const storage = await browser.storage.local.get('settings');
    const settings = storage.settings || {};
    
    // Load theme setting
    const themeSelect = document.getElementById('theme-select');
    themeSelect.value = settings.theme || 'auto';
    
    // Load startup setting
    const startupCheckbox = document.getElementById('open-sidebar-startup');
    startupCheckbox.checked = settings.openOnStartup || false;
    
    // Setup settings event listeners
    this.setupSettingsListeners();
  }
  
  setupSettingsListeners() {
    // Save settings button
    document.getElementById('save-settings').addEventListener('click', async () => {
      const settings = {
        theme: document.getElementById('theme-select').value,
        openOnStartup: document.getElementById('open-sidebar-startup').checked
      };
      
      await browser.storage.local.set({ settings });
      this.applyTheme(settings.theme);
      
      // Close modal
      document.getElementById('settings-modal').classList.add('hidden');
      
      // Show success message
      this.showNotification('Settings saved successfully!');
    });
    
    // Reset settings button
    document.getElementById('reset-settings').addEventListener('click', async () => {
      const defaultSettings = {
        theme: 'auto',
        openOnStartup: false
      };
      
      await browser.storage.local.set({ settings: defaultSettings });
      this.loadSettings();
      this.applyTheme('auto');
      
      this.showNotification('Settings reset to defaults!');
    });
    
    // Theme change preview
    document.getElementById('theme-select').addEventListener('change', (e) => {
      this.applyTheme(e.target.value);
    });
  }
  
  applyTheme(theme) {
    const body = document.body;
    body.classList.remove('theme-light', 'theme-dark');
    
    if (theme === 'light') {
      body.classList.add('theme-light');
    } else if (theme === 'dark') {
      body.classList.add('theme-dark');
    }
    // 'auto' uses CSS prefers-color-scheme
  }
  
  showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 16px',
      borderRadius: '8px',
      backgroundColor: type === 'success' ? '#4caf50' : '#f44336',
      color: 'white',
      fontSize: '14px',
      fontWeight: '500',
      zIndex: '10000',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.aiFoxSidebar = new AIFoxSidebar();
});