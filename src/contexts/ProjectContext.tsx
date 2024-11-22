import React, { createContext, useContext, useState } from 'react';

interface ProjectContextType {
  activeProject: number | null;
  activeColor: string;
  setActiveProject: (index: number | null) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [activeColor, setActiveColor] = useState('');

  const handleSetActiveProject = (index: number | null) => {
    setActiveProject(index);
    setActiveColor(index !== null ? featuredProjects[index]?.color : '');
  };

  return (
    <ProjectContext.Provider 
      value={{ 
        activeProject, 
        activeColor, 
        setActiveProject: handleSetActiveProject 
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}

export const featuredProjects = [
  {
    id: 1,
    title: "ETHEREAL SOUNDSCAPES",
    description: "A collaborative music project combining ambient sounds with visual art.",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80",
    collaborators: 8,
    tags: ["Music", "Art"],
    color: "147, 51, 234", // Purple
    audioUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3"
  },
  {
    id: 2,
    title: "DIGITAL DREAMS",
    description: "3D artists and animators creating an immersive virtual gallery.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
    collaborators: 12,
    tags: ["3D", "Animation"],
    color: "59, 130, 246" // Blue
  },
  {
    id: 3,
    title: "STORY WEAVERS",
    description: "Writers and illustrators crafting an interactive children's book.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80",
    collaborators: 5,
    tags: ["Writing", "Illustration"],
    color: "236, 72, 153" // Pink
  }
];