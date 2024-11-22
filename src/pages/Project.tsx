import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users, MessageSquare, Calendar, Link as LinkIcon, Settings, Music2, Paintbrush, BookOpen } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { featuredProjects } from '../contexts/ProjectContext';

type Tab = 'visual' | 'audio' | 'story';

export function Project() {
  const { id } = useParams();
  const { activeColor } = useProject();
  const [activeTab, setActiveTab] = useState<Tab>('visual');
  const project = featuredProjects.find(p => p.id === Number(id));

  if (!project) return <div>Project not found</div>;

  const tabs = [
    { id: 'visual' as Tab, label: 'Visual', icon: Paintbrush },
    { id: 'audio' as Tab, label: 'Audio', icon: Music2 },
    { id: 'story' as Tab, label: 'Story', icon: BookOpen },
  ];

  return (
    <div className="space-y-8">
      <div className="relative h-64 rounded-xl overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-light mb-2">{project.title}</h1>
          <p className="text-zinc-300">{project.description}</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-zinc-800 pb-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === id ? 'text-white' : 'text-zinc-400 hover:text-white'
            }`}
            style={{
              backgroundColor: activeTab === id
                ? activeColor
                  ? `rgba(${activeColor}, 0.1)`
                  : 'rgba(255, 255, 255, 0.05)'
                : 'transparent'
            }}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {activeTab === 'visual' && (
            <div className="space-y-6">
              <div 
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Visual Assets</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-video bg-zinc-800 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="space-y-6">
              <div 
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Audio Tracks</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg">
                      <div className="w-12 h-12 bg-zinc-700 rounded-lg flex items-center justify-center">
                        <Music2 className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="h-4 w-1/3 bg-zinc-700 rounded mb-2"></div>
                        <div className="h-2 w-full bg-zinc-700 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'story' && (
            <div className="space-y-6">
              <div 
                className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
                style={{
                  borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
                }}
              >
                <h2 className="text-xl font-light mb-4">Story Elements</h2>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-4 bg-zinc-800/50 rounded-lg">
                      <div className="h-4 w-1/4 bg-zinc-700 rounded mb-2"></div>
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-zinc-700 rounded"></div>
                        <div className="h-2 w-5/6 bg-zinc-700 rounded"></div>
                        <div className="h-2 w-4/6 bg-zinc-700 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div 
            className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
            style={{
              borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
            }}
          >
            <h2 className="text-xl font-light mb-4">Project Links</h2>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-white">
                <LinkIcon className="h-4 w-4" />
                Project Documentation
              </a>
              <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-white">
                <LinkIcon className="h-4 w-4" />
                Resource Library
              </a>
            </div>
          </div>

          <div 
            className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
            style={{
              borderColor: activeColor ? `rgba(${activeColor}, 0.2)` : undefined
            }}
          >
            <h2 className="text-xl font-light mb-4">Project Settings</h2>
            <button className="flex items-center gap-2 text-zinc-400 hover:text-white">
              <Settings className="h-4 w-4" />
              Manage Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}