import React from 'react';
import { User, Edit2, MapPin, Link as LinkIcon, Twitter, Github } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

const projects = [
  {
    title: "Neon Nights",
    role: "Sound Designer",
    status: "In Progress",
    collaborators: 4,
    image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80"
  },
  {
    title: "Urban Stories",
    role: "Project Lead",
    status: "Completed",
    collaborators: 6,
    image: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80"
  }
];

export function Profile() {
  const { activeColor } = useProject();

  return (
    <div className="space-y-8">
      <div className="relative h-48 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="relative -mt-20 space-y-6">
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-6">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
              alt="Profile"
              className="w-32 h-32 rounded-xl border-4 border-black object-cover"
            />
            <div>
              <h1 className="text-3xl font-light">Alex Chen</h1>
              <p className="text-zinc-400">Sound Designer & Music Producer</p>
            </div>
          </div>
          <button 
            className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-700"
            style={{
              backgroundColor: activeColor 
                ? `rgba(${activeColor}, 0.1)` 
                : 'rgba(255, 255, 255, 0.05)'
            }}
          >
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </button>
        </div>

        <div className="flex gap-6 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            San Francisco, CA
          </div>
          <a href="#" className="flex items-center gap-2 hover:text-white">
            <LinkIcon className="h-4 w-4" />
            alexchen.com
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-white">
            <Twitter className="h-4 w-4" />
            @alexchen
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-white">
            <Github className="h-4 w-4" />
            alexchen
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-zinc-900/50 rounded-xl overflow-hidden border border-zinc-800 transition-all duration-700 hover:border-opacity-50 group"
              style={{
                borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
              }}
            >
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-light mb-1">{project.title}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-zinc-300">{project.role}</span>
                    <span className="text-zinc-400">•</span>
                    <span className="text-zinc-400">{project.collaborators} collaborators</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}