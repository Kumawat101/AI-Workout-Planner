
import { GoogleGenAI, Type } from "@google/genai";
import type { FormData, WorkoutPlan } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const workoutPlanSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      day: {
        type: Type.INTEGER,
        description: 'The day number of the workout (e.g., 1, 2, 3).'
      },
      focus: {
        type: Type.STRING,
        description: "The main focus of the day's workout (e.g., 'Upper Body Strength', 'Leg Day & Core')."
      },
      exercises: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: 'The name of the exercise.'
            },
            sets: {
              type: Type.STRING,
              description: "The number of sets to perform (e.g., '3', '4')."
            },
            reps: {
              type: Type.STRING,
              description: "The repetition range (e.g., '8-12 reps', '15 reps')."
            },
            notes: {
              type: Type.STRING,
              description: 'A brief, helpful tip or instruction for the exercise.'
            },
          },
          required: ['name', 'sets', 'reps', 'notes']
        }
      }
    },
    required: ['day', 'focus', 'exercises']
  }
};

const createPrompt = (formData: FormData) => {
  return `You are a world-class fitness coach and workout planner. Your task is to generate a personalized weekly workout plan based on the user's inputs.

User's specifications:
- Goal: ${formData.goal}
- Fitness Level: ${formData.fitnessLevel}
- Workouts per week: ${formData.daysPerWeek}
- Duration per workout (minutes): ${formData.duration}
- Available Equipment: ${formData.equipment.join(', ')}
- Additional Notes: ${formData.notes || 'None'}

Please generate a detailed ${formData.daysPerWeek}-day workout plan.

For each workout day, provide a clear focus (e.g., 'Upper Body Strength', 'Leg Day & Core', 'Full Body HIIT').
For each exercise, specify the name, number of sets, and the repetition range (e.g., '8-12 reps').
Also include a brief, helpful tip or instruction for each exercise.

Ensure the generated plan is consistent with the user's fitness level, available equipment, and time constraints. Adhere strictly to the requested JSON output format. Structure the plan sequentially by day number.
`;
};

export const generateWorkoutPlan = async (formData: FormData): Promise<WorkoutPlan> => {
  const prompt = createPrompt(formData);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: workoutPlanSchema,
        temperature: 0.7,
      },
    });
    
    const text = response.text.trim();
    if (!text) {
      throw new Error("Received an empty response from the AI. Please try again.");
    }

    const plan = JSON.parse(text);
    return plan as WorkoutPlan;

  } catch (error) {
    console.error("Error generating workout plan:", error);
    if (error instanceof Error && error.message.includes('json')) {
      throw new Error("The AI returned an invalid format. Please adjust your query and try again.");
    }
    throw new Error("Failed to generate workout plan. The AI may be experiencing high traffic.");
  }
};
