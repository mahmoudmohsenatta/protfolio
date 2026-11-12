export interface DataClientConfig {
  supabaseUrl?: string;
  supabaseKey?: string;
}

export interface TableResult<T> {
  data: T[];
  source: 'supabase' | 'mock';
}

export declare function createDataClient(config?: DataClientConfig): {
  isLiveSupabase: boolean;
  selectTable<T>(table: string, fallbackRows: T[]): Promise<TableResult<T>>;
};

