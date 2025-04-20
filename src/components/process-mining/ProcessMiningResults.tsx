
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProcessMiningResults as ResultsType, QueryType } from '@/types/process-mining-types';

interface ProcessMiningResultsProps {
  results: ResultsType;
  queryType: QueryType;
  graphImage: string | null;
}

export function ProcessMiningResults({ results, queryType, graphImage }: ProcessMiningResultsProps) {
  const renderDataSummary = () => {
    if (queryType === 'process_mining' && results.process_data) {
      const { case_count, event_count } = results.process_data;
      
      return (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Data Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="bg-muted rounded-md p-4 text-center min-w-[120px]">
                <div className="text-2xl font-bold text-primary">{case_count}</div>
                <div className="text-sm text-muted-foreground">Training Cases</div>
              </div>
              <div className="bg-muted rounded-md p-4 text-center min-w-[120px]">
                <div className="text-2xl font-bold text-primary">{event_count}</div>
                <div className="text-sm text-muted-foreground">Training Events</div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    if (queryType === 'knowledge_graph' && results.knowledge_graph) {
      const { entities, relationships } = results.knowledge_graph;
      
      return (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Knowledge Graph Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="bg-muted rounded-md p-4 text-center min-w-[120px]">
                <div className="text-2xl font-bold text-primary">{entities.length}</div>
                <div className="text-sm text-muted-foreground">Entities</div>
              </div>
              <div className="bg-muted rounded-md p-4 text-center min-w-[120px]">
                <div className="text-2xl font-bold text-primary">{relationships.length}</div>
                <div className="text-sm text-muted-foreground">Relationships</div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    if (queryType === 'causal_graph' && results.causal_data) {
      const { factors, record_count } = results.causal_data;
      
      return (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Causal Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="bg-muted rounded-md p-4 text-center min-w-[120px]">
                <div className="text-2xl font-bold text-primary">{record_count}</div>
                <div className="text-sm text-muted-foreground">Data Points</div>
              </div>
              <div className="bg-muted rounded-md p-4 text-center min-w-[120px]">
                <div className="text-2xl font-bold text-primary">{Object.keys(factors).length}</div>
                <div className="text-sm text-muted-foreground">Causal Factors</div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    // Generic fallback for any data type
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Data Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
            {JSON.stringify(results, null, 2)}
          </pre>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      {renderDataSummary()}
      
      {graphImage && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Process Flow Visualization</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <img 
              className="max-w-full object-contain max-h-[500px]" 
              src={`data:image/png;base64,${graphImage}`} 
              alt="Process flow graph" 
            />
          </CardContent>
        </Card>
      )}
    </>
  );
}
