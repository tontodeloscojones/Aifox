// Storage utility functions for AIFox extension

class StorageManager {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }
  
  // Get data from storage with caching
  async get(keys) {
    const cacheKey = Array.isArray(keys) ? keys.join(',') : keys;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
      this.cache.delete(cacheKey);
    }
    
    // Get from browser storage
    const data = await browser.storage.local.get(keys);
    
    // Cache the result
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
  
  // Set data in storage and update cache
  async set(data) {
    await browser.storage.local.set(data);
    
    // Update cache
    Object.keys(data).forEach(key => {
      this.cache.set(key, {
        data: { [key]: data[key] },
        timestamp: Date.now()
      });
    });
  }
  
  // Remove data from storage and cache
  async remove(keys) {
    await browser.storage.local.remove(keys);
    
    // Remove from cache
    const keysArray = Array.isArray(keys) ? keys : [keys];
    keysArray.forEach(key => {
      this.cache.delete(key);
    });
  }
  
  // Clear all data
  async clear() {
    await browser.storage.local.clear();
    this.cache.clear();
  }
  
  // Clear cache
  clearCache() {
    this.cache.clear();
  }
  
  // Get AI applications
  async getAIApps() {
    const data = await this.get('aiApps');
    return data.aiApps || [];
  }
  
  // Set AI applications
  async setAIApps(apps) {
    await this.set({ aiApps: apps });
  }
  
  // Get categories
  async getCategories() {
    const data = await this.get('categories');
    return data.categories || [];
  }
  
  // Set categories
  async setCategories(categories) {
    await this.set({ categories });
  }
  
  // Get user prompts
  async getUserPrompts() {
    const data = await this.get('userPrompts');
    return data.userPrompts || [];
  }
  
  // Set user prompts
  async setUserPrompts(prompts) {
    await this.set({ userPrompts: prompts });
  }
  
  // Add user prompt
  async addUserPrompt(prompt) {
    const prompts = await this.getUserPrompts();
    const newPrompt = {
      id: this.generateId(),
      ...prompt,
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString()
    };
    prompts.push(newPrompt);
    await this.setUserPrompts(prompts);
    return newPrompt;
  }
  
  // Update user prompt
  async updateUserPrompt(promptId, updates) {
    const prompts = await this.getUserPrompts();
    const index = prompts.findIndex(p => p.id === promptId);
    
    if (index !== -1) {
      prompts[index] = {
        ...prompts[index],
        ...updates,
        dateModified: new Date().toISOString()
      };
      await this.setUserPrompts(prompts);
      return prompts[index];
    }
    
    return null;
  }
  
  // Delete user prompt
  async deleteUserPrompt(promptId) {
    const prompts = await this.getUserPrompts();
    const filteredPrompts = prompts.filter(p => p.id !== promptId);
    await this.setUserPrompts(filteredPrompts);
    return filteredPrompts.length < prompts.length;
  }
  
  // Get public prompts
  async getPublicPrompts() {
    const data = await this.get('publicPrompts');
    return data.publicPrompts || [];
  }
  
  // Set public prompts
  async setPublicPrompts(prompts) {
    await this.set({ publicPrompts: prompts });
  }
  
  // Get favorite prompts
  async getFavoritePrompts() {
    const data = await this.get('favoritePrompts');
    return data.favoritePrompts || [];
  }
  
  // Add to favorites
  async addToFavorites(promptId) {
    const favorites = await this.getFavoritePrompts();
    if (!favorites.includes(promptId)) {
      favorites.push(promptId);
      await this.set({ favoritePrompts: favorites });
    }
    return favorites;
  }
  
  // Remove from favorites
  async removeFromFavorites(promptId) {
    const favorites = await this.getFavoritePrompts();
    const filteredFavorites = favorites.filter(id => id !== promptId);
    await this.set({ favoritePrompts: filteredFavorites });
    return filteredFavorites;
  }
  
  // Get settings
  async getSettings() {
    const data = await this.get('settings');
    return data.settings || {
      theme: 'auto',
      defaultView: 'ai-apps',
      syncEnabled: false,
      openOnStartup: false
    };
  }
  
  // Set settings
  async setSettings(settings) {
    const currentSettings = await this.getSettings();
    const newSettings = { ...currentSettings, ...settings };
    await this.set({ settings: newSettings });
    return newSettings;
  }
  
  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  // Export data
  async exportData() {
    const data = await browser.storage.local.get();
    return {
      ...data,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
  }
  
  // Import data
  async importData(data) {
    // Validate data structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format');
    }
    
    // Clear existing data
    await this.clear();
    
    // Import new data (excluding metadata)
    const { exportDate, version, ...importData } = data;
    await this.set(importData);
    
    return true;
  }
  
  // Listen for storage changes
  onChanged(callback) {
    return browser.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'local') {
        callback(changes);
      }
    });
  }
}

// Create global storage manager instance
window.storageManager = new StorageManager();