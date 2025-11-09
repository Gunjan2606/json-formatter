// Clarinet-based streaming JSON parser for 50MB-1GB files
importScripts("https://unpkg.com/clarinet@0.12.4/clarinet.js");

// Buffer polyfill
if (typeof Buffer === 'undefined') {
  self.Buffer = function() { return new Uint8Array(); };
  self.Buffer.isBuffer = () => false;
  self.Buffer.from = () => new Uint8Array();
  self.Buffer.alloc = (size) => new Uint8Array(size);
}

self.onmessage = async (event) => {
  const { action, chunks, totalSize, sortKeys = false } = event.data;
  
  if (action === 'init') {
    // Initialize parser
    self.postMessage({ type: 'ready' });
    return;
  }
  
  if (action === 'parse') {
    try {
      console.log('Clarinet worker received:', {
        action,
        chunksCount: chunks?.length,
        totalSize,
        firstChunkStart: chunks?.[0]?.substring(0, 50)
      });
      
      const parser = clarinet.createStream();
      const shouldMinify = event.data.minify || false;
      const indent = shouldMinify ? '' : '  ';
      const newline = shouldMinify ? '' : '\n';
      
      let output = '';
      let depth = 0;
      let currentKey = null;
      let isFirstInContainer = true;
      let stack = [];
      
      const emit = (text) => {
        output += text;
        // Send chunks every 500KB
        if (output.length > 500000) {
          self.postMessage({ 
            type: 'chunk', 
            data: output 
          });
          output = '';
        }
      };
      
      parser.on('openobject', () => {
        if (currentKey) {
          emit(`${indent.repeat(depth)}${JSON.stringify(currentKey)}: {${newline}`);
          currentKey = null;
        } else {
          if (!isFirstInContainer) emit(`,${newline}`);
          emit(`${indent.repeat(depth)}{${newline}`);
        }
        depth++;
        isFirstInContainer = true;
        stack.push('object');
      });
      
      parser.on('closeobject', () => {
        depth--;
        emit(`${newline}${indent.repeat(depth)}}`);
        stack.pop();
        isFirstInContainer = false;
      });
      
      parser.on('openarray', () => {
        if (currentKey) {
          emit(`${indent.repeat(depth)}${JSON.stringify(currentKey)}: [${newline}`);
          currentKey = null;
        } else {
          if (!isFirstInContainer) emit(`,${newline}`);
          emit(`${indent.repeat(depth)}[${newline}`);
        }
        depth++;
        isFirstInContainer = true;
        stack.push('array');
      });
      
      parser.on('closearray', () => {
        depth--;
        emit(`${newline}${indent.repeat(depth)}]`);
        stack.pop();
        isFirstInContainer = false;
      });
      
      parser.on('key', (key) => {
        currentKey = key;
      });
      
      parser.on('value', (value) => {
        if (currentKey) {
          if (!isFirstInContainer) emit(`,${newline}`);
          emit(`${indent.repeat(depth)}${JSON.stringify(currentKey)}: ${JSON.stringify(value)}`);
          currentKey = null;
        } else {
          if (!isFirstInContainer) emit(`,${newline}`);
          emit(`${indent.repeat(depth)}${JSON.stringify(value)}`);
        }
        isFirstInContainer = false;
      });
      
      parser.on('error', (err) => {
        console.error('Clarinet parser error:', err);
        self.postMessage({ 
          type: 'error', 
          data: `Clarinet error: ${err.message || err}` 
        });
      });
      
      parser.on('end', () => {
        if (output.length > 0) {
          self.postMessage({ type: 'chunk', data: output });
        }
        self.postMessage({ type: 'done' });
      });
      
      // Process text in chunks
      let processedChunks = 0;
      for (let i = 0; i < chunks.length; i++) {
        parser.write(chunks[i]);
        processedChunks++;
        
        const percent = Math.round((processedChunks / chunks.length) * 100);
        self.postMessage({ type: 'progress', percent });
      }
      
      parser.end();
      
    } catch (err) {
      console.error('Clarinet worker catch block error:', err);
      self.postMessage({ 
        type: 'error', 
        data: `Worker error: ${err.message || err}` 
      });
    }
  }
};

