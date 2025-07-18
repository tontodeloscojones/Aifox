// web-ext configuration for AIFox extension
module.exports = {
  // Global options
  verbose: true,
  
  // Build options
  build: {
    overwriteDest: true,
    filename: 'aifox-extension-{version}.xpi'
  },
  
  // Run options (for development)
  run: {
    firefox: 'firefox-developer-edition',
    startUrl: ['about:debugging#/runtime/this-firefox'],
    pref: {
      // Enable extension debugging
      'devtools.chrome.enabled': true,
      'devtools.debugger.remote-enabled': true,
      'devtools.debugger.prompt-connection': false,
      // Disable signature requirement for development
      'xpinstall.signatures.required': false
    }
  },
  
  // Lint options
  lint: {
    pretty: true,
    warningsAsErrors: false,
    metadata: true,
    output: 'text',
    boring: false,
    selfHosted: false
  },
  
  // Sign options
  sign: {
    channel: 'unlisted', // or 'listed' for AMO
    timeout: 900000, // 15 minutes
    id: 'aifox@example.com' // Must match manifest.json
  },
  
  // Ignore patterns
  ignoreFiles: [
    'web-ext-config.js',
    'package.json',
    'package-lock.json',
    'node_modules',
    '.git',
    '.gitignore',
    '*.log',
    '*.tmp',
    '.DS_Store',
    'Thumbs.db'
  ]
};