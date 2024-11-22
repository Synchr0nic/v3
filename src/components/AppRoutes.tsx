import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Explore } from '../pages/Explore';
import { Collectives } from '../pages/Collectives';
import { Messages } from '../pages/Messages';
import { Notifications } from '../pages/Notifications';
import { Profile } from '../pages/Profile';
import { Project } from '../pages/Project';
import { NewProject } from '../pages/NewProject';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/collectives" element={<Collectives />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/project/:id" element={<Project />} />
      <Route path="/new-project" element={<NewProject />} />
    </Routes>
  );
}