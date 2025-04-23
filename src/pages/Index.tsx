
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Reskill AI Insights</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Leverage process mining and AI analysis to transform workforce reskilling data into actionable insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Process Mining</h2>
            <p className="text-gray-600 mb-6">
              Analyze training pathways, identify bottlenecks, and optimize workforce development processes 
              through advanced process mining techniques.
            </p>
            <Link to="/process-mining">
              <Button className="w-full">
                Explore Process Mining
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Knowledge & Causal Graphs</h2>
            <p className="text-gray-600 mb-6">
              Discover relationships between skills, roles, and training outcomes using 
              knowledge graphs and causal analysis.
            </p>
            <Link to="/process-mining">
              <Button variant="outline" className="w-full">
                Explore Graph Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
          <p className="text-gray-700">
            Select one of the analysis tools above to begin exploring your workforce data. 
            You can analyze training processes, visualize knowledge relationships, or identify 
            causal factors affecting training outcomes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
