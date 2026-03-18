import React, { createContext, useContext, useCallback, ReactNode } from 'react';
import { useApi as useApiHook } from '../hooks/useApi';
import { ArticleData, TopicData } from '../types/api';


interface ApiContextType {
  topics: TopicData[];
  articles: ArticleData[];
  loadingA: boolean;
  loadingT: boolean;
  error: any;
  getTopics: () => Promise<void>;
  getArticles: (ids: string[]) => Promise<void>;
  // clearArticles: () => void;
  // clearError: () => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const {
    state,
    getTopics: hookGetTopics,
    getArticles: hookGetArticles,
    // clearArticles,
    // clearError
  } = useApiHook();

  const getTopics = useCallback(async () => {
    await hookGetTopics();
  }, [hookGetTopics]);

  const getArticles = useCallback(async (ids: string[]) => {
    await hookGetArticles(ids);
  }, [hookGetArticles]);

  const value = {
    topics: state.topics,
    articles: state.articles,
    loadingA: state.loadingA,
    loadingT: state.loadingT,
    error: state.error,
    getTopics,
    getArticles
    // clearArticles,
    // clearError
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
}

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  
  return context;
};