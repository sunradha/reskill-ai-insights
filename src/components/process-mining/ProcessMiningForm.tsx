
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { QueryType, Filters } from '@/types/process-mining-types';
import { useProcessMining } from '@/hooks/useProcessMining';
import { ProcessMiningFilters } from './ProcessMiningFilters';
import { ProcessMiningResults } from './ProcessMiningResults';
import { Skeleton } from "@/components/ui/skeleton";

export function ProcessMiningForm() {
  const [queryType, setQueryType] = useState<QueryType>('process_mining');
  const [filters, setFilters] = useState<Filters>({});
  const [question, setQuestion] = useState('');
  
  const {
    loading,
    results,
    reasoningResults,
    graphImage,
    fetchProcessMiningData,
    sendReasoningQuery
  } = useProcessMining();

  const handleQueryTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQueryType(e.target.value as QueryType);
    // Reset results when changing query type
    setFilters({});
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnalyzeClick = () => {
    fetchProcessMiningData(queryType, filters);
  };

  const handleReasoningQuery = () => {
    if (!results) return;
    sendReasoningQuery(results, question);
  };

  const getReasoningPrompts = () => {
    // Suggest relevant questions based on the query type
    const prompts: Record<QueryType, string[]> = {
      process_mining: [
        "What are the most common training paths?",
        "Where are the bottlenecks in the training process?",
        "What are the key differences between successful and unsuccessful training journeys?"
      ],
      knowledge_graph: [
        "What job roles have the highest automation risk?",
        "Which training programs are most effective for high-risk roles?",
        "What skills show the strongest relationship with certification success?"
      ],
      causal_graph: [
        "What factors predict training success?",
        "Does automation risk correlate with training difficulties?",
        "Which training interventions are most effective for which employee groups?"
      ]
    };
    
    return prompts[queryType] || [];
  };

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Process Mining & Analysis</CardTitle>
          <CardDescription>
            Analyze workforce reskilling data through process mining and AI reasoning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="query-type" className="font-medium text-sm">
                Analysis Type:
              </label>
              <select 
                id="query-type" 
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                onChange={handleQueryTypeChange}
                value={queryType}
              >
                <option value="process_mining">Process Mining</option>
                <option value="knowledge_graph">Knowledge Graph</option>
                <option value="causal_graph">Causal Graph</option>
              </select>
            </div>
            
            <ProcessMiningFilters 
              queryType={queryType} 
              onChange={handleFilterChange} 
            />
            
            <Button 
              onClick={handleAnalyzeClick} 
              disabled={loading}
              className="w-full md:w-auto"
            >
              {loading ? 'Loading...' : 'Analyze Data'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <Card className="mt-6">
          <CardContent className="flex justify-center items-center py-6">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
              <p className="text-sm text-muted-foreground">Processing data...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {results && (
        <ProcessMiningResults 
          results={results} 
          queryType={queryType}
          graphImage={graphImage}
        />
      )}

      {results && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Ask AI for Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="question" className="font-medium text-sm">
                Enter your question about the data:
              </label>
              <Textarea 
                id="question" 
                rows={3} 
                placeholder="What insights can you provide about this data?"
                value={question}
                onChange={handleQuestionChange}
              />
            </div>
            
            {getReasoningPrompts().length > 0 && (
              <div className="bg-muted/50 p-4 rounded-md">
                <p className="font-medium mb-2">Suggested questions:</p>
                <ul className="space-y-1">
                  {getReasoningPrompts().map((prompt, index) => (
                    <li key={index}>
                      <button 
                        onClick={() => setQuestion(prompt)}
                        className="text-primary hover:underline text-left"
                      >
                        {prompt}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Button 
              onClick={handleReasoningQuery} 
              disabled={loading || !question.trim()}
            >
              {loading ? 'Analyzing...' : 'Get AI Analysis'}
            </Button>
          </CardContent>
        </Card>
      )}

      {reasoningResults && (
        <Card className="mt-6 border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle>AI Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 p-4 rounded-md">
              {reasoningResults.analysis.split('\n').map((line, index) => (
                <p key={index} className={index > 0 ? "mt-2" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
