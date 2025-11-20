import localforage from 'localforage';

export interface SavedOutput {
  id: string;
  name: string;
  size: number;
  content: string;
  date: number;
  format?: string;
  extension?: string;
  mimeType?: string;
}

// Configure localforage for JSON outputs
const jsonStore = localforage.createInstance({
  name: 'json-formatter',
  storeName: 'recent_outputs',
  description: 'Recent JSON formatter outputs',
});

const MAX_OUTPUTS = 10;

/**
 * Save a new output to IndexedDB
 * Automatically maintains max 10 outputs
 */
interface SaveOptions {
  format?: string;
  extension?: string;
  mimeType?: string;
}

export async function saveOutput(
  content: string,
  name?: string,
  options: SaveOptions = {}
): Promise<SavedOutput> {
  const id = `output-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const {
    format = 'json',
    extension = 'json',
    mimeType = 'application/json',
  } = options;
  
  const output: SavedOutput = {
    id,
    name: name || `Output ${new Date().toLocaleString()}`,
    size: content.length,
    content,
    date: Date.now(),
    format,
    extension,
    mimeType,
  };

  // Get all existing outputs
  const outputs = await getAllOutputs();
  
  // Add new output
  outputs.push(output);
  
  // Sort by date (newest first)
  outputs.sort((a, b) => b.date - a.date);
  
  // Delete old outputs
  if (outputs.length > MAX_OUTPUTS) {
    const outputsToDelete = outputs.slice(MAX_OUTPUTS);
    for (const oldOutput of outputsToDelete) {
      await jsonStore.removeItem(oldOutput.id);
    }
  }
  
  // Save new output
  await jsonStore.setItem(id, output);
  
  return output;
}

/**
 * Get all saved outputs
 */
export async function getAllOutputs(format: string = 'json'): Promise<SavedOutput[]> {
  const outputs: SavedOutput[] = [];
  
  await jsonStore.iterate((value) => {
    outputs.push(value as SavedOutput);
  });
  
  // Sort by date (newest first)
  const filtered = outputs.filter((output) => (output.format || 'json') === format);
  filtered.sort((a, b) => b.date - a.date);
  
  return filtered;
}

/**
 * Get a specific output by ID
 */
export async function getOutput(id: string): Promise<SavedOutput | null> {
  return await jsonStore.getItem<SavedOutput>(id);
}

/**
 * Update the name of a specific output
 */
export async function renameOutput(id: string, newName: string): Promise<void> {
  const output = await jsonStore.getItem<SavedOutput>(id);
  if (output) {
    output.name = newName;
    await jsonStore.setItem(id, output);
  }
}

/**
 * Delete a specific output
 */
export async function deleteOutput(id: string): Promise<void> {
  await jsonStore.removeItem(id);
}

/**
 * Clear all saved outputs
 */
export async function clearAllOutputs(): Promise<void> {
  await jsonStore.clear();
}

/**
 * Format file size for display
 */
export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

