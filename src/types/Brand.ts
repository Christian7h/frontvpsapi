export interface Brand {
  id: string;
  name: string;
  description: string;
  foundation: number;
  history: string;
  trajectory: string;
  translations: {
    es: {
      name: string;
      description: string;
      foundation: string;
      history: string;
      trajectory: string;
    };
    en: {
      name: string;
      description: string;
      foundation: string;
      history: string;
      trajectory: string;
    };
  };
}

export interface ApiResponse {
  success: boolean;
  count: number;
  responseTime: string;
  cached: boolean;
  data: Brand[];
}

export type Language = 'en' | 'es';