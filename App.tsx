
import React, { useState, useCallback } from 'react';
import { WorkoutForm } from './components/WorkoutForm';
import { WorkoutPlanDisplay } from './components/WorkoutPlanDisplay';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
// Fix: Import Equipment type to use for type casting.
import type { FormData, WorkoutPlan, Equipment } from './types';
import { generateWorkoutPlan } from './services/geminiService';
import { DumbbellIcon } from './components/icons';

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    goal: 'Build Muscle',
    fitnessLevel: 'Beginner',
    daysPerWeek: '3',
    duration: '60',
    equipment: ['Bodyweight'],
    notes: ''
  });
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        equipment: checked
          // Fix: Cast checkbox value to Equipment type to resolve type mismatch.
          ? [...prev.equipment, value as Equipment]
          : prev.equipment.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setWorkoutPlan(null);

    try {
      const plan = await generateWorkoutPlan(formData);
      setWorkoutPlan(plan);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);
  
  const handleReset = () => {
    setWorkoutPlan(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />

        <main className="mt-8">
          {!workoutPlan && !isLoading && !error && (
            <WorkoutForm 
              formData={formData}
              onFormChange={handleFormChange}
              onFormSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          )}

          {isLoading && <Loader />}
          
          {error && <ErrorMessage message={error} onReset={handleReset} />}

          {workoutPlan && !isLoading && (
            <WorkoutPlanDisplay plan={workoutPlan} onReset={handleReset} />
          )}

          {!workoutPlan && !isLoading && !error && (
            <div className="text-center mt-12 p-8 border-2 border-dashed border-slate-700 rounded-xl">
              <DumbbellIcon className="w-16 h-16 mx-auto text-sky-500" />
              <h2 className="mt-4 text-2xl font-bold text-slate-100">Your personalized plan awaits!</h2>
              <p className="mt-2 text-slate-400 max-w-md mx-auto">Fill out the form above to generate a workout plan tailored to your specific needs and goals.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
