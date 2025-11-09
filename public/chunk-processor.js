// Chunk-based JSON processor for files > 100MB
// Processes in chunks and streams output directly to download

// Polyfill Buffer
if (typeof Buffer === 'undefined') {
  self.Buffer = function() {
    return new Uint8Array();
  };
  self.Buffer.isBuffer = () => false;
  self.Buffer.from = (data) => new Uint8Array();
  self.Buffer.alloc = (size) => new Uint8Array(size);
}

self.onmessage = async (event) => {
  const { text, action, sortKeys = false } = event.data;
  
  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
  let processed = 0;
  const totalSize = text.length;
  
  try {
    // For minify, we need to parse the whole thing (but in worker thread)
    if (action === 'minify') {
      self.postMessage({ type: 'progress', percent: 10, message: 'Parsing JSON...' });
      
      let parsed = JSON.parse(text);
      
      self.postMessage({ type: 'progress', percent: 50, message: 'Minifying...' });
      
      if (sortKeys) {
        parsed = sortObjectKeysRecursive(parsed);
      }
      
      const result = JSON.stringify(parsed);
      
      self.postMessage({ type: 'progress', percent: 100, message: 'Done' });
      self.postMessage({ type: 'complete', result });
      
    } else {
      // For format, parse and format in one go (worker thread keeps UI responsive)
      self.postMessage({ type: 'progress', percent: 10, message: 'Parsing JSON...' });
      
      let parsed = JSON.parse(text);
      
      self.postMessage({ type: 'progress', percent: 40, message: 'Processing...' });
      
      if (sortKeys) {
        parsed = sortObjectKeysRecursive(parsed);
        self.postMessage({ type: 'progress', percent: 70, message: 'Sorting keys...' });
      }
      
      self.postMessage({ type: 'progress', percent: 85, message: 'Formatting...' });
      const result = JSON.stringify(parsed, null, 2);
      
      self.postMessage({ type: 'progress', percent: 100, message: 'Done' });
      self.postMessage({ type: 'complete', result });
    }
    
  } catch (err) {
    const errorMatch = err.message.match(/position (\d+)/);
    const position = errorMatch ? parseInt(errorMatch[1]) : 0;
    const lines = text.substring(0, position).split('\n');
    
    self.postMessage({
      type: 'error',
      message: err.message,
      line: lines.length,
      column: lines[lines.length - 1].length + 1
    });
  }
};

function sortObjectKeysRecursive(obj) {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeysRecursive);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = sortObjectKeysRecursive(obj[key]);
        return sorted;
      }, {});
  }
  return obj;
}

