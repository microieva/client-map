import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface AppContextType {
  selectedTopic: string | null;
  setSelectedTopic: (topic: string | null) => void;
  clearSelectedTopic: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSetSelectedTopic = useCallback((topic: string | null) => {
    setSelectedTopic(topic);
  }, []);

  const clearSelectedTopic = useCallback(() => {
    setSelectedTopic(null);
  }, []);

  const value = {
    selectedTopic,
    setSelectedTopic: handleSetSelectedTopic,
    clearSelectedTopic
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
};