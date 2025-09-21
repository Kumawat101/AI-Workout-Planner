
import React from 'react';
import type { WorkoutPlan } from '../types';
import { WorkoutDayCard } from './WorkoutDayCard';
import { RefreshCwIcon } from './icons';

interface WorkoutPlanDisplayProps {
  plan: WorkoutPlan;
  onReset: () => void;
}

export const WorkoutPlanDisplay: React.FC<WorkoutPlanDisplayProps> = ({ plan, onReset }) => {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white">Your Custom Workout Plan</h2>
        <p className="mt-2 text-slate-400">Here is your personalized fitness routine. Stay consistent!</p>
      </div>
      
      <div className="space-y-6">
        {plan.map(dayData => (
          <WorkoutDayCard key={dayData.day} dayData={dayData} />
        ))}
      </div>
      
      <div className="text-center mt-10">
        <button 
          onClick={onReset} 
          className="inline-flex items-center gap-2 bg-slate-700 text-slate-200 font-semibold py-2 px-6 rounded-lg hover:bg-slate-600 transition-colors duration-300"
        >
          <RefreshCwIcon className="w-4 h-4" />
          Create a New Plan
        </button>
      </div>
    </div>
  );
};
