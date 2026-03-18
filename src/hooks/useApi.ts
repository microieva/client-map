import { useState, useCallback } from "react";
import { apiClient } from "../config/api";
import { ArticleData, TopicData } from "../types/api";

interface ApiState {
  topics: TopicData[];
  articles: ArticleData[];
  loadingA: boolean;
  loadingT: boolean;
  error: any;
}

export const useApi = () => {
  const [state, setState] = useState<ApiState>({
    topics: [],
    articles: [],
    loadingA: false,
    loadingT: false,
    error: null,
  });

  const getTopics = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loadingT: true, error: null }));
      const response = await apiClient.get(`/topics`);
      
      if (response.status === 200) {
        // Handle different response structures
        const topicsData = response.data?.data?.topics || response.data?.topics || [];
        setState(prev => ({ 
          ...prev, 
          loadingT: false, 
          topics: topicsData 
        }));
      }
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        loadingT: false, 
        error: err.response?.data?.detail || err.message || 'Failed to fetch topics'
      }));
    }
  }, []);

  const getArticles = useCallback(async (ids: string[]) => {
    if (!ids || ids.length === 0) {
      setState(prev => ({ ...prev, articles: [] }));
      return;
    }

    try {
      setState(prev => ({ ...prev, loadingA: true, error: null }));
      
      const response = await apiClient.post('/articles/articles', ids);
      
      if (response.status === 200) {
        // Handle different response structures
        let articlesData: ArticleData[] = [];
        
        if (response.data?.data?.articles) {
          articlesData = response.data.data.articles;
        } else if (Array.isArray(response.data?.data)) {
          articlesData = response.data.data;
        } else if (Array.isArray(response.data)) {
          articlesData = response.data;
        } else if (response.data?.articles) {
          articlesData = response.data.articles;
        }
        
        setState(prev => ({ 
          ...prev, 
          loadingA: false, 
          articles: articlesData 
        }));
      }
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        loadingA: false, 
        error: error.response?.data?.detail || error.message || 'Failed to fetch articles'
      }));
    }
  }, []);

  const clearArticles = useCallback(() => {
    setState(prev => ({ ...prev, articles: [] }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    state,
    getTopics,
    getArticles,
    clearArticles,
    clearError
  };
};