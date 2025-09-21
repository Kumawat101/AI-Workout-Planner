
import React from 'react';
import type { WorkoutDay } from '../types';

interface WorkoutDayCardProps {
  dayData: WorkoutDay;
}

export const WorkoutDayCard: React.FC<WorkoutDayCardProps> = ({ dayData }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden shadow-lg">
      <div className="p-5 bg-slate-800 border-b border-slate-700">
        <h3 className="text-xl font-bold text-sky-400">Day {dayData.day}: <span className="text-slate-100">{dayData.focus}</span></h3>
      </div>
      <div className="p-1 sm:p-2">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800/60">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Exercise</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Sets</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Reps</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800/30 divide-y divide-slate-700">
              {dayData.exercises.map((exercise, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap font-medium text-slate-100">{exercise.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-300">{exercise.sets}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-300">{exercise.reps}</td>
                  <td className="px-4 py-4 whitespace-normal text-sm text-slate-400 hidden sm:table-cell">{exercise.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
