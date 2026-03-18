export interface ApiResponse<T = any> {
  data: T | null;
  message: string;
  status?: string; 
}

export interface CountryMentions {
  mentions: number;
  articleIds: string[] | null;  
}

export type CountriesResult = Record<string, CountryMentions>;

export interface CountriesData {
  countries: CountriesResult; 
  total: CountryMentions;  
}

export interface ArticleData {
  id: string;
  title: string;
  url: string;
  content: string;
  source: string;
  author: string;
  published_at: string;
  image_url: string;
  is_processed: boolean;
  topic_id: number;
  created_at: string;
  updated_at: string;
  summary: SummaryData;
  topic: TopicData;
  processing_error?: string;
  source_metadata?:any;
}

export interface TopicData {
  id:number;
  name: string;
  description: string;
}
                
            
 export interface SummaryData {
    id: number;
    article_id: number;
    content: string;
    provider: string;
    model_name: string;
    quality_level: string;
    word_count: number;
    char_count: number;
    processing_time_ms: number;
    is_successful: boolean,
    status: string;
    created_at: string;
}