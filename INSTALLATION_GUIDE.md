# AIFox Extension Installation Guide

This guide will walk you through installing the AIFox Firefox extension using different methods.

## Prerequisites

- Firefox 109.0 or later
- Basic computer skills for file management

## Installation Methods

### Method 1: Temporary Installation (Recommended for Testing)

This method is perfect for testing the extension. The extension will be removed when Firefox restarts.

#### Step-by-Step Instructions:

1. **Download the Extension**
   - Download the `aifox-extension.xpi` file from the repository
   - Save it to a location you can easily find (e.g., Downloads folder)

2. **Open Firefox Developer Tools**
   - Open Firefox
   - Type `about:debugging` in the address bar and press Enter
   - Or go to Menu → More Tools → Remote Debugging

3. **Access This Firefox**
   - Click on "This Firefox" in the left sidebar
   - You should see a page titled "Temporary Extensions"

4. **Load the Extension**
   - Click the "Load Temporary Add-on..." button
   - Navigate to where you saved `aifox-extension.xpi`
   - Select the file and click "Open"

5. **Verify Installation**
   - The extension should appear in the "Temporary Extensions" list
   - You should see the AIFox icon in your Firefox toolbar
   - The extension is now ready to use!

### Method 2: Developer Installation (For Development)

Use this method if you want to modify the extension or contribute to development.

#### Step-by-Step Instructions:

1. **Download the Source Code**
   ```bash
   git clone https://github.com/tontodeloscojones/Aifox.git
   cd Aifox
   ```

2. **Open Firefox Developer Tools**
   - Type `about:debugging` in the address bar
   - Click "This Firefox" in the left sidebar

3. **Load from Source**
   - Click "Load Temporary Add-on..."
   - Navigate to the `Aifox/extension` folder
   - Select the `manifest.json` file
   - Click "Open"

4. **Development Benefits**
   - Changes to the code will be reflected after reloading the extension
   - Access to browser console for debugging
   - Ability to inspect and modify the extension

### Method 3: Permanent Installation (Advanced)

⚠️ **Warning**: This method requires disabling Firefox security features and is not recommended for regular users.

#### For Advanced Users Only:

1. **Enable Unsigned Extensions**
   - Type `about:config` in Firefox address bar
   - Search for `xpinstall.signatures.required`
   - Double-click to set it to `false`

2. **Install the XPI**
   - Drag and drop `aifox-extension.xpi` onto Firefox
   - Follow the installation prompts

3. **Security Note**
   - This disables signature verification for all extensions
   - Only do this on a development/testing Firefox profile
   - Re-enable the setting after testing

## Post-Installation Setup

### 1. First Launch

After installation, you should see:
- AIFox icon in the Firefox toolbar
- A welcome notification (if implemented)

### 2. Opening the Extension

You can access AIFox in several ways:

- **Toolbar Icon**: Click the AIFox icon for the popup
- **Sidebar**: Press `Ctrl+Shift+A` to open the sidebar
- **Context Menu**: Right-click on any page to see AIFox options

### 3. Initial Configuration

1. **Open the Sidebar**
   - Press `Ctrl+Shift+A` or click the toolbar icon and select "Open Sidebar"

2. **Explore AI Applications**
   - Click the "AI Apps" tab
   - Browse through categories or use the search function
   - Click on any application to visit its website

3. **Set Up Prompt Manager**
   - Click the "Prompts" tab
   - Create your first prompt by clicking "New Prompt"
   - Explore public prompts in the "Discover" section

## Troubleshooting

### Extension Not Loading

**Problem**: Extension doesn't appear after installation
**Solutions**:
- Refresh the `about:debugging` page
- Try restarting Firefox
- Check that you selected the correct file (`manifest.json` for source, `.xpi` for package)

### Missing Icon in Toolbar

**Problem**: AIFox icon doesn't appear in toolbar
**Solutions**:
- Right-click on the toolbar and select "Customize Toolbar"
- Look for the AIFox icon and drag it to the toolbar
- Check if the extension is enabled in `about:addons`

### Sidebar Not Opening

**Problem**: Keyboard shortcut doesn't work
**Solutions**:
- Try clicking the toolbar icon and selecting "Open Sidebar"
- Check if another extension is using the same shortcut
- Go to `about:addons` → AIFox → Options to check shortcuts

### Permission Errors

**Problem**: Extension can't access certain features
**Solutions**:
- Check that all permissions were granted during installation
- Go to `about:addons` → AIFox → Permissions to review
- Try reinstalling the extension

### Data Not Saving

**Problem**: Prompts or settings don't persist
**Solutions**:
- Check Firefox storage permissions
- Ensure you're not in Private Browsing mode
- Try creating a new Firefox profile for testing

## Uninstalling

### Temporary Extensions
- Go to `about:debugging` → "This Firefox"
- Find AIFox in the list and click "Remove"

### Permanent Extensions
- Go to `about:addons`
- Find AIFox and click "Remove"
- Restart Firefox to complete removal

## Development Setup

### For Contributors

1. **Fork the Repository**
   ```bash
   git fork https://github.com/tontodeloscojones/Aifox.git
   git clone https://github.com/yourusername/Aifox.git
   ```

2. **Set Up Development Environment**
   ```bash
   cd Aifox/extension
   # Make your changes
   ```

3. **Test Changes**
   - Load the extension using Method 2 above
   - Make changes to the code
   - Click "Reload" in `about:debugging` to see changes

4. **Debug Issues**
   - Open Browser Console (Ctrl+Shift+J)
   - Check for error messages
   - Use `console.log()` in your code for debugging

### Building XPI Package

```bash
cd extension
zip -r ../aifox-extension.xpi .
```

## Browser Compatibility

| Browser | Version | Support Level |
|---------|---------|---------------|
| Firefox | 109+ | Full Support |
| Firefox ESR | 102+ | Limited Support |
| Firefox Android | Any | Not Supported* |

*Sidebar API not available on mobile

## Security Considerations

- The extension only requests necessary permissions
- All data is stored locally in your browser
- No external servers are contacted without your explicit action
- Source code is open and auditable

## Getting Help

If you encounter issues:

1. **Check this guide** for common solutions
2. **Review the logs** in Browser Console
3. **Create an issue** on GitHub with:
   - Firefox version
   - Extension version
   - Steps to reproduce the problem
   - Any error messages

## Next Steps

After successful installation:

1. **Explore the AI Apps Index** - Discover new AI tools
2. **Create Your First Prompt** - Start building your prompt library
3. **Customize Settings** - Adjust the extension to your preferences
4. **Join the Community** - Share prompts and get help

Happy exploring with AIFox! 🦊🤖