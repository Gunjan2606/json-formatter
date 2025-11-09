// JSON formatting worker for large files

// Polyfill Buffer for worker environment
if (typeof Buffer === 'undefined') {
  self.Buffer = function() {
    return new Uint8Array();
  };
  self.Buffer.isBuffer = () => false;
  self.Buffer.from = (data) => new Uint8Array();
  self.Buffer.alloc = (size) => new Uint8Array(size);
}

// Recursively sort object keys
function sortObjectKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = sortObjectKeys(obj[key]);
        return sorted;
      }, {});
  }
  return obj;
}

self.onmessage = (event) => {
  const { action, data, sortKeys = false } = event.data;
  
  try {
    if (action === 'format') {
      let parsed = JSON.parse(data);
      if (sortKeys) {
        parsed = sortObjectKeys(parsed);
      }
      const formatted = JSON.stringify(parsed, null, 2);
      self.postMessage({ success: true, formatted, action: 'format' });
    } else if (action === 'minify') {
      let parsed = JSON.parse(data);
      if (sortKeys) {
        parsed = sortObjectKeys(parsed);
      }
      const minified = JSON.stringify(parsed);
      self.postMessage({ success: true, formatted: minified, action: 'minify' });
    } else if (action === 'validate') {
      JSON.parse(data);
      self.postMessage({ success: true, valid: true, action: 'validate' });
    }
  } catch (err) {
    // Parse error details
    const errorMatch = err.message.match(/position (\d+)/);
    const position = errorMatch ? parseInt(errorMatch[1]) : 0;
    
    // Calculate line and column
    const lines = data.substring(0, position).split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    
    self.postMessage({
      success: false,
      error: err.message,
      line,
      column,
      action: event.data.action
    });
  }
};

