
import React from 'react';
import { QueryType } from '@/types/process-mining-types';

interface ProcessMiningFiltersProps {
  queryType: QueryType;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function ProcessMiningFilters({ queryType, onChange }: ProcessMiningFiltersProps) {
  if (queryType === 'process_mining') {
    return (
      <>
        <div className="grid gap-2">
          <label htmlFor="date-range" className="font-medium text-sm">
            Date Range (Optional):
          </label>
          <select 
            id="date-range" 
            name="date_range" 
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            onChange={onChange}
          >
            <option value="">All Time</option>
            <option value="last_30">Last 30 Days</option>
            <option value="last_90">Last 90 Days</option>
            <option value="last_365">Last Year</option>
          </select>
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="training-program" className="font-medium text-sm">
            Training Program (Optional):
          </label>
          <select 
            id="training-program" 
            name="training_program" 
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            onChange={onChange}
          >
            <option value="">All Programs</option>
            <option value="data_science">Data Science</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="cloud_computing">Cloud Computing</option>
            <option value="project_management">Project Management</option>
          </select>
        </div>
      </>
    );
  }
  
  if (queryType === 'knowledge_graph') {
    return (
      <div className="grid gap-2">
        <label htmlFor="risk-level" className="font-medium text-sm">
          Automation Risk Level (Optional):
        </label>
        <select 
          id="risk-level" 
          name="risk_level" 
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          onChange={onChange}
        >
          <option value="">All Levels</option>
          <option value="high">High Risk (>0.66)</option>
          <option value="medium">Medium Risk (0.33-0.66)</option>
          <option value="low">Low Risk (<0.33)</option>
        </select>
      </div>
    );
  }
  
  if (queryType === 'causal_graph') {
    return (
      <div className="grid gap-2">
        <label htmlFor="outcome" className="font-medium text-sm">
          Training Outcome (Optional):
        </label>
        <select 
          id="outcome" 
          name="outcome" 
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          onChange={onChange}
        >
          <option value="">All Outcomes</option>
          <option value="success">Successful Completion</option>
          <option value="failure">Unsuccessful Completion</option>
        </select>
      </div>
    );
  }
  
  return null;
}
