// AIFox Popup JavaScript

document.addEventListener('DOMContentLoaded', async () => {
  await initializePopup();
  setupEventListeners();
});

async function initializePopup() {
  // Load user stats
  const storage = await browser.storage.local.get(['userPrompts', 'aiApps']);
  
  // Update prompt count
  const promptCount = storage.userPrompts ? storage.userPrompts.length : 0;
  document.getElementById('prompts-count').textContent = promptCount;
  
  // Update apps count
  const appsCount = storage.aiApps ? storage.aiApps.length : 300;
  document.getElementById('apps-count').textContent = appsCount;
}

function setupEventListeners() {
  // Open sidebar button
  document.getElementById('open-sidebar').addEventListener('click', () => {
    browser.sidebarAction.open();
    window.close();
  });
  
  // Open prompt manager button
  document.getElementById('open-prompt-manager').addEventListener('click', () => {
    browser.sidebarAction.open();
    // Send message to sidebar to switch to prompt manager
    browser.runtime.sendMessage({
      action: 'openPromptManager'
    });
    window.close();
  });
  
  // Settings button
  document.getElementById('settings-btn').addEventListener('click', () => {
    browser.sidebarAction.open();
    browser.runtime.sendMessage({
      action: 'openSettings'
    });
    window.close();
  });
  
  // Quick links - open in new tab
  document.querySelectorAll('.quick-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      browser.tabs.create({ url: link.href });
      window.close();
    });
  });
}

// Listen for storage changes to update stats
browser.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local') {
    if (changes.userPrompts) {
      const newCount = changes.userPrompts.newValue ? changes.userPrompts.newValue.length : 0;
      document.getElementById('prompts-count').textContent = newCount;
    }
    
    if (changes.aiApps) {
      const newCount = changes.aiApps.newValue ? changes.aiApps.newValue.length : 300;
      document.getElementById('apps-count').textContent = newCount;
    }
  }
});