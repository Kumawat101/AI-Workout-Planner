
import React from 'react';
import type { FormData, Equipment } from '../types';
import {
  WORKOUT_GOALS,
  FITNESS_LEVELS,
  DAYS_PER_WEEK_OPTIONS,
  WORKOUT_DURATION_OPTIONS,
  EQUIPMENT_OPTIONS
} from '../constants';
import { SparklesIcon } from './icons';

interface WorkoutFormProps {
  formData: FormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onFormSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({ formData, onFormChange, onFormSubmit, isLoading }) => {
  return (
    <div className="bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-lg">
      <form onSubmit={onFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Goal */}
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-slate-300 mb-2">Primary Goal</label>
            <select id="goal" name="goal" value={formData.goal} onChange={onFormChange} className="w-full bg-slate-700 border-slate-600 rounded-lg py-2 px-3 text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition">
              {WORKOUT_GOALS.map(goal => <option key={goal} value={goal}>{goal}</option>)}
            </select>
          </div>

          {/* Fitness Level */}
          <div>
            <label htmlFor="fitnessLevel" className="block text-sm font-medium text-slate-300 mb-2">Fitness Level</label>
            <select id="fitnessLevel" name="fitnessLevel" value={formData.fitnessLevel} onChange={onFormChange} className="w-full bg-slate-700 border-slate-600 rounded-lg py-2 px-3 text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition">
              {FITNESS_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
            </select>
          </div>

          {/* Days Per Week */}
          <div>
            <label htmlFor="daysPerWeek" className="block text-sm font-medium text-slate-300 mb-2">Workouts per Week</label>
            <select id="daysPerWeek" name="daysPerWeek" value={formData.daysPerWeek} onChange={onFormChange} className="w-full bg-slate-700 border-slate-600 rounded-lg py-2 px-3 text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition">
              {DAYS_PER_WEEK_OPTIONS.map(days => <option key={days} value={days}>{days} days</option>)}
            </select>
          </div>

          {/* Workout Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-slate-300 mb-2">Workout Duration</label>
            <select id="duration" name="duration" value={formData.duration} onChange={onFormChange} className="w-full bg-slate-700 border-slate-600 rounded-lg py-2 px-3 text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition">
              {WORKOUT_DURATION_OPTIONS.map(duration => <option key={duration} value={duration}>{duration} minutes</option>)}
            </select>
          </div>
        </div>

        {/* Equipment */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Available Equipment</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {EQUIPMENT_OPTIONS.map((equipment: Equipment) => (
              <label key={equipment} className="flex items-center space-x-2 bg-slate-700/50 p-3 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-700 transition has-[:checked]:bg-sky-500/20 has-[:checked]:border-sky-500">
                <input
                  type="checkbox"
                  name="equipment"
                  value={equipment}
                  checked={formData.equipment.includes(equipment)}
                  onChange={onFormChange}
                  className="h-4 w-4 rounded border-slate-500 bg-slate-800 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-sm font-medium text-slate-200">{equipment}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Additional Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-slate-300 mb-2">Additional Notes (Optional)</label>
          <textarea id="notes" name="notes" value={formData.notes} onChange={onFormChange} rows={3} className="w-full bg-slate-700 border-slate-600 rounded-lg py-2 px-3 text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition" placeholder="e.g., focus on biceps, avoid squats due to knee pain..."></textarea>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button type="submit" disabled={isLoading || formData.equipment.length === 0} className="w-full flex justify-center items-center gap-2 bg-sky-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-sky-900/50 transform hover:scale-105">
            <SparklesIcon className="w-5 h-5" />
            {isLoading ? 'Generating Your Plan...' : 'Generate Plan'}
          </button>
        </div>
      </form>
    </div>
  );
};
