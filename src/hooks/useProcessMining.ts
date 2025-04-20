
import { useState } from 'react';
import { ProcessMiningResults, QueryType, Filters, ReasoningResults } from '@/types/process-mining-types';

export function useProcessMining() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ProcessMiningResults | null>(null);
  const [reasoningResults, setReasoningResults] = useState<ReasoningResults | null>(null);
  const [graphImage, setGraphImage] = useState<string | null>(null);
  
  // In a real app, you'd use an environment variable
  const API_BASE_URL = 'https://your-backend-app.onrender.com';

  const fetchProcessMiningData = async (queryType: QueryType, filters: Filters) => {
    setLoading(true);
    
    try {
      // For demo purposes, simulate a successful API call with mock data
      // In a real app, you would uncomment the fetch call
      
      /*
      const response = await fetch(`${API_BASE_URL}/api/process-mining`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query_type: queryType,
          filters: filters
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      */
      
      // Mock data based on the query type
      const mockData = generateMockData(queryType);
      
      setResults(mockData.data);
      setGraphImage(mockData.graph_image);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const sendReasoningQuery = async (data: ProcessMiningResults, question: string) => {
    setLoading(true);
    
    try {
      // For demo purposes, simulate a successful API call with mock data
      // In a real app, you would uncomment the fetch call
      
      /*
      const response = await fetch(`${API_BASE_URL}/api/reasoning`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: data,
          question: question
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get AI analysis: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      */
      
      // Mock reasoning results
      const mockResult = generateMockReasoningResults(question);
      
      setReasoningResults(mockResult);
      
    } catch (error) {
      console.error('Error getting AI analysis:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get AI analysis",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    results,
    reasoningResults,
    graphImage,
    fetchProcessMiningData,
    sendReasoningQuery
  };
}

// Mock data generators
function generateMockData(queryType: QueryType) {
  if (queryType === 'process_mining') {
    return {
      data: {
        process_data: {
          case_count: 2456,
          event_count: 18973
        }
      },
      // Base64 encoded placeholder for a graph image
      graph_image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
    };
  } else if (queryType === 'knowledge_graph') {
    return {
      data: {
        knowledge_graph: {
          entities: Array(25).fill(0).map((_, i) => ({ id: i, name: `Entity ${i}` })),
          relationships: Array(40).fill(0).map((_, i) => ({ source: i % 25, target: (i + 5) % 25, type: 'RELATED_TO' }))
        }
      },
      graph_image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
    };
  } else {
    return {
      data: {
        causal_data: {
          factors: {
            'skill_gap': 0.75,
            'prior_experience': 0.65,
            'learning_style': 0.5,
            'training_format': 0.45,
            'management_support': 0.8
          },
          record_count: 1234
        }
      },
      graph_image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
    };
  }
}

function generateMockReasoningResults(question: string) {
  return {
    analysis: `Based on the data analysis, here are some insights related to your question: "${question}"\n\n1. The training data shows clear patterns of skill progression across different job roles.\n\n2. Participants who completed prerequisite courses were 68% more likely to successfully complete advanced training.\n\n3. The most common bottleneck appears at the transition from theoretical knowledge to practical application.\n\n4. Recommendation: Consider implementing more hands-on workshops and mentoring during key transition points in the training process.`
  };
}

// Import toast from our UI component library
import { toast } from "@/components/ui/use-toast";
