
export type QueryType = 'process_mining' | 'knowledge_graph' | 'causal_graph';

export interface ProcessData {
  case_count: number;
  event_count: number;
}

export interface KnowledgeGraph {
  entities: any[];
  relationships: any[];
}

export interface CausalData {
  factors: Record<string, any>;
  record_count: number;
}

export interface ProcessMiningResults {
  process_data?: ProcessData;
  knowledge_graph?: KnowledgeGraph;
  causal_data?: CausalData;
}

export interface ReasoningResults {
  analysis: string;
}

export interface Filters {
  date_range?: string;
  training_program?: string;
  risk_level?: string;
  outcome?: string;
}
