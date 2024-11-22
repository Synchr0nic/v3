import React, { useState } from 'react';
import { Search, Filter, Compass } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

const categories = [
  "All Projects", "Music", "Visual Art", "Writing", "Film", "Photography", "Game Dev"
];

export function Explore() {
  const { activeColor } = useProject();
  const [activeCategory, setActiveCategory] = useState("All Projects");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Compass className="h-8 w-8" />
          <h1 className="text-3xl font-light tracking-wider">Explore Projects</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-700 ${
              activeCategory === category ? 'text-white' : 'text-zinc-400 hover:text-white'
            }`}
            style={{
              backgroundColor: activeCategory === category
                ? activeColor
                  ? `rgba(${activeColor}, 0.1)`
                  : 'rgba(255, 255, 255, 0.05)'
                : 'transparent',
              boxShadow: activeCategory === category && activeColor
                ? `0 0 20px rgba(${activeColor}, 0.1)`
                : 'none'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-zinc-900/50 rounded-xl p-6 space-y-4 border border-zinc-800"
            style={{
              borderColor: activeColor ? `rgba(${activeColor}, 0.1)` : undefined
            }}
          >
            <div className="h-32 bg-zinc-800 rounded-lg animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-6 bg-zinc-800 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-zinc-800 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}