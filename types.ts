
export type WorkoutGoal = 'Build Muscle' | 'Lose Fat' | 'Improve Endurance' | 'General Fitness';
export type FitnessLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type DaysPerWeek = '2' | '3' | '4' | '5' | '6';
export type WorkoutDuration = '30' | '45' | '60' | '90';
export type Equipment = 'Bodyweight' | 'Dumbbells' | 'Barbell' | 'Kettlebells' | 'Resistance Bands' | 'Full Gym';

export interface FormData {
  goal: WorkoutGoal;
  fitnessLevel: FitnessLevel;
  daysPerWeek: DaysPerWeek;
  duration: WorkoutDuration;
  equipment: Equipment[];
  notes?: string;
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  notes: string;
}

export interface WorkoutDay {
  day: number;
  focus: string;
  exercises: Exercise[];
}

export type WorkoutPlan = WorkoutDay[];
