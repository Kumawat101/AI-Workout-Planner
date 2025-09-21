
import React from 'react';
import { DumbbellIcon } from './icons';

export const Header: React.FC = () => (
  <header className="text-center">
    <div className="flex justify-center items-center gap-4">
      <DumbbellIcon className="w-10 h-10 text-sky-400" />
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-cyan-300 text-transparent bg-clip-text">
        AI Workout Planner
      </h1>
    </div>
    <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
      Craft your perfect fitness routine. Powered by Gemini.
    </p>
  </header>
);
