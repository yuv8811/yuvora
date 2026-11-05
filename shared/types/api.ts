export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    total?: number;
    timestamp: string;
  };
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

