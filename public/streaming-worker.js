// Streaming JSON Worker - handles files up to 1GB+ without memory issues
importScripts("https://unpkg.com/clarinet@0.12.4/clarinet.js");

self.onmessage = async (event) => {
  const { action, file, sortKeys = false } = event.data;
  
  try {
    if (!file) {
      self.postMessage({ type: 'error', message: 'No file provided' });
      return;
    }

    const stream = file.stream().pipeThrough(new TextDecoderStream());
    const reader = stream.getReader();
    const parser = clarinet.createStream();
    
    let bytesRead = 0;
    let result = '';
    let indent = 0;
    let stack = [];
    let currentKey = null;
    let isFirstItem = true;
    const shouldMinify = action === 'minify';
    const indentStr = shouldMinify ? '' : '  ';
    const newline = shouldMinify ? '' : '\n';
    
    // Track keys for sorting
    let objectBuffer = sortKeys ? {} : null;
    let inObject = false;
    
    const emit = (text) => {
      result += text;
      // Send chunks progressively (every 100KB)
      if (result.length > 100000) {
        self.postMessage({ 
          type: 'chunk', 
          data: result 
        });
        result = '';
      }
    };

    parser.on('openobject', (key) => {
      if (sortKeys) {
        stack.push({ type: 'object', buffer: {}, keys: [] });
        inObject = true;
      } else {
        if (currentKey !== null) {
          emit(`${indentStr.repeat(indent)}${JSON.stringify(currentKey)}: {${newline}`);
          currentKey = null;
        } else if (!isFirstItem) {
          emit(`,${newline}${indentStr.repeat(indent)}{${newline}`);
        } else {
          emit(`{${newline}`);
        }
        indent++;
        isFirstItem = true;
      }
    });

    parser.on('closeobject', () => {
      if (sortKeys && stack.length > 0) {
        const obj = stack.pop();
        if (obj.type === 'object') {
          const sortedKeys = Object.keys(obj.buffer).sort();
          let objStr = '{' + newline;
          sortedKeys.forEach((key, idx) => {
            if (idx > 0) objStr += ',' + newline;
            objStr += indentStr.repeat(indent) + JSON.stringify(key) + ': ' + JSON.stringify(obj.buffer[key]);
          });
          objStr += newline + indentStr.repeat(indent - 1) + '}';
          
          if (stack.length === 0) {
            emit(objStr);
          } else {
            stack[stack.length - 1].buffer[currentKey] = objStr;
          }
        }
        indent--;
      } else {
        indent--;
        emit(`${newline}${indentStr.repeat(indent)}}`);
        isFirstItem = false;
      }
    });

    parser.on('openarray', () => {
      if (currentKey !== null) {
        emit(`${indentStr.repeat(indent)}${JSON.stringify(currentKey)}: [${newline}`);
        currentKey = null;
      } else if (!isFirstItem) {
        emit(`,${newline}${indentStr.repeat(indent)}[${newline}`);
      } else {
        emit(`[${newline}`);
      }
      indent++;
      isFirstItem = true;
    });

    parser.on('closearray', () => {
      indent--;
      emit(`${newline}${indentStr.repeat(indent)}]`);
      isFirstItem = false;
    });

    parser.on('key', (key) => {
      currentKey = key;
    });

    parser.on('value', (value) => {
      if (currentKey !== null) {
        if (!isFirstItem) emit(`,${newline}`);
        emit(`${indentStr.repeat(indent)}${JSON.stringify(currentKey)}: ${JSON.stringify(value)}`);
        currentKey = null;
      } else {
        if (!isFirstItem) emit(`,${newline}`);
        emit(`${indentStr.repeat(indent)}${JSON.stringify(value)}`);
      }
      isFirstItem = false;
    });

    parser.on('end', () => {
      if (result.length > 0) {
        self.postMessage({ type: 'chunk', data: result });
      }
      self.postMessage({ type: 'done' });
    });

    parser.on('error', (err) => {
      self.postMessage({ type: 'error', message: err.message });
    });

    // Read and parse stream
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      bytesRead += value.length;
      parser.write(value);
      
      // Update progress every 5MB
      if (bytesRead % (5 * 1024 * 1024) < 1024) {
        const percent = Math.round((bytesRead / file.size) * 100);
        self.postMessage({ type: 'progress', percent });
      }
    }
    
    parser.end();
    
  } catch (err) {
    self.postMessage({ 
      type: 'error', 
      message: err.message 
    });
  }
};

