const fs = require('fs');
const filePath = 'index.js';
let content = fs.readFileSync(filePath, 'utf8');

// Add no-cache headers after config.headers initialization
const searchPattern = /config\.headers = config\.headers \|\| \{\}/g;
const matches = content.match(searchPattern);

if (matches && matches.length === 1) {
  // Find the line and add after it
  content = content.replace(
    'config.headers.Authorization = `Bearer ${token}`',
    `config.headers.Authorization = \`Bearer \${token}\`
      }
    }

    // Prevent browser caching for admin panel - always get fresh data
    config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    config.headers['Pragma'] = 'no-cache'
    config.headers['Expires'] = '0'`
  );
  
  // Remove duplicate closing braces
  content = content.replace(/\n    \}\n  \} catch/g, '\n  } catch');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ No-cache headers added successfully');
} else {
  console.log('Pattern not found or multiple matches - skipping');
}
