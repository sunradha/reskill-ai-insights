
import { ProcessMiningForm } from "@/components/process-mining/ProcessMiningForm";

export default function ProcessMining() {
  return (
    <div className="container mx-auto p-4">
      <div className="pb-8">
        <h1 className="text-3xl font-bold">Process Mining & AI Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Analyze workforce reskilling data through process mining, knowledge graphs, and causal analysis
        </p>
      </div>
      
      <ProcessMiningForm />
    </div>
  );
}
