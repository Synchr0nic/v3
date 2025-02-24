import React, { useRef, useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  collaborators: number;
  tags: string[];
  color: string;
  audioUrl?: string;
  onHover: () => void;
  onLeave: () => void;
  isActive: boolean;
}

export function ProjectCard({ 
  id,
  title, 
  description, 
  image, 
  collaborators, 
  tags, 
  color,
  audioUrl,
  onHover,
  onLeave,
  isActive
}: ProjectCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [audioData, setAudioData] = useState<number[]>([]);
  const animationFrameRef = useRef<number>();
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeAudio = async () => {
      if (!audioUrl || isAudioInitialized) return;

      try {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.loop = true;
        await audioRef.current.load();

        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        
        const source = audioContextRef.current.createMediaElementSource(audioRef.current);
        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        
        analyserRef.current.fftSize = 64;

        if (mounted) {
          setIsAudioInitialized(true);
        }
      } catch (error) {
        console.error('Failed to initialize audio:', error);
      }
    };

    initializeAudio();

    return () => {
      mounted = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!isAudioInitialized || !analyserRef.current || !audioRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const updateAudioData = () => {
      if (!analyserRef.current || !isActive) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      setAudioData(Array.from(dataArray));
      animationFrameRef.current = requestAnimationFrame(updateAudioData);
    };

    if (isActive) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            updateAudioData();
          })
          .catch(error => {
            console.error('Audio playback failed:', error);
          });
      }
    } else {
      audioRef.current.pause();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setAudioData([]);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive, isAudioInitialized]);

  const getAudioReactiveStyle = () => {
    if (!isActive || !audioData.length) return {};
    
    const average = audioData.reduce((a, b) => a + b) / audioData.length;
    const intensity = average / 255;
    
    return {
      boxShadow: `0 0 ${30 + intensity * 50}px rgba(${color}, ${0.1 + intensity * 0.3})`
    };
  };

  return (
    <Link 
      to={`/project/${id}`}
      className="bg-zinc-900 border border-zinc-800 overflow-hidden group transition-all duration-700 rounded-xl"
      style={{
        borderColor: isActive ? `rgba(${color}, 0.3)` : '',
        ...getAudioReactiveStyle(),
        backgroundColor: isActive ? `rgba(${color}, 0.05)` : ''
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transition duration-700"
          style={{
            filter: isActive ? 'grayscale(0)' : 'grayscale(100%)'
          }}
        />
        <div 
          className="absolute inset-0 transition duration-700"
          style={{
            backgroundColor: isActive ? `rgba(${color}, 0.2)` : 'rgba(0, 0, 0, 0.4)'
          }}
        ></div>
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-light tracking-wider">{title}</h3>
        <p className="text-zinc-400 text-sm">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400">
            <Users className="h-5 w-5" />
            <span className="text-sm">{collaborators} collaborators</span>
          </div>
          <div className="flex gap-2">
            {tags.map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 text-zinc-300 text-sm font-light tracking-wider transition-colors duration-700 rounded-full"
                style={{
                  backgroundColor: isActive ? `rgba(${color}, 0.1)` : 'rgb(39, 39, 42)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}