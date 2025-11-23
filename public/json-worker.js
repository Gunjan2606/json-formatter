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

// Unwrap stringified JSON recursively
function unwrapStringifiedJSON(obj) {
  if (Array.isArray(obj)) {
    return obj.map(unwrapStringifiedJSON);
  } else if (obj !== null && typeof obj === 'object') {
    const result = {};
    for (const key in obj) {
      result[key] = unwrapStringifiedJSON(obj[key]);
    }
    return result;
  } else if (typeof obj === 'string') {
    // Try to parse the string as JSON
    try {
      const trimmed = obj.trim();
      if ((trimmed.startsWith('{') && trimmed.endsWith('}')) ||
          (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
        const parsed = JSON.parse(obj);
        // Recursively unwrap the parsed object
        return unwrapStringifiedJSON(parsed);
      }
    } catch {
      // Not valid JSON, return as-is
    }
  }
  return obj;
}

self.onmessage = (event) => {
  const { action, data, sortKeys = false } = event.data;
  
  try {
    let parsed;
    
    // Try to parse as JSON string first (handle stringified JSON)
    try {
      const trimmed = data.trim();
      if (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.includes('\\"')) {
        // It's a stringified JSON, unwrap it
        const stringValue = JSON.parse(trimmed);
        if (typeof stringValue === 'string') {
          // Try to parse the inner JSON
          try {
            parsed = JSON.parse(stringValue);
          } catch {
            parsed = JSON.parse(data);
          }
        } else {
          parsed = stringValue;
        }
      } else {
        parsed = JSON.parse(data);
      }
    } catch {
      // Fallback to regular parse
      parsed = JSON.parse(data);
    }
    
    // Unwrap any nested stringified JSON
    parsed = unwrapStringifiedJSON(parsed);
    
    if (action === 'format') {
      if (sortKeys) {
        parsed = sortObjectKeys(parsed);
      }
      const formatted = JSON.stringify(parsed, null, 2);
      self.postMessage({ success: true, formatted, action: 'format' });
    } else if (action === 'minify') {
      if (sortKeys) {
        parsed = sortObjectKeys(parsed);
      }
      const minified = JSON.stringify(parsed);
      self.postMessage({ success: true, formatted: minified, action: 'minify' });
    } else if (action === 'validate') {
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

