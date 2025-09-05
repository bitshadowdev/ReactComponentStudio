/**
 * Command Pattern implementation for configuration changes
 * Allows undo/redo functionality
 */

class ConfigurationCommand {
  constructor(store, oldConfig, newConfig, description) {
    this.store = store;
    this.oldConfig = oldConfig;
    this.newConfig = newConfig;
    this.description = description;
    this.timestamp = new Date();
  }

  execute() {
    this.store.setEditorConfiguration(this.newConfig);
  }

  undo() {
    this.store.setEditorConfiguration(this.oldConfig);
  }

  getDescription() {
    return this.description;
  }

  getTimestamp() {
    return this.timestamp;
  }
}

export class CommandManager {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
    this.notificationCallback = null;
  }

  setNotificationCallback(callback) {
    this.notificationCallback = callback;
  }

  executeCommand(command) {
    if (!command || typeof command.execute !== 'function') {
      console.error('Invalid command provided to CommandManager');
      return false;
    }

    const result = command.execute();
    
    if (result) {
      // Remove any commands after current index (for redo functionality)
      this.history = this.history.slice(0, this.currentIndex + 1);
      
      // Add new command
      this.history.push(command);
      this.currentIndex++;
      
      // Limit history size (optional)
      if (this.history.length > 50) {
        this.history.shift();
        this.currentIndex--;
      }
      
      // Trigger notification if callback is set
      if (this.notificationCallback) {
        const commandType = this.getCommandType(command);
        this.notificationCallback(commandType, command);
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.debug(`[CommandManager] Executed: ${command.getDescription()}`);
      }
    }
    
    return result;
  }

  getCommandType(command) {
    // Determine command type based on constructor name or properties
    if (command.constructor.name === 'ReindentCommand') return 'reindent';
    if (command.constructor.name === 'ConfigurationCommand') return 'configuration';
    return 'default';
  }

  undo() {
    if (this.canUndo()) {
      const command = this.history[this.currentIndex];
      command.undo();
      this.currentIndex--;
      return command;
    }
    return null;
  }

  redo() {
    if (this.canRedo()) {
      this.currentIndex++;
      const command = this.history[this.currentIndex];
      command.execute();
      return command;
    }
    return null;
  }

  canUndo() {
    return this.currentIndex >= 0;
  }

  canRedo() {
    return this.currentIndex < this.history.length - 1;
  }

  getLastCommand() {
    return this.history[this.currentIndex] || null;
  }

  clear() {
    this.history = [];
    this.currentIndex = -1;
  }
}

import { useEditorStore } from '@/stores/editorStore';
import { useConfigurationStore } from '@/stores/configurationStore';

class ReindentCommand {
  constructor(tabSize, useTabs) {
    const configStore = useConfigurationStore.getState();
    this.tabSize = tabSize;
    this.useTabs = useTabs;
    this.oldContent = '';
    this.oldConfig = {
      tabSize: configStore.configuration.editor.tabSize,
      indentWithTabs: configStore.configuration.editor.indentWithTabs
    };
    this.newConfig = {
      tabSize,
      indentWithTabs: useTabs
    };
    this.description = 'Reindent code';
    this.timestamp = new Date();
  }

  reindent() {
    const { code, setCode } = useEditorStore.getState();
    const configStore = useConfigurationStore.getState();
    this.oldContent = code;

    if (!this.oldContent.trim()) return false;

    // Apply new configuration first
    configStore.setEditorConfiguration(this.newConfig);

    const lines = this.oldContent.split('\n');
    const newLines = [];
    const indentStr = this.useTabs ? '\t' : ' '.repeat(this.tabSize);
    let indentLevel = 0;
    let inCommentBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // Handle multi-line comments
      if (trimmedLine.includes('/*')) {
        inCommentBlock = true;
      }
      if (inCommentBlock) {
        newLines.push(line);
        if (trimmedLine.includes('*/')) {
          inCommentBlock = false;
        }
        continue;
      }

      // Handle single-line comments
      if (trimmedLine.startsWith('//') || trimmedLine.startsWith('*')) {
        newLines.push(line);
        continue;
      }

      // Skip empty lines
      if (!trimmedLine) {
        newLines.push('');
        continue;
      }

      let currentIndent = indentLevel;

      // Decrease indent for closing elements BEFORE applying current indent
      if (trimmedLine.startsWith('</') || 
          trimmedLine.startsWith('}') || 
          trimmedLine.startsWith(');') || 
          trimmedLine.startsWith('>;')) {
        currentIndent = Math.max(0, indentLevel - 1);
      }

      // Apply indentation
      newLines.push(indentStr.repeat(currentIndent) + trimmedLine);

      // Update indent level for next line AFTER processing current line
      
      // Handle JSX opening tags (not self-closing)
      const jsxOpenTagMatch = trimmedLine.match(/<([a-zA-Z][a-zA-Z0-9]*(?:\.[a-zA-Z0-9]+)*)/);
      if (jsxOpenTagMatch) {
        const tagName = jsxOpenTagMatch[1];
        // Check if it's not self-closing and doesn't close on same line
        if (!trimmedLine.includes('/>') && !trimmedLine.includes(`</${tagName}>`)) {
          indentLevel++;
        }
      }

      // Handle JSX closing tags
      if (trimmedLine.startsWith('</')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      // Handle JavaScript/JSX expression blocks
      const openBraces = (trimmedLine.match(/\{/g) || []).length;
      const closeBraces = (trimmedLine.match(/\}/g) || []).length;
      
      // Handle function declarations, objects, arrays, etc.
      if (trimmedLine.includes('{') && !trimmedLine.includes('}')) {
        indentLevel += openBraces;
      } else if (trimmedLine.includes('}') && !trimmedLine.includes('{')) {
        indentLevel = Math.max(0, indentLevel - closeBraces);
      } else if (openBraces !== closeBraces) {
        indentLevel += (openBraces - closeBraces);
      }

      // Handle parentheses for function calls, conditionals, etc.
      if (trimmedLine.endsWith('(') || 
          (trimmedLine.includes('(') && !trimmedLine.includes(')') && 
           !trimmedLine.includes('=>'))) {
        // Only increase if it's a multi-line expression
        const nextLine = lines[i + 1];
        if (nextLine && !nextLine.trim().startsWith(')')) {
          indentLevel++;
        }
      }

      // Handle array literals
      if (trimmedLine.endsWith('[') && !trimmedLine.includes(']')) {
        indentLevel++;
      }
      if (trimmedLine.startsWith(']')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
    }

    this.newContent = newLines.join('\n');

    if (this.newContent !== this.oldContent) {
      setCode(this.newContent);
      return true;
    }

    return false;
  }

  execute() {
    return this.reindent();
  }

  undo() {
    const configStore = useConfigurationStore.getState();
    useEditorStore.getState().setCode(this.oldContent);
    configStore.setEditorConfiguration(this.oldConfig);
    return true;
  }

  getDescription() {
    return this.description;
  }

  getTimestamp() {
    return this.timestamp;
  }
}

// Singleton instance
export const commandManager = new CommandManager();
export { ConfigurationCommand, ReindentCommand };
