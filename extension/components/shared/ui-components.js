// Shared UI components for AIFox extension

class UIComponents {
  // Create app card element
  static createAppCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.dataset.appId = app.id;
    
    // Create rating stars
    const rating = Math.round(app.popularity / 20); // Convert to 5-star scale
    const stars = '⭐'.repeat(rating);
    
    // Determine pricing class
    const pricingClass = app.pricing.toLowerCase().replace(' ', '');
    
    card.innerHTML = `
      <div class="app-header">
        <h3 class="app-name">${this.escapeHtml(app.name)}</h3>
        <div class="app-rating">${stars}</div>
      </div>
      <p class="app-description">${this.escapeHtml(app.description)}</p>
      <div class="app-tags">
        ${app.tags.map(tag => `<span class="app-tag">#${this.escapeHtml(tag)}</span>`).join('')}
      </div>
      <div class="app-footer">
        <span class="app-pricing ${pricingClass}">${this.escapeHtml(app.pricing)}</span>
        <button class="app-visit-btn" data-url="${this.escapeHtml(app.url)}">Visit</button>
      </div>
    `;
    
    // Add click handler for the card
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('app-visit-btn')) {
        this.openAppDetails(app);
      }
    });
    
    // Add click handler for visit button
    const visitBtn = card.querySelector('.app-visit-btn');
    visitBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      browser.tabs.create({ url: app.url });
    });
    
    return card;
  }
  
  // Create prompt card element
  static createPromptCard(prompt, isPublic = false) {
    const card = document.createElement('div');
    card.className = 'prompt-card';
    card.dataset.promptId = prompt.id;
    
    const actions = isPublic ? this.createPublicPromptActions(prompt) : this.createUserPromptActions(prompt);
    
    card.innerHTML = `
      <div class="prompt-header">
        <h3 class="prompt-title">${this.escapeHtml(prompt.title)}</h3>
        <div class="prompt-actions">${actions}</div>
      </div>
      <div class="prompt-meta">
        <span class="prompt-category">Category: ${this.escapeHtml(prompt.category)}</span>
        <span class="prompt-model">Model: ${this.escapeHtml(prompt.aiModel)}</span>
        ${isPublic ? `<span class="prompt-author">By: ${this.escapeHtml(prompt.author)}</span>` : ''}
      </div>
      <div class="prompt-content">${this.escapeHtml(prompt.content.substring(0, 200))}${prompt.content.length > 200 ? '...' : ''}</div>
      <div class="prompt-tags">
        ${prompt.tags.map(tag => `<span class="prompt-tag">#${this.escapeHtml(tag)}</span>`).join('')}
      </div>
      ${isPublic && prompt.stats ? `
        <div class="prompt-stats">
          <span>${prompt.stats.upvotes} ⬆️</span>
          <span>${prompt.stats.views} 👁️</span>
          <span>${prompt.stats.copies} 📋</span>
        </div>
      ` : ''}
    `;
    
    // Add click handler to expand/view full prompt
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.prompt-actions')) {
        this.openPromptDetails(prompt, isPublic);
      }
    });
    
    return card;
  }
  
  // Create user prompt actions
  static createUserPromptActions(prompt) {
    return `
      <button class="prompt-action-btn edit-btn" title="Edit" data-action="edit">✏️</button>
      <button class="prompt-action-btn copy-btn" title="Copy" data-action="copy">📋</button>
      <button class="prompt-action-btn share-btn" title="Share" data-action="share">🔗</button>
      <button class="prompt-action-btn delete-btn" title="Delete" data-action="delete">🗑️</button>
    `;
  }
  
  // Create public prompt actions
  static createPublicPromptActions(prompt) {
    return `
      <button class="prompt-action-btn copy-btn" title="Copy" data-action="copy">📋</button>
      <button class="prompt-action-btn favorite-btn" title="Add to Favorites" data-action="favorite">❤️</button>
      <button class="prompt-action-btn upvote-btn" title="Upvote" data-action="upvote">⬆️</button>
    `;
  }
  
  // Create category item
  static createCategoryItem(category, isActive = false) {
    const item = document.createElement('div');
    item.className = `category-item ${isActive ? 'active' : ''}`;
    item.dataset.categoryId = category.id;
    
    item.innerHTML = `
      <span class="category-icon">${category.icon}</span>
      <span class="category-name">${this.escapeHtml(category.name)}</span>
    `;
    
    return item;
  }
  
  // Create loading spinner
  static createLoadingSpinner(text = 'Loading...') {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = `
      <div class="spinner"></div>
      <span>${this.escapeHtml(text)}</span>
    `;
    return spinner;
  }
  
  // Create empty state
  static createEmptyState(title, description, actionText = null, actionCallback = null) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    
    let actionButton = '';
    if (actionText && actionCallback) {
      actionButton = `<button class="btn primary empty-action-btn">${this.escapeHtml(actionText)}</button>`;
    }
    
    emptyState.innerHTML = `
      <div class="empty-icon">📭</div>
      <h3 class="empty-title">${this.escapeHtml(title)}</h3>
      <p class="empty-description">${this.escapeHtml(description)}</p>
      ${actionButton}
    `;
    
    if (actionCallback) {
      const button = emptyState.querySelector('.empty-action-btn');
      button.addEventListener('click', actionCallback);
    }
    
    return emptyState;
  }
  
  // Create notification
  static createNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    
    notification.innerHTML = `
      <span class="notification-icon">${icons[type] || icons.info}</span>
      <span class="notification-message">${this.escapeHtml(message)}</span>
      <button class="notification-close">✖️</button>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, duration);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    });
    
    return notification;
  }
  
  // Create modal
  static createModal(title, content, actions = []) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const actionsHtml = actions.map(action => 
      `<button class="btn ${action.type || 'secondary'}" data-action="${action.action}">${this.escapeHtml(action.text)}</button>`
    ).join('');
    
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${this.escapeHtml(title)}</h3>
          <button class="close-btn">✖️</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        <div class="modal-footer">
          ${actionsHtml}
        </div>
      </div>
    `;
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
    
    // Click outside to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
    
    // Action buttons
    actions.forEach(action => {
      const btn = modal.querySelector(`[data-action="${action.action}"]`);
      if (btn && action.callback) {
        btn.addEventListener('click', action.callback);
      }
    });
    
    return modal;
  }
  
  // Open app details modal
  static openAppDetails(app) {
    const content = `
      <div class="app-details">
        <div class="app-details-header">
          <h2>${this.escapeHtml(app.name)}</h2>
          <span class="app-pricing ${app.pricing.toLowerCase()}">${this.escapeHtml(app.pricing)}</span>
        </div>
        <p class="app-description">${this.escapeHtml(app.description)}</p>
        <div class="app-meta">
          <div class="meta-item">
            <strong>Category:</strong> ${this.escapeHtml(app.category)}
          </div>
          <div class="meta-item">
            <strong>Popularity:</strong> ${app.popularity}/100
          </div>
          <div class="meta-item">
            <strong>Tags:</strong> ${app.tags.map(tag => `#${this.escapeHtml(tag)}`).join(', ')}
          </div>
        </div>
      </div>
    `;
    
    const actions = [
      {
        text: 'Visit Website',
        type: 'primary',
        action: 'visit',
        callback: () => {
          browser.tabs.create({ url: app.url });
        }
      },
      {
        text: 'Close',
        type: 'secondary',
        action: 'close',
        callback: (e) => {
          e.target.closest('.modal').classList.add('hidden');
        }
      }
    ];
    
    const modal = this.createModal(`${app.name} Details`, content, actions);
    document.body.appendChild(modal);
    modal.classList.remove('hidden');
  }
  
  // Open prompt details modal
  static openPromptDetails(prompt, isPublic = false) {
    const content = `
      <div class="prompt-details">
        <div class="prompt-meta">
          <div class="meta-item">
            <strong>Category:</strong> ${this.escapeHtml(prompt.category)}
          </div>
          <div class="meta-item">
            <strong>AI Model:</strong> ${this.escapeHtml(prompt.aiModel)}
          </div>
          ${isPublic ? `<div class="meta-item"><strong>Author:</strong> ${this.escapeHtml(prompt.author)}</div>` : ''}
          <div class="meta-item">
            <strong>Tags:</strong> ${prompt.tags.map(tag => `#${this.escapeHtml(tag)}`).join(', ')}
          </div>
        </div>
        <div class="prompt-content-full">
          <h4>Prompt Content:</h4>
          <pre class="prompt-text">${this.escapeHtml(prompt.content)}</pre>
        </div>
      </div>
    `;
    
    const actions = [
      {
        text: 'Copy to Clipboard',
        type: 'primary',
        action: 'copy',
        callback: () => {
          navigator.clipboard.writeText(prompt.content);
          this.createNotification('Prompt copied to clipboard!', 'success');
        }
      },
      {
        text: 'Close',
        type: 'secondary',
        action: 'close',
        callback: (e) => {
          e.target.closest('.modal').classList.add('hidden');
        }
      }
    ];
    
    const modal = this.createModal(prompt.title, content, actions);
    document.body.appendChild(modal);
    modal.classList.remove('hidden');
  }
  
  // Escape HTML to prevent XSS
  static escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Format date
  static formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  // Truncate text
  static truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
  
  // Debounce function
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Make UIComponents globally available
window.UIComponents = UIComponents;