import { create } from 'zustand';

const useNotificationStore = create((set, get) => ({
  notifications: [],
  
  addNotification: (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      ...notification,
      timestamp: new Date()
    };
    
    set(state => ({
      notifications: [...state.notifications, newNotification]
    }));
    
    return id;
  },
  
  removeNotification: (id) => {
    set(state => ({
      notifications: state.notifications.filter(notif => notif.id !== id)
    }));
  },
  
  clearAllNotifications: () => {
    set({ notifications: [] });
  },
  
  // Helper method to add command notifications with predefined messages
  addCommandNotification: (commandType, commandInstance) => {
    const messages = {
      'reindent': 'Código reindentado correctamente',
      'configuration': 'Configuración aplicada',
      'reset': 'Configuración restablecida',
      'default': 'Comando ejecutado'
    };
    
    const message = messages[commandType] || messages['default'];
    const canUndo = commandInstance && typeof commandInstance.undo === 'function';
    
    return get().addNotification({
      message,
      commandType,
      canUndo,
      command: commandInstance,
      duration: 5000
    });
  }
}));

export { useNotificationStore };
