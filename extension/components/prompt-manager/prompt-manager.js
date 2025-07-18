// Prompt Manager for AIFox extension

class PromptManager {
  constructor() {
    this.userPrompts = [];
    this.publicPrompts = [];
    this.favoritePrompts = [];
    this.currentEditingPrompt = null;
    this.searchQuery = '';
    this.categoryFilter = '';
    this.modelFilter = '';
    
    this.myPromptsList = null;
    this.publicPromptsList = null;
    this.favoritesList = null;
    this.promptEditor = null;
  }
  
  async init() {
    this.myPromptsList = document.getElementById('my-prompts-list');
    this.publicPromptsList = document.getElementById('public-prompts-list');
    this.favoritesList = document.getElementById('favorites-list');
    this.promptEditor = document.getElementById('prompt-editor-modal');
    
    this.setupEventListeners();
    this.setupPromptEditor();
  }
  
  setupEventListeners() {
    // Prompt action buttons (delegated event handling)
    document.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('.prompt-action-btn');
      if (actionBtn) {
        e.stopPropagation();
        const action = actionBtn.dataset.action;
        const promptCard = actionBtn.closest('.prompt-card');
        const promptId = promptCard.dataset.promptId;
        
        this.handlePromptAction(action, promptId, actionBtn);
      }
    });
    
    // Filter controls
    const categoryFilter = document.getElementById('category-filter');
    const modelFilter = document.getElementById('model-filter');
    
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.categoryFilter = e.target.value;
        this.renderPublicPrompts();
      });
    }
    
    if (modelFilter) {
      modelFilter.addEventListener('change', (e) => {
        this.modelFilter = e.target.value;
        this.renderPublicPrompts();
      });
    }
  }
  
  setupPromptEditor() {
    const form = document.getElementById('prompt-form');
    const cancelBtn = document.getElementById('cancel-prompt');
    const closeBtn = document.getElementById('close-editor');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.savePrompt();
      });
    }
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        this.closeEditor();
      });
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeEditor();
      });
    }
  }
  
  async loadUserPrompts() {
    try {
      this.userPrompts = await storageManager.getUserPrompts();
      this.renderUserPrompts();
    } catch (error) {
      console.error('Error loading user prompts:', error);
      UIComponents.createNotification('Error loading your prompts', 'error');
    }
  }
  
  async loadPublicPrompts() {
    try {
      this.publicPrompts = await storageManager.getPublicPrompts();
      this.renderPublicPrompts();
      this.populateFilterOptions();
    } catch (error) {
      console.error('Error loading public prompts:', error);
      UIComponents.createNotification('Error loading public prompts', 'error');
    }
  }
  
  async loadFavoritePrompts() {
    try {
      const favoriteIds = await storageManager.getFavoritePrompts();
      this.favoritePrompts = this.publicPrompts.filter(prompt => 
        favoriteIds.includes(prompt.id)
      );
      this.renderFavoritePrompts();
    } catch (error) {
      console.error('Error loading favorite prompts:', error);
      UIComponents.createNotification('Error loading favorite prompts', 'error');
    }
  }
  
  renderUserPrompts() {
    if (!this.myPromptsList) return;
    
    this.myPromptsList.innerHTML = '';
    
    if (this.userPrompts.length === 0) {
      const emptyState = UIComponents.createEmptyState(
        'No prompts yet',
        'Create your first prompt to get started!',
        'Create New Prompt',
        () => this.openEditor()
      );
      this.myPromptsList.appendChild(emptyState);
      return;
    }
    
    const filteredPrompts = this.filterPrompts(this.userPrompts);
    
    filteredPrompts.forEach(prompt => {
      const promptCard = UIComponents.createPromptCard(prompt, false);
      this.myPromptsList.appendChild(promptCard);
    });
  }
  
  renderPublicPrompts() {
    if (!this.publicPromptsList) return;
    
    this.publicPromptsList.innerHTML = '';
    
    let filteredPrompts = this.filterPrompts(this.publicPrompts);
    
    // Apply category filter
    if (this.categoryFilter) {
      filteredPrompts = filteredPrompts.filter(prompt => 
        prompt.category === this.categoryFilter
      );
    }
    
    // Apply model filter
    if (this.modelFilter) {
      filteredPrompts = filteredPrompts.filter(prompt => 
        prompt.aiModel === this.modelFilter
      );
    }
    
    if (filteredPrompts.length === 0) {
      const emptyState = UIComponents.createEmptyState(
        'No prompts found',
        'Try adjusting your filters or search terms.',
        'Clear Filters',
        () => this.clearFilters()
      );
      this.publicPromptsList.appendChild(emptyState);
      return;
    }
    
    // Sort by popularity (upvotes)
    filteredPrompts.sort((a, b) => {
      const aUpvotes = a.stats ? a.stats.upvotes : 0;
      const bUpvotes = b.stats ? b.stats.upvotes : 0;
      return bUpvotes - aUpvotes;
    });
    
    filteredPrompts.forEach(prompt => {
      const promptCard = UIComponents.createPromptCard(prompt, true);
      this.publicPromptsList.appendChild(promptCard);
    });
  }
  
  renderFavoritePrompts() {
    if (!this.favoritesList) return;
    
    this.favoritesList.innerHTML = '';
    
    if (this.favoritePrompts.length === 0) {
      const emptyState = UIComponents.createEmptyState(
        'No favorite prompts',
        'Add prompts to your favorites from the Discover section.',
        'Discover Prompts',
        () => {
          // Switch to discover section
          document.querySelector('[data-section="discover"]').click();
        }
      );
      this.favoritesList.appendChild(emptyState);
      return;
    }
    
    const filteredPrompts = this.filterPrompts(this.favoritePrompts);
    
    filteredPrompts.forEach(prompt => {
      const promptCard = UIComponents.createPromptCard(prompt, true);
      this.favoritesList.appendChild(promptCard);
    });
  }
  
  filterPrompts(prompts) {
    if (!this.searchQuery) return prompts;
    
    const query = this.searchQuery.toLowerCase();
    return prompts.filter(prompt => 
      prompt.title.toLowerCase().includes(query) ||
      prompt.content.toLowerCase().includes(query) ||
      prompt.category.toLowerCase().includes(query) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  populateFilterOptions() {
    // Populate category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
      const categories = [...new Set(this.publicPrompts.map(p => p.category))].sort();
      categoryFilter.innerHTML = '<option value="">All Categories</option>';
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
      });
    }
    
    // Populate model filter
    const modelFilter = document.getElementById('model-filter');
    if (modelFilter) {
      const models = [...new Set(this.publicPrompts.map(p => p.aiModel))].sort();
      modelFilter.innerHTML = '<option value="">All Models</option>';
      models.forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelFilter.appendChild(option);
      });
    }
  }
  
  async handlePromptAction(action, promptId, buttonElement) {
    switch (action) {
      case 'edit':
        await this.editPrompt(promptId);
        break;
      case 'copy':
        await this.copyPrompt(promptId);
        break;
      case 'share':
        await this.sharePrompt(promptId);
        break;
      case 'delete':
        await this.deletePrompt(promptId);
        break;
      case 'favorite':
        await this.toggleFavorite(promptId, buttonElement);
        break;
      case 'upvote':
        await this.upvotePrompt(promptId, buttonElement);
        break;
    }
  }
  
  async editPrompt(promptId) {
    const prompt = this.userPrompts.find(p => p.id === promptId);
    if (!prompt) return;
    
    this.currentEditingPrompt = prompt;
    this.openEditor(prompt);
  }
  
  async copyPrompt(promptId) {
    const prompt = this.findPromptById(promptId);
    if (!prompt) return;
    
    try {
      await navigator.clipboard.writeText(prompt.content);
      UIComponents.createNotification('Prompt copied to clipboard!', 'success');
      
      // Update copy stats for public prompts
      if (prompt.stats) {
        prompt.stats.copies = (prompt.stats.copies || 0) + 1;
        await this.updatePublicPromptStats(promptId, prompt.stats);
      }
    } catch (error) {
      console.error('Error copying prompt:', error);
      UIComponents.createNotification('Error copying prompt', 'error');
    }
  }
  
  async sharePrompt(promptId) {
    const prompt = this.userPrompts.find(p => p.id === promptId);
    if (!prompt) return;
    
    // Create shareable link (mock implementation)
    const shareUrl = `https://aifox.app/prompts/${promptId}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      UIComponents.createNotification('Share link copied to clipboard!', 'success');
    } catch (error) {
      console.error('Error sharing prompt:', error);
      UIComponents.createNotification('Error creating share link', 'error');
    }
  }
  
  async deletePrompt(promptId) {
    const prompt = this.userPrompts.find(p => p.id === promptId);
    if (!prompt) return;
    
    const confirmed = confirm(`Are you sure you want to delete "${prompt.title}"?`);
    if (!confirmed) return;
    
    try {
      await storageManager.deleteUserPrompt(promptId);
      this.userPrompts = this.userPrompts.filter(p => p.id !== promptId);
      this.renderUserPrompts();
      UIComponents.createNotification('Prompt deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting prompt:', error);
      UIComponents.createNotification('Error deleting prompt', 'error');
    }
  }
  
  async toggleFavorite(promptId, buttonElement) {
    try {
      const favoriteIds = await storageManager.getFavoritePrompts();
      const isFavorite = favoriteIds.includes(promptId);
      
      if (isFavorite) {
        await storageManager.removeFromFavorites(promptId);
        buttonElement.textContent = '🤍';
        buttonElement.title = 'Add to Favorites';
        UIComponents.createNotification('Removed from favorites', 'info');
      } else {
        await storageManager.addToFavorites(promptId);
        buttonElement.textContent = '❤️';
        buttonElement.title = 'Remove from Favorites';
        UIComponents.createNotification('Added to favorites', 'success');
      }
      
      // Reload favorites if we're viewing them
      await this.loadFavoritePrompts();
    } catch (error) {
      console.error('Error toggling favorite:', error);
      UIComponents.createNotification('Error updating favorites', 'error');
    }
  }
  
  async upvotePrompt(promptId, buttonElement) {
    try {
      const prompt = this.publicPrompts.find(p => p.id === promptId);
      if (!prompt || !prompt.stats) return;
      
      // Mock upvote implementation
      prompt.stats.upvotes = (prompt.stats.upvotes || 0) + 1;
      await this.updatePublicPromptStats(promptId, prompt.stats);
      
      // Update UI
      buttonElement.style.color = '#4caf50';
      buttonElement.disabled = true;
      
      UIComponents.createNotification('Upvoted!', 'success');
      this.renderPublicPrompts();
    } catch (error) {
      console.error('Error upvoting prompt:', error);
      UIComponents.createNotification('Error upvoting prompt', 'error');
    }
  }
  
  openEditor(prompt = null) {
    if (!this.promptEditor) return;
    
    const form = document.getElementById('prompt-form');
    const title = document.getElementById('editor-title');
    
    if (prompt) {
      // Editing existing prompt
      title.textContent = 'Edit Prompt';
      document.getElementById('prompt-title-input').value = prompt.title;
      document.getElementById('prompt-category-input').value = prompt.category;
      document.getElementById('prompt-model-input').value = prompt.aiModel;
      document.getElementById('prompt-tags-input').value = prompt.tags.join(', ');
      document.getElementById('prompt-content-input').value = prompt.content;
      document.getElementById('prompt-public-input').checked = prompt.isPublic || false;
    } else {
      // Creating new prompt
      title.textContent = 'New Prompt';
      form.reset();
    }
    
    this.promptEditor.classList.remove('hidden');
    document.getElementById('prompt-title-input').focus();
  }
  
  openEditorWithText(selectedText) {
    this.openEditor();
    document.getElementById('prompt-content-input').value = selectedText;
  }
  
  closeEditor() {
    if (!this.promptEditor) return;
    
    this.promptEditor.classList.add('hidden');
    this.currentEditingPrompt = null;
    document.getElementById('prompt-form').reset();
  }
  
  async savePrompt() {
    const form = document.getElementById('prompt-form');
    const formData = new FormData(form);
    
    const promptData = {
      title: document.getElementById('prompt-title-input').value.trim(),
      category: document.getElementById('prompt-category-input').value,
      aiModel: document.getElementById('prompt-model-input').value,
      tags: document.getElementById('prompt-tags-input').value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0),
      content: document.getElementById('prompt-content-input').value.trim(),
      isPublic: document.getElementById('prompt-public-input').checked
    };
    
    // Validate required fields
    if (!promptData.title || !promptData.category || !promptData.aiModel || !promptData.content) {
      UIComponents.createNotification('Please fill in all required fields', 'error');
      return;
    }
    
    try {
      if (this.currentEditingPrompt) {
        // Update existing prompt
        const updatedPrompt = await storageManager.updateUserPrompt(
          this.currentEditingPrompt.id,
          promptData
        );
        
        const index = this.userPrompts.findIndex(p => p.id === this.currentEditingPrompt.id);
        if (index !== -1) {
          this.userPrompts[index] = updatedPrompt;
        }
        
        UIComponents.createNotification('Prompt updated successfully!', 'success');
      } else {
        // Create new prompt
        const newPrompt = await storageManager.addUserPrompt(promptData);
        this.userPrompts.push(newPrompt);
        UIComponents.createNotification('Prompt created successfully!', 'success');
      }
      
      this.renderUserPrompts();
      this.closeEditor();
    } catch (error) {
      console.error('Error saving prompt:', error);
      UIComponents.createNotification('Error saving prompt', 'error');
    }
  }
  
  search(query, section) {
    this.searchQuery = query;
    
    switch (section) {
      case 'my-prompts':
        this.renderUserPrompts();
        break;
      case 'discover':
        this.renderPublicPrompts();
        break;
      case 'favorites':
        this.renderFavoritePrompts();
        break;
    }
  }
  
  clearFilters() {
    this.searchQuery = '';
    this.categoryFilter = '';
    this.modelFilter = '';
    
    // Reset UI
    document.getElementById('search-input').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('model-filter').value = '';
    
    this.renderPublicPrompts();
  }
  
  findPromptById(promptId) {
    return this.userPrompts.find(p => p.id === promptId) ||
           this.publicPrompts.find(p => p.id === promptId);
  }
  
  async updatePublicPromptStats(promptId, stats) {
    // Mock implementation - in a real app, this would update the server
    const prompt = this.publicPrompts.find(p => p.id === promptId);
    if (prompt) {
      prompt.stats = stats;
      await storageManager.setPublicPrompts(this.publicPrompts);
    }
  }
  
  // Export user prompts
  exportPrompts() {
    const data = {
      prompts: this.userPrompts,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aifox-prompts-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // Import user prompts
  async importPrompts(file) {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (data.prompts && Array.isArray(data.prompts)) {
        // Add imported prompts to existing ones
        for (const prompt of data.prompts) {
          await storageManager.addUserPrompt(prompt);
        }
        
        await this.loadUserPrompts();
        UIComponents.createNotification('Prompts imported successfully!', 'success');
      } else {
        throw new Error('Invalid file format');
      }
    } catch (error) {
      console.error('Error importing prompts:', error);
      UIComponents.createNotification('Error importing prompts', 'error');
    }
  }
}

// Make PromptManager globally available
window.PromptManager = PromptManager;