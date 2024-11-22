import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music2, Paintbrush, Film, BookOpen, Upload, Plus } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

const projectTypes = [
  { id: 'music', icon: Music2, label: 'Music' },
  { id: 'visual', icon: Paintbrush, label: 'Visual Art' },
  { id: 'film', icon: Film, label: 'Film & Video' },
  { id: 'writing', icon: BookOpen, label: 'Writing' }
];

export function NewProject() {
  const navigate = useNavigate();
  const { activeColor } = useProject();
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPrivate: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle project creation logic here
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-light">Create New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div 
          className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
          style={{
            borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
          }}
        >
          <h2 className="text-xl font-light mb-4">Project Type</h2>
          <div className="grid grid-cols-4 gap-4">
            {projectTypes.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedType(id)}
                className={`p-4 rounded-xl border border-zinc-800 flex flex-col items-center gap-2 transition-all duration-300 ${
                  selectedType === id ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div 
          className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
          style={{
            borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
          }}
        >
          <h2 className="text-xl font-light mb-4">Project Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Project Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:ring-1 focus:ring-white"
                placeholder="Enter project title"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-zinc-800 border-0 rounded-lg px-4 py-2 focus:ring-1 focus:ring-white h-32"
                placeholder="Describe your project"
              />
            </div>
          </div>
        </div>

        <div 
          className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
          style={{
            borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
          }}
        >
          <h2 className="text-xl font-light mb-4">Project Cover</h2>
          <div className="border-2 border-dashed border-zinc-800 rounded-xl p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-zinc-400" />
              <p className="text-zinc-400">Drag and drop your cover image or</p>
              <button type="button" className="text-white underline">browse files</button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-lg border border-zinc-800 hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-white text-black hover:bg-zinc-200"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}