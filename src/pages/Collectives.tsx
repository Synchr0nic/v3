import React from 'react';
import { Users, MessageSquare, Star } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

const collectives = [
  {
    name: "Sound Designers United",
    members: 128,
    activeProjects: 5,
    description: "A collective of sound designers and musicians collaborating on various audio projects.",
  },
  {
    name: "Visual Storytellers",
    members: 94,
    activeProjects: 3,
    description: "Artists and writers working together to create compelling visual narratives.",
  },
  {
    name: "Digital Art Pioneers",
    members: 156,
    activeProjects: 7,
    description: "Pushing the boundaries of digital art through collaborative experimentation.",
  }
];

export function Collectives() {
  const { activeColor } = useProject();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8" />
        <h1 className="text-3xl font-light tracking-wider">Collectives</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {collectives.map((collective, index) => (
          <div
            key={index}
            className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 transition-all duration-700 hover:border-opacity-50"
            style={{
              borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined,
              backgroundColor: activeColor ? `rgba(${activeColor}, 0.02)` : undefined
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-light">{collective.name}</h3>
              <button className="text-zinc-400 hover:text-white">
                <Star className="h-5 w-5" />
              </button>
            </div>
            <p className="text-zinc-400 mb-6">{collective.description}</p>
            <div className="flex items-center gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{collective.members} members</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{collective.activeProjects} active projects</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}