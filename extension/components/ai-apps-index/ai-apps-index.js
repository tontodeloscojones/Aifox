// AI Applications Index Manager

class AIAppsManager {
  constructor() {
    this.apps = [];
    this.categories = [];
    this.filteredApps = [];
    this.currentCategory = 'all';
    this.sortBy = 'popularity';
    this.searchQuery = '';
    
    this.appsGrid = null;
    this.categoriesList = null;
    this.loadingElement = null;
  }
  
  async init() {
    this.appsGrid = document.getElementById('apps-grid');
    this.categoriesList = document.getElementById('categories-list');
    this.loadingElement = document.getElementById('apps-loading');
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Category selection
    if (this.categoriesList) {
      this.categoriesList.addEventListener('click', (e) => {
        const categoryItem = e.target.closest('.category-item');
        if (categoryItem) {
          const categoryId = categoryItem.dataset.categoryId;
          this.selectCategory(categoryId);
        }
      });
    }
  }
  
  async loadCategories() {
    try {
      this.categories = await storageManager.getCategories();
      this.renderCategories();
    } catch (error) {
      console.error('Error loading categories:', error);
      UIComponents.createNotification('Error loading categories', 'error');
    }
  }
  
  async loadApps() {
    try {
      this.showLoading(true);
      this.apps = await storageManager.getAIApps();
      this.filteredApps = [...this.apps];
      this.applyFiltersAndSort();
      this.renderApps();
      this.showLoading(false);
    } catch (error) {
      console.error('Error loading apps:', error);
      UIComponents.createNotification('Error loading applications', 'error');
      this.showLoading(false);
    }
  }
  
  renderCategories() {
    if (!this.categoriesList) return;
    
    // Add "All" category
    const allCategory = {
      id: 'all',
      name: 'All Applications',
      icon: '📱'
    };
    
    const allCategories = [allCategory, ...this.categories];
    
    this.categoriesList.innerHTML = '';
    
    allCategories.forEach(category => {
      const categoryElement = UIComponents.createCategoryItem(
        category,
        category.id === this.currentCategory
      );
      
      this.categoriesList.appendChild(categoryElement);
    });
  }
  
  renderApps() {
    if (!this.appsGrid) return;
    
    this.appsGrid.innerHTML = '';
    
    if (this.filteredApps.length === 0) {
      const emptyState = UIComponents.createEmptyState(
        'No applications found',
        'Try adjusting your search or category filter.',
        'Clear Filters',
        () => this.clearFilters()
      );
      this.appsGrid.appendChild(emptyState);
      return;
    }
    
    this.filteredApps.forEach(app => {
      const appCard = UIComponents.createAppCard(app);
      this.appsGrid.appendChild(appCard);
    });
    
    // Update section title
    this.updateSectionTitle();
  }
  
  selectCategory(categoryId) {
    this.currentCategory = categoryId;
    
    // Update category selection UI
    document.querySelectorAll('.category-item').forEach(item => {
      item.classList.remove('active');
    });
    
    const selectedCategory = document.querySelector(`[data-category-id="${categoryId}"]`);
    if (selectedCategory) {
      selectedCategory.classList.add('active');
    }
    
    // Apply filters and re-render
    this.applyFiltersAndSort();
    this.renderApps();
  }
  
  setSortBy(sortBy) {
    this.sortBy = sortBy;
    this.applyFiltersAndSort();
    this.renderApps();
  }
  
  search(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.applyFiltersAndSort();
    this.renderApps();
  }
  
  applyFiltersAndSort() {
    let filtered = [...this.apps];
    
    // Apply category filter
    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(app => 
        app.category.toLowerCase() === this.currentCategory.toLowerCase()
      );
    }
    
    // Apply search filter
    if (this.searchQuery) {
      filtered = filtered.filter(app => 
        app.name.toLowerCase().includes(this.searchQuery) ||
        app.description.toLowerCase().includes(this.searchQuery) ||
        app.tags.some(tag => tag.toLowerCase().includes(this.searchQuery)) ||
        app.category.toLowerCase().includes(this.searchQuery)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'popularity':
        default:
          return b.popularity - a.popularity;
      }
    });
    
    this.filteredApps = filtered;
  }
  
  clearFilters() {
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'popularity';
    
    // Reset UI
    document.getElementById('search-input').value = '';
    document.getElementById('sort-select').value = 'popularity';
    
    // Re-render
    this.selectCategory('all');
  }
  
  updateSectionTitle() {
    const titleElement = document.getElementById('apps-section-title');
    if (!titleElement) return;
    
    let title = 'All AI Applications';
    
    if (this.currentCategory !== 'all') {
      const category = this.categories.find(c => c.id === this.currentCategory);
      if (category) {
        title = `${category.name} Applications`;
      }
    }
    
    if (this.searchQuery) {
      title += ` (Search: "${this.searchQuery}")`;
    }
    
    title += ` (${this.filteredApps.length})`;
    
    titleElement.textContent = title;
  }
  
  showLoading(show) {
    if (!this.loadingElement) return;
    
    if (show) {
      this.loadingElement.classList.remove('hidden');
      this.appsGrid.style.display = 'none';
    } else {
      this.loadingElement.classList.add('hidden');
      this.appsGrid.style.display = 'grid';
    }
  }
  
  // Get app by ID
  getAppById(appId) {
    return this.apps.find(app => app.id === appId);
  }
  
  // Get apps by category
  getAppsByCategory(categoryId) {
    if (categoryId === 'all') {
      return this.apps;
    }
    return this.apps.filter(app => app.category.toLowerCase() === categoryId.toLowerCase());
  }
  
  // Get popular apps
  getPopularApps(limit = 10) {
    return [...this.apps]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);
  }
  
  // Get recently added apps (mock implementation)
  getRecentApps(limit = 10) {
    // Since we don't have actual dates, we'll return a random selection
    const shuffled = [...this.apps].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  }
  
  // Search suggestions
  getSearchSuggestions(query, limit = 5) {
    if (!query || query.length < 2) return [];
    
    const suggestions = new Set();
    const lowerQuery = query.toLowerCase();
    
    this.apps.forEach(app => {
      // Add app names that match
      if (app.name.toLowerCase().includes(lowerQuery)) {
        suggestions.add(app.name);
      }
      
      // Add categories that match
      if (app.category.toLowerCase().includes(lowerQuery)) {
        suggestions.add(app.category);
      }
      
      // Add tags that match
      app.tags.forEach(tag => {
        if (tag.toLowerCase().includes(lowerQuery)) {
          suggestions.add(tag);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, limit);
  }
  
  // Export apps data
  exportApps() {
    const data = {
      apps: this.apps,
      categories: this.categories,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aifox-apps-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // Import apps data
  async importApps(file) {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (data.apps && Array.isArray(data.apps)) {
        await storageManager.setAIApps(data.apps);
        this.apps = data.apps;
      }
      
      if (data.categories && Array.isArray(data.categories)) {
        await storageManager.setCategories(data.categories);
        this.categories = data.categories;
      }
      
      // Re-render everything
      this.renderCategories();
      this.applyFiltersAndSort();
      this.renderApps();
      
      UIComponents.createNotification('Apps imported successfully!', 'success');
    } catch (error) {
      console.error('Error importing apps:', error);
      UIComponents.createNotification('Error importing apps', 'error');
    }
  }
}

// Make AIAppsManager globally available
window.AIAppsManager = AIAppsManager;