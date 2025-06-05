export interface Analysis {
  projects: Project[];
  total_count: number;
  total_rpoints: number;
}
export interface Project {
  valid: boolean;
  action: 'DELETE' | 'UPDATE' | 'NO ACTION';
  rpoints: number;
  category: string[];
  found_in: 'none';
  marketcap: 'small' | 'medium' | 'large';
  timestamps: string[];
  total_count: number;
  possible_match: 'none' | 'screenshot' | 'transcript';
  coin_or_project: string;
}

export interface Headers {
  'Content-Type': 'application/json';
  Accept?: string;
  Authorization?: string;
}

export interface DefaultParams {
  temperature?: number;
  top_p?: number;
  search_domain_filter?: any;
  return_images?: boolean;
  return_related_questions?: boolean;
  search_recency_filter?: string;
  top_k?: number;
  stream?: boolean;
  presence_penalty?: number;
  frequency_penalty?: number;
  response_format?: any;
}

export interface LLMProvider {
  name: string;
  endpoint: string;
  model: string;
  headers: Headers;
  defaultParams?: DefaultParams;
  promptCost?: {
    promptTokenCost: number;
    completionCost: number;
  };
}
export interface LLMProvidersMap {
  [key: string]: LLMProvider;
}

export interface TranscriptResponse {
  content: string | null;
}
export interface FallbackTranscriptResponse {
  transcript: string | null;
}
